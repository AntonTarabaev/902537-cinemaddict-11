import {getFilmsBySort} from "@utils/sort";
import {SortType} from "@consts";

export const createUserRankTemplate = (films) => {
  let userRank = ``;

  if (films) {
    const watchedFilms = getFilmsBySort(films, SortType.HISTORY).length;

    if (watchedFilms > 20) {
      userRank = `Movie Buff`;
    } else if (watchedFilms > 10) {
      userRank = `Fan`;
    } else if (watchedFilms > 0) {
      userRank = `Novice`;
    }
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
