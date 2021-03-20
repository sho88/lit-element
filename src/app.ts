import { LitElement, html, customElement, property, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

@customElement('app-component')
export class HelloWorldElem extends LitElement {
  @property({ type: Object })
  classes = { container: false, content: true };

  @property({ type: String })
  description = '';

  @property({ type: String })
  title = '';

  static styles = css`
    .container { background: #f1f1f1; }
    .content { padding: 10px; }
  `;

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <h1>${this.title}</h1>
        <p>${this.description}</p>
        <button @click=${this.onClick}>Toggle Class</button>
        <hr />

        <test-component
          .name=${this.title}
          @title-click=${this.onTitleClick}></test-component>
      </div>
    `;
  }

  // events go here....................

  onClick() {
    this.title = 'My Application';
    this.classes = {
      ...this.classes,
      container: !this.classes.container
    }
  }

  // @TODO: decorator to extract the CustomEvent.detail instead of having to destructure all the time.
  onTitleClick({ detail: title }: CustomEvent) {
    this.title = title;
  }
}