import { customElement, html, property } from "lit-element";
import { Subscription } from "rxjs";
import { customEmit, UIElement } from "./decorators";

// open-wc/testing should be installed
@customElement('test-component')
@customEmit({ name: 'name-change', bubbles: true })
export class TestComponent extends UIElement {
  @property({ type: String })
  name: string = '';

  @property({ type: Number })
  counter: number = 0;

  subscriptions = new Subscription();

  render() {
    return html`
      <div>
        <p @click=${this.onClick}>${this.name.length ? html`${this.name}` : 'Loading...'}</p>
        ${this.counter ? html`<p>You have clicked on me ${this.counter} time(s).</p>` : ''}
      </div>
    `;
  }

  // ------------------------------------------------------------------------

  onClick() {
    this.emit('title-click', 'James Carter');
  }
}
