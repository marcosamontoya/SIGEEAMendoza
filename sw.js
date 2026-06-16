const CACHE="eventos-cache-v1";
const FILES=[
 "./",
 "./index.html",
 "./eventosmuestra.txt",
 "./sonidos/alarma.mp3"
];

self.addEventListener("install",e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
});

self.addEventListener("fetch",e=>{
 e.respondWith(
  caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
   if(e.request.url.includes("tile.openstreetmap.org")){
    const clone=res.clone();
    caches.open(CACHE).then(c=>c.put(e.request,clone));
   }
   return res;
  }))
 );
});
