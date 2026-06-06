export default class UserRepository {
  constructor(dao){
    this.dao = dao;
  }
  getByEmail(email){
    return this.dao.getByEmail(email);
  }
  create(user){
    return this.dao.create(user);
  }
}
