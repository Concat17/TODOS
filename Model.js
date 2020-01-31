export let TodoModel = function TodoModel() {
  this.notes = [
    {
      text: "Click me!",
      color: "red"
    },
    {
      text: "Hello!",
      color: "blue"
    }
  ];
  this.currentIndex = 0;
};

TodoModel.prototype.getTodo = function getTodo(fn) {
  this.currentIndex = this.currentIndex === 0 ? 1 : 0;
  fn(this.notes[this.currentIndex]);
};
