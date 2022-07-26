import { Attr, BelongsTo, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import School from './School';
import YearbookContractDetail from './YearbookContractDetail';

@Model()
class YearbookAdminJob extends ApplicationRecord {
  static jsonapiType = 'yearbook_admin_jobs';
  @Attr() confirmationStatus?: 'tentative' | 'confirmed' | 'declined';
  @Attr() customSetup: boolean;
  @Attr() dateflyerspostersdelivered: 'Yes' | 'No';
  @Attr() lastday: Date;
  @Attr() haspixamiaccount: 'Yes' | 'No';
  @Attr() presaleDeadline: Date;
  @Attr() salesdeadline: Date;
  @Attr() schoolId: number;
  @Attr() year: number;
  @Attr() yearbkadvisor1name: string;
  @Attr() yearbkadvisor1email: string;
  @Attr() yearbkadvisor1phone: string;
  @Attr() yearbkadvisor2name: string;
  @Attr() yearbkadvisor2email: string;
  @Attr() yearbkadvisor2phone: string;
  @BelongsTo() school: School;
  @HasMany() yearbookContractDetails: YearbookContractDetail[];
  // Extra attributes for querying
  @Attr() years?: number[];
}

export default YearbookAdminJob;
