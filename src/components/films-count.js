export const createFilmsCountTemplate = (filmsCount) => {
  const count = filmsCount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `);

  return (
    `<p>${count} movies inside</p>`
  );
};
