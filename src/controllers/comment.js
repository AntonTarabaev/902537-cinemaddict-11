import CommentsComponent from "@components/comments/comments";
import CommentComponent from "@components/comments/comment";
import CommentModel from "@models/comment";
import {isCtrlEnterPressed, isAllowedCommentLength} from "@utils/common";
import {render, RenderPosition, replace, remove} from "@utils/render";

export default class CommentsController {
  constructor(container, onCommentDataChange) {
    this._container = container;

    this._onCommentDataChange = onCommentDataChange;

    this._commentsComponent = null;
    this._commentComponent = null;
    this._oldCommentsComponent = null;

    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
  }

  render(comments) {
    const oldComponent = this._commentsComponent;
    this._comments = comments;
    this._renderFilmComments();

    if (!oldComponent) {
      render(this._container, this._commentsComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._commentsComponent, this._oldCommentsComponent);
  }

  renderFirstComment(comments) {
    this._comments = comments;
    this._commentComponent = new CommentComponent(this._comments[0]);

    this._commentComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onCommentDataChange(this._commentsComponent.getCommentId(evt.target), null);
    });

    render(this._commentsComponent.getCommentsContainer(), this._commentComponent, RenderPosition.AFTERBEGIN);
  }

  removeCommentById(commentId) {
    this._commentsComponent.getCommentById(commentId).remove();
  }

  updateCommentsCount(count) {
    this._commentsComponent.setCommentsCount(count);
  }

  changeFormElementsDisabledProperty(disabled = false) {
    this._commentsComponent.changeFormElementsDisabledProperty(disabled);
  }

  cleanForm() {
    this._commentsComponent.cleanForm();
  }

  changeCommentDeleteButtonText(id) {
    this._commentsComponent.changeCommentDeleteButtonText(id);
  }

  shakeComment(id) {
    this._commentsComponent.shakeComment(id);
  }

  shakeForm() {
    this._commentsComponent.shakeForm();
  }

  destroy() {
    remove(this._commentsComponent);
  }

  _renderFilmComments() {
    this._oldCommentsComponent = this._commentsComponent;
    this._commentsComponent = new CommentsComponent(this._comments);

    this._commentsComponent.setSubmitHandler(this._onCtrlEnterKeyDown);

    this._commentsComponent.setDeleteButtonsClickHandler((evt) => {
      evt.preventDefault();
      this._onCommentDataChange(this._commentsComponent.getCommentId(evt.target), null);
    });
  }

  _onCtrlEnterKeyDown(evt) {
    if (isCtrlEnterPressed(evt)) {
      const data = this.constructor._parseFormData(this._commentsComponent.getData());

      if (data.emoji === null) {
        this._commentsComponent.setEmojiImvalidClass();
        return;
      }

      this._commentsComponent.removeEmojiInvalidClass();

      if (!isAllowedCommentLength(data.text)) {
        this._commentsComponent.setCommentTextImvalidClass();
        return;
      }

      this._onCommentDataChange(null, data);
    }
  }

  static _parseFormData(formData) {
    return new CommentModel({
      'comment': formData.get(`comment`),
      'emotion': formData.get(`comment-emoji`),
      'date': new Date(),
    });
  }
}
