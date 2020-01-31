export let TodoView = function TodoView(element) {
  this.element = element;

  this.onClickGetTodo = null;
  this.onMouseDown = null;
};

TodoView.prototype.render = function render(todoData) {
  this.element.innerHTML =
    "<h3>" +
    "Todo" +
    "</h3>" +
    `<button id="click_button" class="note" type="button">` +
    todoData.text +
    "</button>";

  var click_button = this.element.querySelector("#click_button");
  click_button.addEventListener("click", this.onClickGetTodo);
  click_button.addEventListener("mousedown", this.onMouseDown);
  click_button.style.background = todoData.color;
};

TodoView.prototype.MoveNote = function MoveNote(e) {
  let note = document.elementFromPoint(e.clientX, e.clientY);
  let shiftX = e.clientX - note.getBoundingClientRect().left;
  let shiftY = e.clientY - note.getBoundingClientRect().top;

  note.style.position = "absolute";
  note.style.zIndex = 1000;
  // переместим в body, чтобы мяч был точно не внутри position:relative
  document.body.append(note);
  // и установим абсолютно спозиционированный мяч под курсор

  moveAt(e.pageX, e.pageY);

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(pageX, pageY) {
    note.style.left = pageX - shiftX + "px";
    note.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    note.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    note.hidden = false;

    if (!elemBelow) return;
  }

  // (3) перемещать по экрану
  document.addEventListener("mousemove", onMouseMove);

  // (4) положить мяч, удалить более ненужные обработчики событий
  note.onmouseup = function() {
    document.removeEventListener("mousemove", onMouseMove);
    note.onmouseup = null;
  };
};
