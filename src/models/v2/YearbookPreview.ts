import { Attr, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class YearbookPreview extends ApplicationRecord {
  static jsonapiType = 'yearbook_previews';
  @Attr() isProcessing: boolean;
  @Attr() schoolId: number;
  @Attr() previewUrl: string;
}

export default YearbookPreview;
