import { Attr, BelongsTo, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import School from './School';

@Model()
class FailedAccessCodeAttempt extends ApplicationRecord {
  static jsonapiType = 'failed_access_code_attempts';
  @Attr() createdAt: Date;
  @Attr() email: string;
  @Attr() grade: string;
  @Attr() phone: string;
  @Attr() schoolId: number;
  @Attr() status: 'not_processed' | 'processed';
  @Attr() studentFirstName: string;
  @Attr() studentLastName: string;
  @Attr() updatedAt: Date;
  @BelongsTo() school: School;
}

export default FailedAccessCodeAttempt;
