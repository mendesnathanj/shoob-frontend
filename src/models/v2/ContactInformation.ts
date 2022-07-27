import { Attr, Model } from 'spraypaint';
import ApplicationRecord from './ApplicationRecord';

@Model()
class ContactInformation extends ApplicationRecord {
  static jsonapiType = 'contact_informations';
  @Attr() email: string;
  @Attr() name: string;
  @Attr() phoneNumber: string;
  @Attr() role: string;
}

export default ContactInformation;
