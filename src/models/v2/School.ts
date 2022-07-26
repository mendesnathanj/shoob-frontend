import { Attr, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import ContactInformation from './ContactInformation';
import YearbookContractDetail from './YearbookContractDetail';

@Model()
class School extends ApplicationRecord {
  static jsonapiType = 'schools';
  @Attr() name: string;
  @Attr() scode: string;
  @HasMany() contactInformations: ContactInformation[];
  @HasMany() yearbookContractDetails: YearbookContractDetail[];
}

export default School;
