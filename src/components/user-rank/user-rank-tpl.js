import {getFilmsBySort} from "@utils/sort";
import {getUserRank} from "@utils/common";
import {SortType} from "@consts";

export const createUserRankTemplate = (films) => {
  const userRank = getUserRank(films ? getFilmsBySort(films, SortType.HISTORY).length : 0);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
