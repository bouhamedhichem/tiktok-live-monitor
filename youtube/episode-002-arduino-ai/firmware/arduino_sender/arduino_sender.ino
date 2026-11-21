/*
 * CodeCram AIoT Lab — Arduino sender
 * Reads an analog input on A0 and sends one JSON line over a UART link.
 *
 * Wiring for an Arduino Uno:
 *   Potentiometer wiper -> A0
 *   Potentiometer outer pins -> 5V and GND
 *   Arduino TX (D1) -> level shifter / resistor divider -> ESP32 RX
 *   Arduino GND -> ESP32 GND
 *
 * WARNING: Uno TX is 5V logic. ESP32 GPIO is NOT 5V tolerant.
 * Use a proper level shifter or resistor divider. Do not connect TX directly.
 *
 * For Uno, Serial is the USB/UART pins D0/D1. Disconnect the ESP32 RX wire
 * while uploading if it interferes with programming. For boards with a spare
 * hardware UART, change Serial to that UART.
 */

const int ANALOG_PIN = A0;
const unsigned long SAMPLE_INTERVAL_MS = 1000;
const char DEVICE_ID[] = "codec-arduino-01";

unsigned long lastSample = 0;
unsigned long sequenceNumber = 0;

void setup() {
  Serial.begin(115200);
  analogReference(DEFAULT);
  delay(500);
  Serial.println(F("{"status":"arduino_sender_ready"}"));
}

void loop() {
  const unsigned long now = millis();
  if (now - lastSample < SAMPLE_INTERVAL_MS) return;
  lastSample = now;

  const int raw = analogRead(ANALOG_PIN);
  const float voltage = raw * (5.0f / 1023.0f);
  sequenceNumber++;

  // One newline-delimited JSON message for the ESP32 gateway.
  Serial.print(F("{"device_id":""));
  Serial.print(DEVICE_ID);
  Serial.print(F("","sequence":"));
  Serial.print(sequenceNumber);
  Serial.print(F(","raw_adc":"));
  Serial.print(raw);
  Serial.print(F(","voltage":"));
  Serial.print(voltage, 3);
  Serial.println(F(","source":"arduino"}"));
}
