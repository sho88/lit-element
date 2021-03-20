export class UserService {
  getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json());
  }

  getUser(id: number) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json());
  }
}
