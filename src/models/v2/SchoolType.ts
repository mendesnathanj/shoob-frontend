import { Attr, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class SchoolType extends ApplicationRecord {
  static jsonapiType: 'school_types';
  @Attr() name: string;
}

export default SchoolType;
