export default class UserDTO {
  constructor(userRaw) {
    this.first_name = userRaw.first_name,
    this.last_name = userRaw.last_name,
    this.email = userRaw.email,
    this.age = userRaw.age,
    this.password = userRaw.password,
    this.role = userRaw.role
  }

  getFullName() {
    return this.first_name + this.last_name
  }

}