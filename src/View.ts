const TodoView = function TodoView(element) {
  this.element = element;

  this.onClickGetTodo = null;
  this.onMouseDown = null;
};

TodoView.prototype.render = function render(todoData) {
  // TODO: Generation todos via css grid
  this.element.innerHTML = `<div id="click_button" class="note">
  <div class="note_name">${todoData.name}</div>
  <div class="note_todos"><div> 
  </div>`;
  // "<h3>" +
  // "Todo" +
  // "</h3>" +
  // `<div id="click_button" class="note" >` +
  // todoData.text +
  // "</div>";

  const clickButton = this.element.querySelector("#click_button");
  clickButton.addEventListener("click", this.onClickGetTodo);
  clickButton.addEventListener("mousedown", this.onMouseDown);
  clickButton.style.background = todoData.color;
};

function addNote() {}

TodoView.prototype.MoveNote = function MoveNote(e) {
  // const note = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  // const shiftX = e.clientX - note.getBoundingClientRect().left;
  // const shiftY = e.clientY - note.getBoundingClientRect().top;
  // note.style.position = "absolute";
  // note.style.zIndex = "1000";
  // // переместим в body, чтобы мяч был точно не внутри position:relative
  // document.body.append(note);
  // // и установим абсолютно спозиционированный мяч под курсор
  // function moveAt(pageX: number, pageY: number) {
  //   note.style.left = `${pageX - shiftX}px`;
  //   note.style.top = `${pageY - shiftY}px`;
  // } // TODO:
  // moveAt(e.pageX, e.pageY);
  // // передвинуть мяч под координаты курсора
  // // и сдвинуть на половину ширины/высоты для центрирования
  // function onMouseMove(event) {
  //   moveAt(event.pageX, event.pageY);
  //   // note.hidden = true;
  //   // const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  //   // note.hidden = false;
  //   // if (!elemBelow) return;
  // }
  // // (3) перемещать по экрану
  // document.addEventListener("mousemove", onMouseMove);
  // // (4) положить мяч, удалить более ненужные обработчики событий
  // note.onmouseup = function onMouseUp() {
  //   document.removeEventListener("mousemove", onMouseMove);
  //   note.onmouseup = null;
  // };
};

export default TodoView;
