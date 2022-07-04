import { HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import ContactInformation from './ContactInformation';

@Model()
class YearbookAdminJob extends ApplicationRecord {
  static jsonapiType = 'yearbook_admin_jobs';
  @HasMany() contactInformations: ContactInformation[];
}

export default YearbookAdminJob;
