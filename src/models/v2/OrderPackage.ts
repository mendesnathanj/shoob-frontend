import { BelongsTo, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import SeniorImage from './SeniorImage';

@Model()
class OrderPackage extends ApplicationRecord {
  static jsonapiType = 'order_packages';
  @BelongsTo() seniorImage: SeniorImage;
}

export default OrderPackage;
