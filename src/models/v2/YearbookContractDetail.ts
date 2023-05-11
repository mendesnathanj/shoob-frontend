import { Attr, BelongsTo, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';
import YearbookAdminJob from './YearbookAdminJob';

@Model()
class YearbookContractDetail extends ApplicationRecord {
  static jsonapiType = 'yearbook_contract_details';
  @Attr() bindingType: string;
  @Attr() finalSalePrice: number;
  @Attr() hardCopyProof: boolean;
  @Attr() numOfExtras: number;
  @Attr() presalePrice: number;
  @Attr() pricePerBook: number;
  @Attr() quantity: number;
  @Attr() shipping: number;
  @Attr() yearbookAdminJobId: number;
  @Attr() quantitySoldOnWebsite?: number;
  @BelongsTo() yearbookAdminJob: YearbookAdminJob;
}

export default YearbookContractDetail;
