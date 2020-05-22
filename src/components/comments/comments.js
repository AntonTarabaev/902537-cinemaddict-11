import {createCommentsTemplate, createEmojiMarkup} from "./comments-tpl";
import AbstractComponent from "@components/abstract/abstract-component";
import {SHAKE_ANIMATION_DURATION, DELETE_BUTTON_TEXT} from "@consts";

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;
    this._emoji = null;
    this._commentText = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  getData() {
    const form = document.querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return formData;
  }

  getCommentId(target) {
    return target.closest(`.film-details__comment`).dataset.commentId;
  }

  getCommentsContainer() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  getCommentById(id) {
    return this.getElement().querySelector(`[data-comment-id="${id}"]`);
  }

  setCommentsCount(count) {
    this.getElement().querySelector(`.film-details__comments-count`).textContent = count;
  }

  setEmojiImvalidClass() {
    this.getElement().querySelector(`.film-details__add-emoji-label`).classList.add(`invalid-comment`);
  }

  setCommentTextImvalidClass() {
    this.getElement().querySelector(`.film-details__comment-input`).classList.add(`invalid-comment`);
  }

  changeFormElementsDisabledProperty(disabled = false) {
    const form = document.querySelector(`.film-details__inner`);

    Array.from(form.elements).forEach((formElement) => {
      formElement.disabled = disabled;
    });
  }

  cleanForm() {
    document.querySelector(`.film-details__inner`).reset();
    this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
  }

  removeEmojiInvalidClass() {
    this.getElement().querySelector(`.film-details__add-emoji-label`).classList.remove(`invalid-comment`);
  }

  removeCommentTextInvalidClass() {
    this.getElement().querySelector(`.film-details__comment-input`).classList.remove(`invalid-comment`);
  }

  removeElement() {
    super.removeElement();
  }

  changeCommentDeleteButtonText(id) {
    this.getCommentById(id).querySelector(`.film-details__comment-delete`).textContent = DELETE_BUTTON_TEXT.DELETING;
  }

  shakeComment(id) {
    const comment = this.getCommentById(id);
    comment.classList.add(`shake`);

    setTimeout(() => {
      comment.classList.remove(`shake`);
      comment.querySelector(`.film-details__comment-delete`).textContent = DELETE_BUTTON_TEXT.DELETE;
    }, SHAKE_ANIMATION_DURATION);
  }

  shakeForm() {
    const newCommentForm = this.getElement().querySelector(`.film-details__new-comment`);
    newCommentForm.classList.add(`shake`);

    setTimeout(() => {
      newCommentForm.classList.remove(`shake`);
    }, SHAKE_ANIMATION_DURATION);
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
  }

  setDeleteButtonsClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((it) => {
      it.addEventListener(`click`, handler);
    });
  }
}
