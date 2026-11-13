# Bautagebuch – Einrichtung

Die App besteht aus wenigen Dateien ohne eigenen Server. Sie läuft im Browser auf iPhone und Mac und speichert in deine Dropbox.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die komplette App |
| `manifest.webmanifest` | macht sie auf dem iPhone als App-Symbol installierbar |
| `sw.js` | hält die App offline verfügbar |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | App-Symbole |

## 1. Auf GitHub Pages veröffentlichen (ca. 10 Minuten)

1. Kostenloses Konto auf github.com anlegen.
2. Neues Repository erstellen, z. B. `bautagebuch`. Sichtbarkeit: **Public** (für kostenloses GitHub Pages nötig; es liegen dort nur die App-Dateien, keine Einträge).
3. „Add file“ → „Upload files“ → alle Dateien aus diesem Ordner hochladen → „Commit changes“.
4. Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/ (root)` → Save.
5. Nach ca. einer Minute ist die App erreichbar unter `https://DEINNAME.github.io/bautagebuch/`.

## 2. Dropbox-App anlegen (ca. 5 Minuten)

1. https://www.dropbox.com/developers/apps öffnen → **Create app**.
2. API: **Scoped access**. Zugriff: **App folder** (die App sieht dann nur ihren eigenen Ordner). Name z. B. `Bautagebuch-Leo`.
3. Tab **Permissions**: `files.content.write` und `files.content.read` anhaken → **Submit**.
4. Tab **Settings**:
   - Unter **OAuth 2 → Redirect URIs** genau die Adresse aus Schritt 1.5 eintragen (mit Schrägstrich am Ende) → Add.
   - Unter **Allow public clients (Implicit Grant & PKCE)**: **Allow**.
   - Den **App key** kopieren. Das App secret wird nicht gebraucht und gehört nirgends hinein.
5. Die App im Browser öffnen → Einstellungen → App key einfügen → **Verbinden** → bei Dropbox anmelden und erlauben.

Die Einträge landen dann in `Dropbox/Apps/Bautagebuch-Leo/`:

```
Projekt XY/
  eintraege.json            alle Einträge als Daten
  2026-KW46/
    BT-0007_2026-11-13_0755_mangel_1.jpg
  Berichte/
    Tagesbericht_Projekt XY_2026-11-13.pdf
```

## 3. Auf dem iPhone installieren

1. Die Adresse in **Safari** öffnen.
2. Teilen-Symbol → **Zum Home-Bildschirm**.
3. Dropbox einmal in der installierten App verbinden (die Anmeldung gilt pro Gerät und Browser).

**Button auf dem Sperrbildschirm:** In Kurzbefehle einen neuen Kurzbefehl mit nur einer Aktion `URL öffnen` anlegen, Adresse `https://DEINNAME.github.io/bautagebuch/#erfassen`. Dann Sperrbildschirm lange drücken → Anpassen → unteres Steuerelement durch „Kurzbefehl“ ersetzen.

## 4. Auf dem Mac

Adresse in Safari oder Chrome öffnen, Dropbox verbinden, unter Einstellungen **Einträge anderer Geräte laden**. In Safari geht auch Ablage → **Zum Dock hinzufügen**.

## Gut zu wissen

- **Offline:** Einträge werden zuerst im Gerät gespeichert und hochgeladen, sobald wieder Netz da ist. Die Anzeige oben rechts zeigt, was noch wartet.
- **Nummern:** Jede Baustelle zählt fortlaufend (BT-0001, BT-0002 …). Erfasst du gleichzeitig auf zwei Geräten ohne Netz, kann eine Nummer doppelt vorkommen. Am besten vor Ort nur mit dem iPhone erfassen.
- **Bearbeiten:** Geänderte Einträge behalten den ursprünglichen Text, er erscheint im Tagesbericht. Bereits hochgeladene Einträge lassen sich nicht mehr löschen.
- **Fotos** werden auf 1600 px verkleinert, damit Upload und PDF schnell bleiben. Originale bleiben in deiner Fotos-App.
- **Safari-Speicher:** iOS kann Daten nicht installierter Webseiten nach längerer Nichtnutzung löschen. Als Home-Bildschirm-App passiert das nicht. Was in Dropbox liegt, ist ohnehin sicher.
- **Wetter** kommt von Open-Meteo (kostenlos, ohne Schlüssel) über deinen Standort und wird pro Tag gespeichert.
- **Updates:** Neue Version von `index.html` einfach im Repository ersetzen. In `sw.js` die Versionsnummer (`bautagebuch-v1`) erhöhen, damit Geräte sie sicher laden.
