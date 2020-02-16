import { Component } from "../Component";

export default class ViewTodoAddButton implements Component {
  render = (): HTMLElement => {
    const element = document.createElement("div");

    const content = document.createElement("p");
    content.className = "add_todo";
    content.textContent = "+";
    content.style.margin = "0%";

    element.append(content);

    return element;
  };
}
