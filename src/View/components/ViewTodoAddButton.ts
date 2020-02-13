import { Component } from "../Component";

export default class ViewTodoAddButton implements Component {
  render = (): HTMLElement => {
    const element = document.createElement("div");
    // element.className = "add_todo";
    // element.id = "add_todo";
    // element.textContent = "+";

    const content = document.createElement("p");
    content.className = "add_todo";
    content.textContent = "+";
    content.style.margin = "0%";

    element.append(content);

    return element;
  };
}
