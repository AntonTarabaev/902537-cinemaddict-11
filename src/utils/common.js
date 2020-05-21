import {ALLOWED_COMMENT_LENGTH, MINUTES_IN_HOUR} from "@consts";
import moment from "moment";

export const formatTime = (durationInMinutes) => {
  return moment.utc().startOf(`day`).add({minutes: durationInMinutes}).format(`${durationInMinutes > MINUTES_IN_HOUR ? `h[h]` : ``} mm[m]`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getHours = (durationInMinutes) => (durationInMinutes - durationInMinutes % MINUTES_IN_HOUR) / MINUTES_IN_HOUR;

export const getMinutes = (durationInMinutes) => durationInMinutes % MINUTES_IN_HOUR;

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

  return length >= ALLOWED_COMMENT_LENGTH.MIN && length <= ALLOWED_COMMENT_LENGTH.MAX;
};

export const isEscPressed = (evt) => evt.key === `Escape` || evt.key === `Esc`;

export const isCtrlEnterPressed = (evt) => evt.ctrlKey && evt.key === `Enter`;
