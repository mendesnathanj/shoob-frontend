import { Attr, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class District extends ApplicationRecord {
  static jsonapiType = 'districts';
  @Attr() name: string;
}

export default District;
