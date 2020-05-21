const CACHE_PREFIX = `cinemaaddict-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;
const RESPONSE_OK_STATUS_CODE = 200;
const RESPONSE_SAFETY_TYPE = `basic`;

const fetchHandler = (evt) => {
  const {request} = evt;

  evt.respondWith(
      caches.match(request)
        .then((cacheResponse) => {
          if (cacheResponse) {
            return cacheResponse;
          }

          return fetch(request)
            .then((response) => {
              if (!response || response.status !== RESPONSE_OK_STATUS_CODE || response.type !== RESPONSE_SAFETY_TYPE) {
                return response;
              }

              const clonedResponse = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, clonedResponse));

              return response;
            });
        })
  );
};

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll([
            `/`,
            `/index.html`,
            `/bundle.js`,
            `/css/normalize.css`,
            `/css/main.css`,

            `/images/emoji/smile.png`,
            `/images/emoji/sleeping.png`,
            `/images/emoji/puke.png`,
            `/images/emoji/angry.png`,

            `/images/icons/icon-watchlist-active.svg`,
            `/images/icons/icon-watchlist.svg`,
            `/images/icons/icon-watched-active.svg`,
            `/images/icons/icon-watched.svg`,
            `/images/icons/icon-favorite-active.svg`,
            `/images/icons/icon-favorite.svg`,

            `/images/background.png`,
            `/images/bitmap.png`,
            `/images/bitmap@2x.png`,
            `/images/bitmap@3x.png`
          ]);
        })
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
      caches.keys()
        .then(
            (keys) => Promise.all(
                keys.map(
                    (key) => {
                      if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                        return caches.delete(key);
                      }

                      return null;
                    })
                    .filter((key) => key !== null)
            )
        )
  );
});

self.addEventListener(`fetch`, fetchHandler);
