export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string) { }

  matches(another: User): boolean {
    return another !== undefined &&
      another.email === this.email && another.password === this.password
  }
}

export const users: { [key: string]: User } = {
  'dalila.siqueira@gmail.com': new User('dalila.siqueira@gmail.com', 'Dalila', 'cavala78'),
  'alex.leleco@gmail.com': new User('alex.leleco@gmail.com', 'Alex', 'alex05')
}