import * as yup from 'yup';

export const CONFIRMATION_STATUSES = [
  { label: 'Null', value: null },
  { label: 'Tentative', value: 'tentative' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Declined', value: 'declined' },
];

export const BINDING_TYPES = [
  { label: 'Hard Cover', value: 'hard_cover' },
  { label: 'Soft Cover', value: 'soft_cover' },
  { label: 'Perfect Bound', value: 'perfect_bound' },
];

export const YEARBOOK_CONTRACT_DETAIL_SCHEMA = yup.object({
  bindingType: yup
    .string()
    .label('Binding type')
    .oneOf(BINDING_TYPES.map((bindingType) => bindingType.value))
    .required(),
  finalSalePrice: yup.number().label('Final Sale Price').positive().nullable(),
  hardCopyProof: yup.bool().default(false).required(),
  numOfExtras: yup
    .number()
    .min(0)
    .nullable(true)
    .default(null)
    .transform((_, val) => (Number(val) || null)),
  presalePrice: yup.number().label('Presale Price').positive().nullable(),
  pricePerBook: yup.number().label('Price per book').positive().nullable(),
  shipping: yup.number().label('Shipping').positive().nullable(),
});

export const SCHEMA = yup.object({
  confirmationStatus: yup.string().oneOf(CONFIRMATION_STATUSES.map((status) => status.value)).nullable(true),
  coverApproval: yup
    .date()
    .label('Cover Approval')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  customSetup: yup.bool().required(),
  dateflyersposterssenttoprint: yup
    .date()
    .label('Flyers / Posters Sent Date')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  flowClassPictures: yup
    .date()
    .label('Flow Class Pictures')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  lastday: yup
    .date()
    .label('Last Day of School')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  notes: yup.string(),
  numberofpages: yup.number().positive().integer(),
  pixamisetupdate: yup
    .date()
    .label('Pixami Setup Date')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  presaleDeadline: yup
    .date()
    .label('Presale Deadline')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  salesdeadline: yup
    .date()
    .label('Final Sale Deadline')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  school: yup.object({
    enrollment: yup
      .number()
      .positive()
      .nullable(true)
      .transform((_, val) => (Number(val) || null)),
  }).notRequired(),
  schoolId: yup.number().required(),
  submittedFinalYearbook: yup
    .date()
    .label('Submitted YB for Proofing')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  submittedYearbookForProofing: yup
    .date()
    .label('Submitted Final YB')
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr)),
  yearbookContractDetails: yup.array(YEARBOOK_CONTRACT_DETAIL_SCHEMA),
  yearbookadvisor1email: yup.string().email(),
  yearbookadvisor1name: yup.string(),
  yearbookadvisor1phone: yup.string(),
  yearbookadvisor2email: yup.string().email(),
  yearbookadvisor2name: yup.string(),
  yearbookadvisor2phone: yup.string(),
}).required();
