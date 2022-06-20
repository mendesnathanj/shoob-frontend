import { Attr, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class DjobType extends ApplicationRecord {
  static jsonapiType = 'djob_types';
  @Attr() jobType: string;
}

export default DjobType;
