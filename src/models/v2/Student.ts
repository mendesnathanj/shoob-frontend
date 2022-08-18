import { Attr, BelongsTo, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import School from './School';

@Model()
class Student extends ApplicationRecord {
  static jsonapiType = 'students';
  @Attr() firstName: string;
  @Attr() lastName: string;
  @Attr() grade: string;
  @Attr() studentId: string;
  @Attr() schoolId: number;
  @Attr() teacher: string;
  @Attr() idOnly: string;
  @Attr() dob: string;
  @BelongsTo() school: School;
}

export default Student;
