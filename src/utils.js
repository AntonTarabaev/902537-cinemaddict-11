export const RenderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

export const formatTime = (durationInMinutes) => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes - hours * 60;

  return `${hours > 0 ? `${hours}h ` : ``}${minutes}m`;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
