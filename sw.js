/* Service worker: keeps a copy of the app on the device so it opens without internet.
   Network first: with a connection the newest version always loads (and refreshes the copy);
   without one, the saved copy is used. The file list comes from index.html's script tags, so
   adding a script never needs a change here. */
const CACHE="weekly-recipes-v1";
const EXTRA_FILES=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png",
  "./icons/maskable-512.png","./icons/apple-touch-icon.png","./icons/favicon-32.png"];

self.addEventListener("install",event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    const page=await (await fetch("./index.html",{cache:"no-store"})).text();
    const scripts=[...page.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>"./"+m[1]);
    await cache.addAll([...EXTRA_FILES,...scripts]);
    await self.skipWaiting();
  })());
});

// Old copies from earlier versions of this file are removed.
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    for(const key of await caches.keys())if(key!==CACHE)await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET"||new URL(request.url).origin!==location.origin)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try{
      const fresh=await fetch(request);
      if(fresh.ok)cache.put(request,fresh.clone());
      return fresh;
    }catch(offline){
      const saved=await cache.match(request,{ignoreSearch:true});
      if(saved)return saved;
      if(request.mode==="navigate")return cache.match("./index.html");
      throw offline;
    }
  })());
});
