Solarize(function() {
  this.setColor('test', 200, 0, 0);

  let hello = new this.Label('Hello, World!');
  let hello2 = new this.Label('This is a label');
  hello2.locate(0, 20);
  hello2.text('This is a label\nplus a bit!');
  hello2.backgroundColor(this.PALLETE.test);
});