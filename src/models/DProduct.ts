import { Attr, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class DProduct extends ApplicationRecord {
  static jsonapiType = 'd_products';
  @Attr() category: string;
  @Attr() description: string;
  @Attr() destination: string;
  @Attr() jobDate: string;
  @Attr() jobId: number;
  @Attr() jobType: string;
  @Attr() name: string;
  @Attr() price: number;
  @Attr() shippedBy: string;
  @Attr() shipDate: string;
  @Attr() shippedVia: string;
  @Attr() createdAt: Date;
}

export default DProduct;
