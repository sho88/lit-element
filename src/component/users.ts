import { customElement, html, property } from 'lit-element';
import { event, service, UIElement, useState } from './../util/decorators';
import { UserService } from './../service/user';
import { filter } from 'rxjs/operators';

@customElement('users-component')
@useState()
export class Application extends UIElement {
  @service(UserService)
  userService!: UserService;

  @property({ type: Array })
  users: Array<any> = [];

  constructor() {
    super();
    this.userService.getUsers().then(
      users => this.setState({ users }),
      error => console.error(error)
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.getState('users')
      .pipe(filter(users => users !== undefined))
      .subscribe((users: Array<any>) => this.users = [...users]);
  }

  render() {
    return html`
      <div>
        ${this.users.map(user => html`
          <user-component
            .data="${user}"
            @user-click="${this.onUserClick}"></user-component>
        `)}
      </div>
    `;
  }

  // events go here...

  @event()
  onUserClick(user: any) {
    this.userService.getUser(user.id).then(
      user => console.log(user),
      error => console.error(error)
    );
  }
}
