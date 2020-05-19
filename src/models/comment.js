export default class Comment {
  constructor(data) {
    this.id = data[`id`] ? data[`id`] : null;
    this.author = data[`author`] ? data[`author`] : null;
    this.date = new Date(data[`date`]);
    this.text = data[`comment`];
    this.emoji = data[`emotion`];
  }

  toRAW() {
    return {
      'comment': this.text,
      'date': this.date.toISOString(),
      'emotion': this.emoji,
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
