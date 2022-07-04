import { Attr, BelongsTo, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import YearbookAdminJob from './YearbookAdminJob';

@Model()
class YearbookContractDetail extends ApplicationRecord {
  static jsonapiType = 'yearbook_contract_details';
  @Attr() bindingType: string;
  @Attr() finalSalePrice: number;
  @Attr() presalePrice: number;
  @Attr() quantity: number;
  @Attr() schoolPrice: number;
  @Attr() shipping: number;
  @Attr() yearbookAdminJobId: number;
  @BelongsTo() yearbookAdminJob: YearbookAdminJob;
}

export default YearbookContractDetail;
