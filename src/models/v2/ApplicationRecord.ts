import { SpraypaintBase, Model } from 'spraypaint';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://shoobphoto.com' : 'http://localhost:3000';

@Model()
class ApplicationRecord extends SpraypaintBase {
  static apiNamespace = '/api/v2';
  static baseUrl = BASE_URL;
  static clientApplication = 'shoob-frontend';
}

ApplicationRecord.credentials = 'include';

export default ApplicationRecord;
