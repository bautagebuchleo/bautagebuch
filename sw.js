// Hält die App offline verfügbar. Dropbox- und Wetter-Anfragen gehen immer ins Netz.
const CACHE = "bautagebuch-v5";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-180.png",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || /dropbox|open-meteo/.test(u.hostname)) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      if (r.ok && (u.origin === location.origin || /cdnjs|fonts\.(googleapis|gstatic)/.test(u.hostname))) {
        const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy));
      }
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("./index.html")))
  );
});
