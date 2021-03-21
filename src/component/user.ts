import { style } from './user.style';
import { classMap } from 'lit-html/directives/class-map';
import { customElement, html, property } from 'lit-element';
import { customEmit, UIElement, useState } from './../util/decorators';

@customElement('user-component')
@customEmit({ name: 'user-click' })
@useState()
export class UsersComponent extends UIElement {
  @property({ type: Object })
  data: any = null;

  @property({ type: Boolean })
  selected: boolean = false;

  static styles = [style];

  render() {
    return html`
      <div @click="${this.onClick}" class="${classMap({ selected: this.selected })}">
        <h4>${this.data.name}</h4>
        <p>${this.data.email}</p>
      </div>
    `;
  }

  // events go here -----------------------------------------------------------

  onClick(): void {
    this.emit('user-click', this.data);
  }
}
