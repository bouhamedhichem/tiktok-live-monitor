/*
 * CodeCram AIoT Lab — ESP32 gateway
 * Arduino TX -> level shifter/resistor divider -> ESP32 RX GPIO16.
 * ESP32 TX GPIO17 -> Arduino RX optional. Common GND required.
 * NEVER connect 5V Arduino TX directly to an ESP32 GPIO.
 *
 * Configure Wi-Fi, backend LAN URL and DEVICE_INGEST_KEY locally before flashing.
 * Never commit real credentials. Backend key must match DEVICE_INGEST_KEY in backend .env.
 */
#include <WiFi.h>
#include <HTTPClient.h>
const char* WIFI_SSID = "CHANGE_ME";
const char* WIFI_PASSWORD = "CHANGE_ME";
const char* BACKEND_URL = "http://192.168.1.10:8000/api/telemetry";
const char* DEVICE_INGEST_KEY = "REPLACE_WITH_LONG_RANDOM_TOKEN";
static const int ARDUINO_RX_PIN = 16;
static const int ARDUINO_TX_PIN = 17;
static const unsigned long WIFI_RETRY_MS = 10000;
HardwareSerial ArduinoSerial(2);
String lineBuffer;
unsigned long lastWifiAttempt = 0;

void connectWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;
  if (millis() - lastWifiAttempt < WIFI_RETRY_MS) return;
  lastWifiAttempt = millis();
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}
void postTelemetry(const String& jsonLine) {
  if (WiFi.status() != WL_CONNECTED) { Serial.println("Offline: reading not sent."); return; }
  HTTPClient http;
  http.setTimeout(5000);
  http.begin(BACKEND_URL);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-Device-Key", DEVICE_INGEST_KEY);
  const int status = http.POST(jsonLine);
  if (status > 0) Serial.printf("Backend HTTP status: %d\n", status);
  else Serial.printf("HTTP request failed: %s\n", http.errorToString(status).c_str());
  http.end();
}
void setup() {
  Serial.begin(115200);
  ArduinoSerial.begin(115200, SERIAL_8N1, ARDUINO_RX_PIN, ARDUINO_TX_PIN);
  connectWiFi();
}
void loop() {
  connectWiFi();
  while (ArduinoSerial.available()) {
    const char ch = static_cast<char>(ArduinoSerial.read());
    if (ch == '\n') {
      lineBuffer.trim();
      if (lineBuffer.length() > 0 && lineBuffer.startsWith("{") && lineBuffer.endsWith("}")) postTelemetry(lineBuffer);
      lineBuffer = "";
    } else if (lineBuffer.length() < 256) lineBuffer += ch;
    else { lineBuffer = ""; Serial.println("Dropped oversized UART message."); }
  }
  delay(2);
}
