import { Attr, BelongsTo, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import School from './School';
import YearbookContractDetail from './YearbookContractDetail';

@Model()
class YearbookAdminJob extends ApplicationRecord {
  static jsonapiType = 'yearbook_admin_jobs';
  @Attr() confirmationStatus?: 'tentative' | 'confirmed' | 'declined';
  @Attr() schoolId: number;
  @Attr() year: number;
  @BelongsTo() school: School;
  @HasMany() yearbookContractDetails: YearbookContractDetail[];
  // Extra attributes for querying
  @Attr() years?: number[];
}

export default YearbookAdminJob;
