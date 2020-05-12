import moment from "moment";

export const formatTime = (durationInMinutes) => {
  return moment.utc().startOf(`day`).add({minutes: durationInMinutes}).format(`${durationInMinutes > 60 ? `h[h]` : ``} mm[m]`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  return moment(date).startOf(`minute`).fromNow();
};

export const isEscPressed = (evt) => evt.key === `Escape` || evt.key === `Esc`;
