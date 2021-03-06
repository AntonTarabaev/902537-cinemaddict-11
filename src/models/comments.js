export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
  }

  setComments(comments) {
    this._comments = Array.from(comments).sort((a, b) => b.date - a.date);
  }

  getComments() {
    return this._comments;
  }

  addComment(comment) {
    this._comments = [].concat(comment, this._comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  removeComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
