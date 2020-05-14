import CommentsComponent from "Components/comments/comments";
import {isCtrlEnterPressed, isAllowedCommentLength} from "Utils/common";
import {render, RenderPosition, replace, remove} from "Utils/render";

export default class CommentsController {
  constructor(container, onCommentDataChange) {
    this._container = container;

    this._onCommentDataChange = onCommentDataChange;

    this._commentsComponent = null;
    this._oldCommentsComponent = null;

    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
  }

  render(comments) {
    this._comments = comments;

    if (!this._commentsComponent) {
      this._renderFilmComments();
      render(this._container, this._commentsComponent, RenderPosition.BEFOREEND);
    } else {
      this._renderFilmComments();
      replace(this._commentsComponent, this._oldCommentsComponent);
    }
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
      const data = this._commentsComponent.getData();

      if (data.emoji === null) {
        this._commentsComponent.setEmojiImvalidClass();
        return;
      } else {
        this._commentsComponent.removeEmojiInvalidClass();
      }

      if (!isAllowedCommentLength(data.text)) {
        this._commentsComponent.setCommentTextImvalidClass();
        return;
      }

      this._onCommentDataChange(null, data);
    }
  }
}
