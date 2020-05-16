import {EMOJI} from "@consts";

const NameItems = [
  `Made for Each Other`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Sagebrush Trail`,
  `Santa Claus Conquers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`,
];

const DescriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const PosterItems = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const GenreItems = [
  `Cartoon`,
  `Comedy`,
  `Drama`,
  `Western`,
  `Musical`,
  `Mystery`,
  `Film-Noir`,
];

const AuthorItems = [
  `Tim Macoveev`,
  `John Doe`,
  `James Abrams`,
  `Tomas Brown`,
  `Adam J`,
  `Bruce Wayne`,
  `Quentin Tarantino`,
  `Robert Rodrigues`,
  `Takeshi Kitano`,
  `Michael Caine`,
  `Robert De Niro`,
  `Tom Hanks`,
];

const ContentRatingItems = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`,
];

const CountryItems = [
  `USA`,
  `Russia`,
  `China`,
  `Australia`,
  `Spain`,
  `Germany`,
];

const getRandomFloatNumber = (min, max) => Math.random() * (max - min) + min;

const getRandomIntegerNumber = (min, max) => Math.floor(getRandomFloatNumber(min, max + 1));

const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(0, 3650);

  targetDate.setDate(targetDate.getDate() - diffValue);
  targetDate.setHours(getRandomIntegerNumber(0, 23), getRandomIntegerNumber(0, 59));

  return targetDate;
};

const generateComment = () => {
  const date = getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    text: DescriptionItems
      .sort(() => Math.random() - 0.5)
      .slice(0, getRandomIntegerNumber(1, 5)),
    date,
    emoji: getRandomArrayItem(Object.values(EMOJI)),
    author: getRandomArrayItem(AuthorItems),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const generateFilm = () => {
  const releaseDate = getRandomDate();
  const commentsCount = getRandomIntegerNumber(0, 5);

  return {
    id: String(new Date() + Math.random()),
    name: getRandomArrayItem(NameItems),
    originalName: getRandomArrayItem(NameItems),
    description: DescriptionItems
      .sort(() => Math.random() - 0.5)
      .slice(0, getRandomIntegerNumber(1, 5))
      .join(` `),
    releaseDate,
    poster: getRandomArrayItem(PosterItems),
    genres: GenreItems
      .sort(() => Math.random() - 0.5)
      .slice(0, getRandomIntegerNumber(1, 3)),
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isInWatchlist: Math.random() > 0.5,
    rating: getRandomFloatNumber(0, 10).toFixed(1),
    commentsCount,
    comments: generateComments(commentsCount),
    duration: getRandomIntegerNumber(20, 180),
    contentRating: getRandomArrayItem(ContentRatingItems),
    director: getRandomArrayItem(AuthorItems),
    writers: AuthorItems
      .sort(() => Math.random() - 0.5)
      .slice(0, getRandomIntegerNumber(1, 3)),
    actors: AuthorItems
      .sort(() => Math.random() - 0.5)
      .slice(0, getRandomIntegerNumber(1, 3)),
    country: getRandomArrayItem(CountryItems),
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
