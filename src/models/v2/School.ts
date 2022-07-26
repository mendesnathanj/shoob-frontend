import { Attr, BelongsTo, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import ContactInformation from './ContactInformation';
import District from './District';
import YearbookContractDetail from './YearbookContractDetail';

@Model()
class School extends ApplicationRecord {
  static jsonapiType = 'schools';
  @Attr() enrollment: string;
  @Attr() name: string;
  @Attr() scode: string;
  @BelongsTo() district: District;
  @HasMany() contactInformations: ContactInformation[];
  @HasMany() yearbookContractDetails: YearbookContractDetail[];
}

export default School;
