import { Attr, BelongsTo, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import School from './School';

type Roles = 'ADMIN' |
  'SCHOOL_ADMIN' |
  'PRINCIPAL' |
  'TEACHER' |
  'SECRETARY' |
  'DEVELOPER' |
  'PHOTOGRAPHER' |
  'EMPLOYEE' |
  'ROLE_NOT_FOUND';

@Model()
class User extends ApplicationRecord {
  static jsonapiType = 'users';
  @Attr() role: Roles;
  @Attr() schoolId: number;
  @BelongsTo() school: School;
}

export default User;
