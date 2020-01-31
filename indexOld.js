var TodoModel = function TodoModel() {
  this.buttons = [
    {
      text: "Click me!",
      color: "red"
    },
    {
      text: "Hello!",
      color: "blue"
    }
  ];
};

TodoModel.prototype.getTodo = function getTodo(index, fn) {
  fn(this.buttons[index]);
};

var TodoView = function TodoView(element) {
  this.element = element;

  this.onClickGetTodo = null;
};

TodoView.prototype.render = function render(todoData) {
  this.element.innerHTML =
    "<h3>" +
    "Todo" +
    "</h3>" +
    `<button id="click_button" type="button">` +
    todoData.text +
    "</button>";

  var click_button = this.element.querySelector("#click_button");
  click_button.addEventListener("click", this.onClickGetTodo);
  click_button.style.background = todoData.color;
};

var TodoController = function TodoController(todoView, todoModel) {
  this.todoView = todoView;
  this.todoModel = todoModel;
};

TodoController.prototype.initialize = function initialize() {
  this.todoView.onClickGetTodo = this.onClickGetTodo.bind(this);
  //this.showTodo();
  this.todoModel.getTodo(0, this.showTodo.bind(this));
};

TodoController.prototype.onClickGetTodo = function onClickGetTodo(e) {
  var index = 1;

  this.todoModel.getTodo(index, this.showTodo.bind(this));
};

TodoController.prototype.showTodo = function showTodo(todoData) {
  this.todoView.render(todoData);
};

var todoModel = new TodoModel();

var targetElement = document.getElementById("listOfPenguins");
var todoView = new TodoView(targetElement);

var controller = new TodoController(todoView, todoModel);

controller.initialize();

// controller.onClickGetTodo({
//   currentTarget: { dataset: { penguinIndex: 0 } }
// });
