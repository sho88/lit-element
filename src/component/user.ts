import { css, customElement, html, property } from 'lit-element';
import { customEmit, UIElement, useState } from './../util/decorators';

@customElement('user-component')
@customEmit({ name: 'user-click' })
@useState()
export class UsersComponent extends UIElement {
  @property({ type: Object })
  data: any = null;

  @property({ type: Number })
  date: number = Date.now();

  static styles = css`
    pre { background: #f1f1f1; cursor: pointer; padding: 10px; }
    small { color: #aaaaaa; display: block; }
  `;

  render() {
    return html`<pre @click="${this.onClick}">${JSON.stringify(this.data, null, 2)}</pre>`;
  }

  // events go here -----------------------------------------------------------

  onClick(): void {
    this.emit('user-click', this.data);
  }
}
