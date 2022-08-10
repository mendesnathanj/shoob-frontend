import { Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class User extends ApplicationRecord {
  static jsonapiType = 'users';
}

export default User;
