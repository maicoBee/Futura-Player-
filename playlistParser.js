/**
 * Ein einfacher M3U/M3U8‑Parser. Er durchsucht die Playlist nach
 * #EXTINF‑Zeilen und den dazugehörigen Stream‑URLs. Als Ergebnis
 * liefert die Funktion eine Liste von Objekten mit den Feldern
 * `name` (Kanalname) und `url` (Stream‑URL).
 *
 * Hinweis: Xtream‑Codes geben i. d. R. ebenfalls M3U‑Listen aus. Um
 * Xtream‑Endpunkte zu nutzen, müssen Benutzername, Passwort und Host
 * kombiniert werden, um eine M3U‑URL zu erzeugen (z. B.
 * `http://host:port/get.php?username=USER&password=PASS&type=m3u&output=ts`).
 */
export function parseM3U(data) {
  const lines = data.split(/\r?\n/);
  const channels = [];
  let currentName = null;
  lines.forEach((line) => {
    if (line.startsWith('#EXTINF')) {
      // Beispiel: #EXTINF:-1 tvg-id="channelid" tvg-name="Channel Name" group-title="Group",Channel Name
      const nameMatch = line.match(/,(.*)$/);
      currentName = nameMatch ? nameMatch[1].trim() : 'Unbenannter Kanal';
    } else if (line && !line.startsWith('#')) {
      // URL‑Zeile
      const url = line.trim();
      if (currentName) {
        channels.push({ name: currentName, url });
        currentName = null;
      }
    }
  });
  return channels;
}