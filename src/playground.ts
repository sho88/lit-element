import { css, customElement, html, property } from 'lit-element';
import { filter } from 'rxjs/operators';
import { customEmit, event, service, UIElement, useState } from './decorators';

class UserService {
  getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json());
  }

  getUser(id: number) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json());
  }
}

@customElement('app-component')
@useState()
export class Application extends UIElement {
  @service(UserService)
  userService!: UserService;

  constructor() {
    super();
    this.userService.getUsers().then(
      users => this.setState({ users }),
      err => console.error(err)
    );
  }

  render() {
    return html`
      <div>
        <p>Hello world...</p>
        <users-component @user-click="${this.onUserClick}" @something-random="${this.onSomethingRandom}"></users-component>
      </div>
    `;
  }

  // events go here...

  @event()
  onSomethingRandom(randomInfo: any) {
    console.log(randomInfo);
  }

  @event('detail')
  onUserClick(user: any) {
    this.userService.getUser(user.id).then(
      user => console.log(user),
      error => console.error(error)
    );
  }
}

@customElement('users-component')
@customEmit({ name: 'user-click' })
@customEmit({ name: 'something-random' })
@useState()
export class UsersComponent extends UIElement {
  @property({ type: Array })
  users: Array<any> = [];

  @property({ type: Number })
  date: number = Date.now();

  static styles = css`
    pre { background: #f1f1f1; cursor: pointer; padding: 10px; }
    small { color: #aaaaaa; display: block; }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.getState('users')
      .pipe(filter(users => users !== undefined))
      .subscribe((users: Array<any>) => this.users = [...users]);
  }

  render() {
    return html`
      <p>
        The number of users: ${this.users.length}
        <small>Date: ${this.date}</small>
      </p>
      ${this.users.map(user => html`<pre @click="${() => this.onClick(user)}">${JSON.stringify(user, null, 2)}</pre>`)}
    `;
  }

  // events go here...

  onClick(user: any): void {
    this.emit('user-click', user);
    this.emit('something-random', {
      name: 'James Brown',
      email: 'james.brown@google.com'
    });
  }
}
