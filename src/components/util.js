const ESC_KEY = `Escape`;

const isEscEvent = (evt, action) => {
  if (evt.key === ESC_KEY) {
    action();
  }
};

export {isEscEvent};
