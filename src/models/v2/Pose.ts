import { Attr, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class Pose extends ApplicationRecord {
  static jsonapiType = 'poses';
  @Attr() extension: string;
  @Attr() imageUrl: string;
  @Attr() index: string;
  @Attr() selectedForYearbook: boolean;
  @Attr() studentImageId: string;
  @Attr({ persist: false }) type: string;
  @Attr() url: string;
}

export default Pose;
