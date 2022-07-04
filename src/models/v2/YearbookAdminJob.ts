import { Attr, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import ContactInformation from './ContactInformation';
import YearbookContractDetail from './YearbookContractDetail';

@Model()
class YearbookAdminJob extends ApplicationRecord {
  static jsonapiType = 'yearbook_admin_jobs';
  @Attr() name: string;
  @Attr() scode: string;
  @Attr() schoolId: number;
  @Attr() status: string;
  @HasMany() contactInformations: ContactInformation[];
  @HasMany() yearbookContractDetails: YearbookContractDetail[];
}

export default YearbookAdminJob;
