import * as yup from 'yup';

export const CATEGORIES = [
  { label: 'Initial Setup', value: 'initial_setup' },
  { label: 'Prep', value: 'prep' },
  { label: 'Shoot', value: 'shoot' },
  { label: 'Image Prep', value: 'image_prep' },
] as const;

export const DESTINATIONS = [
  { label: 'Printer', value: 'printer' },
  { label: 'School Portal', value: 'school_portal' },
] as const;

export const SCHEMA = yup.object({
  category: yup.string().label('Category').oneOf(CATEGORIES.map((category) => category.value)).required(),
  description: yup.string().label('Description').trim().required(),
  destination: yup.string().label('Destination').oneOf(DESTINATIONS.map((destination) => destination.value)).required(),
  djobTypeId: yup.number().label('Job type').required(),
  name: yup.string().label('Name').trim().required(),
  price: yup
    .number()
    .label('Price')
    .typeError('Price is a required field')
    .min(0, 'Price must be at least 0')
    .required(),
}).required();
