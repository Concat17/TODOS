import { Component } from '../Component';

export default class ViewNote implements Component {
  myImportantData = "nani?";

  render(): HTMLElement {
    const element = document.createElement("div");
    element.textContent = this.myImportantData;

    return element;
  }
}
