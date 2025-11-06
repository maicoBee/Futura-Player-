# IPTV Player App (React Native)

Dieses Projekt ist ein einfaches IPTV‑Player‑Gerüst, das als Ausgangspunkt für eine private **iOS‑ und Android‑App** dient. Ziel ist es, M3U/M3U8/Xtream‑Playlists abzuspielen, HD/4K‑Streaming zu unterstützen und eine elektronische Programmzeitschrift (EPG) einzubinden. Die Implementierung basiert auf React Native, um mit einer einzigen Codebasis sowohl iOS‑ als auch Android‑Geräte (inkl. Android TV/Fire OS) zu bedienen.

## Features

- **Cross‑Platform‑Unterstützung (iOS/Android)** – Die App wurde mit React Native entwickelt und läuft auf iPhones, iPads sowie Android‑Geräten (inkl. Android TV/Fire OS). Ein Großteil des Codes ist plattformübergreifend, während gerätespezifische Optimierungen über native Module erfolgen können.
- **M3U/M3U8/Xtream‑Unterstützung** – Das Projekt enthält Beispielcode zum Laden und Parsen von M3U‑Listen. Für Xtream‑Codes können ähnliche Parserschritte implementiert werden, da Xtream in der Regel einen HTTP‑Endpunkt bereitstellt, der M3U‑Listen zurückliefert.
- **HD/4K‑Streaming** – Die App verwendet `react-native-video`, ein beliebtes Open‑Source‑Paket, das HLS‑Streams (z. B. m3u8) mit adaptiver Bitrate unterstützt. Für 4K‑Streams ist die Hardware des Geräts verantwortlich; `react-native-video` übergibt die Daten an den nativen Video‑Player (ExoPlayer auf Android bzw. AVPlayer auf iOS).
- **Elektronische Programmzeitschrift (EPG)** – Im Beispiel wird gezeigt, wie eine EPG‑Datei (z. B. XMLTV) eingelesen und pro Sender die Sendezeiten angezeigt werden kann. In der Praxis würde man die EPG‑Daten regelmäßig vom Provider abrufen und zwischenspeichern.

## Voraussetzungen

- Node.js >= 16 und npm
- React Native CLI (`npx react-native`) und die Plattform‑Entwicklungstools (Xcode für iOS, Android Studio für Android).
- Für die Produktion muss das Projekt mit gültigen Zertifikaten signiert und in den jeweiligen Stores hochgeladen werden. Beachten Sie die Richtlinien von Apple und Google, um sicherzustellen, dass die Inhalte legal sind und Sie über die erforderlichen Streaming‑Rechte verfügen【129759663459332†L160-L166】【545388208106910†L1378-L1387】.

## Installation

1. Klonen Sie dieses Repository und wechseln Sie in das Verzeichnis:

   ```bash
   git clone <Ihr‑Repository‑URL> iptv-player-app
   cd iptv-player-app
   ```

2. Installieren Sie die Abhängigkeiten:

   ```bash
   npm install
   ```

3. Starten Sie das Projekt:

   ```bash
   npx react-native run-ios    # für iOS
   npx react-native run-android # für Android
   ```

   Für Android müssen Sie einen Emulator oder ein physisches Gerät angeschlossen haben. Für iOS benötigen Sie Xcode und einen gültigen Entwicklungsaccount.

## EPG‑Integration

EPG‑Daten werden häufig im XMLTV‑Format bereitgestellt【402315506996525†L100-L104】. Um sie zu integrieren:

1. Laden Sie die XMLTV‑ oder JSON‑Datei vom IPTV‑Anbieter herunter.
2. Verwenden Sie einen XML‑Parser wie `fast-xml-parser`, um die Datei einzulesen.
3. Speichern Sie die Programminformationen im lokalen Speicher (z. B. AsyncStorage) und zeigen Sie sie in der App an. Beachten Sie bei der Darstellung die korrekte Zeitzone und stimmen Sie die Kanal‑IDs mit den Sendern ab【402315506996525†L270-L306】.

## Wichtige Hinweise

- **Legale Nutzung** – Nutzen Sie nur Streams von lizenzierten Anbietern. In Deutschland ist IPTV legal, solange der Anbieter die erforderlichen Rechte besitzt【129759663459332†L160-L166】【129759663459332†L168-L174】. Apps dürfen keine illegalen Inhalte streamen und müssen die Richtlinien der App‑Stores einhalten【545388208106910†L1378-L1387】【460064125713884†L1127-L1133】.
- **Performance** – 4K‑Streaming erfordert eine stabile Internetverbindung (mindestens ~25 Mbit/s). Stellen Sie sicher, dass das Gerät H.265/HEVC unterstützt, um Bandbreite zu sparen.
- **Anpassung** – Dieses Projekt ist ein Ausgangspunkt. Für eine produktive App sollten Sie weitere Funktionen wie Favoriten, Suche, Aufnahme, Kindersicherung und Benutzerverwaltung integrieren.

## Ordnerstruktur

```
iptv-player-app/
├── App.js             # Haupteinstiegspunkt der App
├── package.json       # Projektkonfiguration und Abhängigkeiten
├── README.md          # Diese Datei
└── src/
    ├── components/    # Wiederverwendbare Komponenten (Player, EPG, Listen)
    ├── screens/       # Unterschiedliche Bildschirme (Home, Player, EPG)
    └── utils/         # Hilfsfunktionen (Parser, API‑Aufrufe)
```

Viel Erfolg bei der Entwicklung Ihrer eigenen IPTV‑App!