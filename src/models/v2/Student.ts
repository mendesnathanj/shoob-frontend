import { Attr, BelongsTo, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import OrderPackage from './OrderPackage';
import Pose from './Pose';
import School from './School';
import SeniorImage from './SeniorImage';
import StudentImage from './StudentImage';

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
  @HasMany() studentImages: StudentImage[];
  @HasMany() orderPackages: OrderPackage[];
  yearbookImage(): SeniorImage | Pose | undefined {
    if (this.orderPackages.length > 0) {
      return this.orderPackages.find((orderPackage) => orderPackage.seniorImage).seniorImage;
    }

    if (this.studentImages.length > 0) {
      const imageWithPoses = this.studentImages.find((studentImage) => studentImage.poses.length > 0);
      if (!imageWithPoses) return undefined;
      const defaultPose = imageWithPoses.poses.find((pose) => (pose.imageUrl || '').includes('-01.png'));

      return defaultPose;
    }

    return undefined;
  }
}

export default Student;
