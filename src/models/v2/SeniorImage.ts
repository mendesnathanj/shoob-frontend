import { Attr, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class SeniorImage extends ApplicationRecord {
  static jsonapiType = 'senior_images';
  @Attr() extension: string;
  @Attr() imageUrl: string | null;
  @Attr() index: string;
  @Attr() selectedForYearbook: boolean;
  @Attr() studentImageId: string;
  @Attr({ persist: false }) type: string;
  @Attr() url: string;
}

export default SeniorImage;
