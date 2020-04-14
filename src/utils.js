const ESC_KEY = `Escape`;

const isEscEvent = (evt, action) => {
  if (evt.key === ESC_KEY) {
    action();
  }
};

const formatTime = (durationInMinutes) => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes - hours * 60;

  return `${hours > 0 ? `${hours}h ` : ``}${minutes}m`;
};

export {isEscEvent, formatTime};
