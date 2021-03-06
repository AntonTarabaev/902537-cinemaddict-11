import {formatTime} from "@utils/common";

const MAX_DESCRIPTON_TEXT_LENGTH = 140;

export const createFilmCardTemplate = (film) => {
  const {description, duration, releaseDate, rating, isWatched, isFavorite, isInWatchlist, poster, name, genres, commentsCount} = film;

  const descriptionText = description.length > MAX_DESCRIPTON_TEXT_LENGTH ? `${description.slice(0, MAX_DESCRIPTON_TEXT_LENGTH - 1)}...` : description;

  const controlButtonActiveClass = `film-card__controls-item--active`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating.toFixed(1)}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${formatTime(duration)}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionText}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? controlButtonActiveClass : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? controlButtonActiveClass : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? controlButtonActiveClass : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};
