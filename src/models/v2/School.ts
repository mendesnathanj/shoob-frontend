import { Attr, BelongsTo, HasMany, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import ContactInformation from './ContactInformation';
import District from './District';
import SchoolType from './SchoolType';
import YearbookContractDetail from './YearbookContractDetail';

@Model()
class School extends ApplicationRecord {
  static jsonapiType = 'schools';
  @Attr() enrollment: string;
  @Attr() name: string;
  @Attr() phone: string;
  @Attr() prinFname: string;
  @Attr() prinLname: string;
  @Attr() prinEmail: string;
  @Attr() route: string;
  @Attr() salesStat: string;
  @Attr() sec1Fname: string;
  @Attr() sec1Lname: string;
  @Attr() sec1Email: string;
  @Attr() scode: string;
  @BelongsTo() district: District;
  @BelongsTo() schoolType: SchoolType;
  @HasMany() contactInformations: ContactInformation[];
  @HasMany() yearbookContractDetails: YearbookContractDetail[];
}

export default School;
