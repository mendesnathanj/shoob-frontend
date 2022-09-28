import { Attr, BelongsTo, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import Pose from './Pose';
import Student from './Student';

@Model()
class StudentImage extends ApplicationRecord {
  static jsonapiType = 'student_images';
  @Attr() folder: string;
  @Attr() grade: string;
  @Attr() imageUrl: string;
  @Attr() studentId: string;
  @BelongsTo() student: Student;
  @HasMany() poses: Pose[];
}

export default StudentImage;
