import Movie from "@models/movie";

const PROMISE_REJECT_MESSAGE = {
  NO_DATA: `No data`,
  NO_OFFLINE: `Offline logic is not implemented`,
  SYNC_FAILED: `Sync data failed`,
};

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedItems = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.item);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, filmsStore, commentsStore) {
    this._api = api;
    this._filmsStore = filmsStore;
    this._commentsStore = commentsStore;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films);
          this._filmsStore.setItems(items);

          return films;
        });
    }

    const storeFilms = Object.values(this._filmsStore.getItems());

    return Promise.resolve(storeFilms);
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId)
        .then((comments) => {
          const items = createStoreStructure(comments);
          this._commentsStore.setItem(filmId, items);

          return comments;
        });
    }
    const filmComments = this._commentsStore.getItems()[filmId];
    if (filmComments) {
      const storeComments = Object.values(filmComments);

      return Promise.resolve(storeComments);
    }

    return Promise.reject(PROMISE_REJECT_MESSAGE.NO_DATA);
  }

  createComment(filmId, comment) {
    if (isOnline()) {
      return this._api.createComment(filmId, comment)
        .then((newComment) => {
          const item = Object.assign({}, newComment, {
            [newComment.id]: newComment,
          });
          this._commentsStore.setItem(filmId, item);

          return newComment;
        });
    }

    return Promise.reject(PROMISE_REJECT_MESSAGE.NO_OFFLINE);
  }

  deleteComment(id) {
    if (isOnline()) {
      return this._api.deleteComment(id)
        .then(() => {
          this._commentsStore.removeDeepItem(id);
        });
    }

    return Promise.reject(PROMISE_REJECT_MESSAGE.NO_OFFLINE);
  }

  updateFilm(id, data) {
    if (isOnline()) {
      return this._api.updateFilm(id, data)
        .then((newFilm) => {
          this._filmsStore.setItem(newFilm.id, newFilm);

          return newFilm;
        });
    }

    const localFilm = Movie.clone(Object.assign(data, {id})).toRAW();

    this._filmsStore.setItem(id, localFilm);

    return Promise.resolve(localFilm);
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._filmsStore.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedFilms = getSyncedItems(response.updated);

          this._filmsStore.setItems(updatedFilms);
        });
    }

    return Promise.reject(new Error(PROMISE_REJECT_MESSAGE.SYNC_FAILED));
  }
}
