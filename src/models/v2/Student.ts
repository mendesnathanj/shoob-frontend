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
  // Extra attributes
  @Attr() hasDefaultYearbookPose: boolean;
  @Attr() hasSelectedYearbookPose: boolean;
  @Attr() seniorYearbookPoseId: string;
  @Attr() seniorYearbookPoseUrl: string;
  @BelongsTo() school: School;
  @HasMany() seniorImages: SeniorImage[];
  @HasMany() studentImages: StudentImage[];
  @HasMany() orderPackages: OrderPackage[];
  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  defaultYearbookPose(): Pose | undefined {
    const imageWithPoses = this.studentImages.find((studentImage) => studentImage.poses.length > 0);
    if (!imageWithPoses) return undefined;
    const defaultPose = imageWithPoses.poses.find((pose) => (pose.imageUrl || '').includes('-01.png'));

    return defaultPose;
  }
  selectedYearbookPose(): SeniorImage | undefined {
    const orderPackage = this.orderPackages.find((temp) => temp.seniorImage);

    if (orderPackage) return orderPackage.seniorImage;
  }
  yearbookImage(): SeniorImage | Pose | undefined {
    const selectedYearbookPose = this.selectedYearbookPose();
    if (selectedYearbookPose) return selectedYearbookPose;

    return this.defaultYearbookPose();
  }
}

export default Student;
