import { capitalize } from 'lodash';
import { Attr, BelongsTo, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import School from './School';
import YearbookContractDetail from './YearbookContractDetail';

@Model()
class YearbookAdminJob extends ApplicationRecord {
  static jsonapiType = 'yearbook_admin_jobs';
  @Attr() confirmationStatus?: 'tentative' | 'confirmed' | 'declined';
  @Attr() coverApproval: string;
  @Attr() coverContest: string = 'No';
  @Attr() customSetup: boolean;
  @Attr() dateflyersposterssenttoprint?: string;
  @Attr() flowClassPictures?: string;
  @Attr() hardCopyProof: boolean;
  @Attr() lastday: string;
  @Attr() notes: string;
  @Attr() numberofpages: number;
  @Attr() pixamisetupdate: string;
  @Attr() presaleDeadline: string = '12/31/2022';
  @Attr() previousYearCredit: number;
  @Attr() salesdeadline: string = '04/21/2023';
  @Attr() schoolId: number;
  @Attr() submittedFinalYearbook?: string;
  @Attr() submittedYearbookForProofing?: string;
  @Attr() year: number = 2022;
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
  formattedBindingTypes() : string {
    if (this.yearbookContractDetails.length === 0) return '';
    if (this.yearbookContractDetails.length === 1) {
      return capitalize((this.yearbookContractDetails[0].bindingType || '').replace('_', ' '));
    }

    const bindings = this
      .yearbookContractDetails
      .map((contractDetail) => capitalize(contractDetail.bindingType.replace('_', ' '))).join(', ');

    return `Split binding (${bindings})`;
  }
}

export default YearbookAdminJob;
