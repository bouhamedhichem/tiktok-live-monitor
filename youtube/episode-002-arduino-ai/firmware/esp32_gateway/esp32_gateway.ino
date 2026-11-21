/*
 * CodeCram AIoT Lab — ESP32 gateway
 *
 * UART from Arduino:
 *   Arduino TX -> level shifter/resistor divider -> ESP32 RX (GPIO16 default)
 *   ESP32 TX (GPIO17 default) -> Arduino RX (optional)
 *   GND <-> GND
 *
 * Never feed 5V logic directly into an ESP32 GPIO.
 *
 * Set WIFI_SSID, WIFI_PASSWORD and BACKEND_URL locally before flashing.
 * BACKEND_URL must use the computer's LAN IP, e.g. http://192.168.1.20:8000
 * Do not commit personal credentials or a public backend URL containing secrets.
 */

#include <WiFi.h>
#include <HTTPClient.h>

const char* WIFI_SSID = "CHANGE_ME";
const char* WIFI_PASSWORD = "CHANGE_ME";
const char* BACKEND_URL = "http://192.168.1.10:8000/api/telemetry";

static const int ARDUINO_RX_PIN = 16;
static const int ARDUINO_TX_PIN = 17;
static const unsigned long WIFI_RETRY_MS = 10000;

HardwareSerial ArduinoSerial(2);
String lineBuffer;
unsigned long lastWifiAttempt = 0;

void connectWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;
  const unsigned long now = millis();
  if (now - lastWifiAttempt < WIFI_RETRY_MS) return;
  lastWifiAttempt = now;
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Connecting to Wi-Fi...");
}

void postTelemetry(const String& jsonLine) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Offline: reading not sent.");
    return;
  }

  HTTPClient http;
  http.setTimeout(5000);
  http.begin(BACKEND_URL);
  http.addHeader("Content-Type", "application/json");
  const int status = http.POST(jsonLine);
  if (status > 0) {
    Serial.printf("Backend HTTP status: %d\n", status);
  } else {
    Serial.printf("HTTP request failed: %s\n", http.errorToString(status).c_str());
  }
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
      if (lineBuffer.length() > 0 && lineBuffer.startsWith("{") && lineBuffer.endsWith("}")) {
        postTelemetry(lineBuffer);
      }
      lineBuffer = "";
    } else if (lineBuffer.length() < 256) {
      lineBuffer += ch;
    } else {
      // Drop oversized line to avoid unbounded memory growth.
      lineBuffer = "";
      Serial.println("Dropped oversized UART message.");
    }
  }
  delay(2);
}
