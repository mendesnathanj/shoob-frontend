import { Attr, BelongsTo, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import DjobType from './DjobType';

@Model()
class DProduct extends ApplicationRecord {
  static jsonapiType = 'd_products';
  @Attr() category: string;
  @Attr() description: string;
  @Attr() destination: string;
  @Attr() jobDate: string;
  @Attr() djobId: number;
  @Attr() djobTypeId: string;
  @Attr() name: string;
  @Attr() price: number;
  @Attr() shippedBy: string;
  @Attr() shipDate: string;
  @Attr() shippedVia: string;
  @Attr() createdAt: Date;
  @BelongsTo() djobType: DjobType;
}

export default DProduct;
