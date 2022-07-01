import { Attr, BelongsTo, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import DjobType from './DjobType';

@Model()
class DProduct extends ApplicationRecord {
  static jsonapiType = 'd_products';
  @Attr() category: string;
  @Attr() description: string;
  @Attr() destination: string;
  @Attr() djobTypeId: string;
  @Attr() name: string;
  @Attr() price: number;
  @Attr() createdAt: Date;
  @BelongsTo() djobType: DjobType;
}

export default DProduct;
