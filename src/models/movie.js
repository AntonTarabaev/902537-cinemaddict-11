export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.commentsIds = data[`comments`];
    this.commentsCount = data[`comments`].length;
    this.name = data[`film_info`][`title`];
    this.originalName = data[`film_info`][`alternative_title`];
    this.description = data[`film_info`][`description`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.country = data[`film_info`][`release`][`release_country`];
    this.poster = data[`film_info`][`poster`];
    this.genres = data[`film_info`][`genre`];
    this.director = data[`film_info`][`director`];
    this.actors = data[`film_info`][`actors`];
    this.writers = data[`film_info`][`writers`];
    this.contentRating = data[`film_info`][`age_rating`];
    this.duration = data[`film_info`][`runtime`];
    this.rating = data[`film_info`][`total_rating`];
    this.isWatched = Boolean(data[`user_details`][`already_watched`]);
    this.watchingDate = data[`user_details`][`watching_date`] ? new Date(data[`user_details`][`watching_date`]) : null;
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.isInWatchlist = Boolean(data[`user_details`][`watchlist`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.commentsIds,
      'film_info': {
        'title': this.name,
        'alternative_title': this.originalName,
        'description': this.description,
        'release': {
          'date': this.releaseDate.toISOString(),
          'release_country': this.country,
        },
        'poster': this.poster,
        'genre': this.genres,
        'director': this.director,
        'actors': this.actors,
        'writers': this.writers,
        'age_rating': this.contentRating,
        'runtime': this.duration,
        'total_rating': this.rating,
      },
      'user_details': {
        'already_watched': this.isWatched,
        'watching_date': this.watchingDate ? this.watchingDate.toISOString() : null,
        'favorite': this.isFavorite,
        'watchlist': this.isInWatchlist,
      },
    };
  }

  static parseFilm(data) {
    return new Movie(data);
  }

  static parseFilms(data) {
    return data.map(Movie.parseFilm);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
