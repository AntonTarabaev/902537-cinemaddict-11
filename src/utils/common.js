import {AllowedCommentTextLength} from "@consts";
import moment from "moment";

export const getUserRank = (watchedFilmsCount) => {
  if (watchedFilmsCount > 20) {
    return `Movie Buff`;
  }
  if (watchedFilmsCount > 10) {
    return `Fan`;
  }
  if (watchedFilmsCount > 0) {
    return `Novice`;
  }
  return ``;
};

export const formatTime = (durationInMinutes) => {
  return moment.utc().startOf(`day`).add({minutes: durationInMinutes}).format(`${durationInMinutes > 60 ? `h[h]` : ``} mm[m]`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getHours = (durationInMinutes) => (durationInMinutes - durationInMinutes % 60) / 60;

export const getMinutes = (durationInMinutes) => durationInMinutes % 60;

export const getPeriod = (period) => {
  const date = new Date();
  return date.setDate(date.getDate() - period);
};

export const getWatchedFilmsByPeriod = (films, period) => {
  return period > 0 ?
    films.filter((film) => film.isWatched && film.watchingDate >= getPeriod(period)) :
    films.filter((film) => film.isWatched);
};

export const formatCommentDate = (date) => {
  return moment(date).startOf(`minute`).fromNow();
};

export const isAllowedCommentLength = (commentText) => {
  const length = commentText.length;

  return length >= AllowedCommentTextLength.MIN && length <= AllowedCommentTextLength.MAX;
};

export const isEscPressed = (evt) => evt.key === `Escape` || evt.key === `Esc`;

export const isCtrlEnterPressed = (evt) => evt.ctrlKey && evt.key === `Enter`;
