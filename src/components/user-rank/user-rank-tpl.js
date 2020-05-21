import {getFilmsBySort} from "@utils/sort";
import {SortTypes} from "@consts";

const UserRanks = {
  NO_RANK: {
    FILMS_COUNT: 0,
    RANK: ``,
  },
  NOVICE: {
    FILMS_COUNT: 1,
    RANK: `Novice`,
  },
  FAN: {
    FILMS_COUNT: 11,
    RANK: `Fan`
  },
  BUFF: {
    FILMS_COUNT: 21,
    RANK: `Movie Buff`
  }
};

export const getUserRank = (watchedFilmsCount) => {
  if (watchedFilmsCount >= UserRanks.BUFF.FILMS_COUNT) {
    return UserRanks.BUFF.RANK;
  }
  if (watchedFilmsCount >= UserRanks.FAN.FILMS_COUNT) {
    return UserRanks.FAN.RANK;
  }
  if (watchedFilmsCount > UserRanks.NOVICE.FILMS_COUNT) {
    return UserRanks.NOVICE.RANK;
  }
  return UserRanks.NO_RANK.RANK;
};

export const createUserRankTemplate = (films) => {
  const userRank = getUserRank(films ? getFilmsBySort(films, SortTypes.HISTORY).length : 0);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
