export const createFilmsListTemplate = (title, isExtra) => {
  const extraPostfix = `--extra`;
  const visuallyHiddenClass = `visually-hidden`;

  return (
    `<section class="films-list${isExtra ? extraPostfix : ``}">
      <h2 class="films-list__title ${isExtra ? `` : visuallyHiddenClass}">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};
