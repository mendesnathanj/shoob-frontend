import * as yup from 'yup';

export const CONFIRMATION_STATUSES = [
  { label: 'Null', value: undefined },
  { label: 'Tentative', value: 'tentative' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Declined', value: 'declined' },
];

export const BINDING_TYPES = [
  { label: 'Hard Cover', value: 'hard_cover' },
  { label: 'Soft Cover', value: 'soft_cover' },
  { label: 'Perfect Bound', value: 'perfect_bound' },
];

export const SCHEMA = yup.object({
  confirmationStatus: yup.string().oneOf(CONFIRMATION_STATUSES.map((status) => status.value)),
  customSetup: yup.bool().required(),
  numberOfPages: yup.number().positive().integer(),
  school: yup.object({
    enrollment: yup.number().positive(),
    lastDay: yup.date(),
  }),
  schoolId: yup.number().required(),
  yearbookContractDetails: yup.array(yup.object({
    bindingType: yup
      .string()
      .label('Binding type')
      .oneOf(BINDING_TYPES.map((bindingType) => bindingType.value))
      .required(),
    finalSalePrice: yup.number().label('Final Sale Price').positive().nullable(),
    presalePrice: yup.number().label('Presale Price').positive().nullable(),
    quantity: yup
      .number()
      .label('Quantity')
      .positive()
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : null)),
    schoolPrice: yup.number().label('Price for school').positive().nullable(),
    shipping: yup.number().label('Shipping').positive().nullable(),
  })),
}).required();
