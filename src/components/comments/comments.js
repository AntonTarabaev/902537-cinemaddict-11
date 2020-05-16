import {createCommentsTemplate, createEmojiMarkup} from "./comments-tpl";
import AbstractComponent from "@components/abstract/abstract-component";

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;
    this._emoji = null;
    this._commentText = null;

    this._submitHandler = null;
    this._deleteButtonsClickHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  getData() {
    const form = document.querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return this.constructor._parseFormData(formData);
  }

  getCommentId(target) {
    return target.closest(`.film-details__comment`).dataset.commentId;
  }

  setEmojiImvalidClass() {
    this.getElement().querySelector(`.film-details__add-emoji-label`).classList.add(`invalid-comment`);
  }

  setCommentTextImvalidClass() {
    this.getElement().querySelector(`.film-details__comment-input`).classList.add(`invalid-comment`);
  }

  removeEmojiInvalidClass() {
    this.getElement().querySelector(`.film-details__add-emoji-label`).classList.remove(`invalid-comment`);
  }

  removeElement() {
    super.removeElement();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setDeleteButtonsClickHandler(this._deleteButtonsClickHandler);
    this.setSubmitHandler(this._submitHandler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    element.querySelectorAll(`.film-details__emoji-item`).forEach((it) => {
      it.addEventListener(`click`, () => {
        emojiContainer.innerHTML = createEmojiMarkup(it.value);

        this._emoji = it.value;
      });
    });
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, handler);

    this._submitHandler = handler;
  }

  setDeleteButtonsClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((it) => {
      it.addEventListener(`click`, handler);
    });

    this._deleteButtonsClickHandler = handler;
  }

  static _parseFormData(formData) {
    return {
      id: String(new Date() + Math.random()),
      text: formData.get(`comment`),
      emoji: formData.get(`comment-emoji`),
      author: `Anton`,
      date: new Date(),
    };
  }
}
