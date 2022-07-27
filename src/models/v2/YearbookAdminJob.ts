import { Attr, BelongsTo, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import School from './School';
import YearbookContractDetail from './YearbookContractDetail';

@Model()
class YearbookAdminJob extends ApplicationRecord {
  static jsonapiType = 'yearbook_admin_jobs';
  @Attr() confirmationStatus?: 'tentative' | 'confirmed' | 'declined';
  @Attr() coverApproval?: string;
  @Attr() customSetup: boolean;
  @Attr() dateflyersposterssenttoprint?: string;
  @Attr() flowClassPictures?: string;
  @Attr() hardCopyProof: boolean;
  @Attr() lastday: string;
  @Attr() notes: string;
  @Attr() numberofpages: number;
  @Attr() pixamisetupdate: string;
  @Attr() presaleDeadline: string;
  @Attr() salesdeadline: string;
  @Attr() schoolId: number;
  @Attr() submittedFinalYearbook?: string;
  @Attr() submittedYearbookForProofing?: string;
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
