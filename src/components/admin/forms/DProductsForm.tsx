import { useQuery } from 'react-query';
import { DProduct } from '../../../models/v2';
import { ONE_DAY } from '../../../utils/constants';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Form/Inputs';

const CATEGORIES = [
  { label: 'Initial Setup', value: 'initial_setup' },
  { label: 'Prep', value: 'prep' },
  { label: 'Shoot', value: 'shoot' },
  { label: 'Image Prep', value: 'image_prep' },
];

const DESTINATIONS = [
  { label: 'Printer', value: 'printer' },
  { label: 'School Portal', value: 'school_portal' },
];

type DProductsFormProps = {
  id?: string | number;
};

export default function DProductsForm({ id }: DProductsFormProps) {
  const { data } = useQuery(`dProductForForm-${id || 'new'}`, () => {
    if (!id) return new DProduct();

    return DProduct.find(id).then((res) => res.data);
  }, { cacheTime: 0, enabled: !!id, staleTime: ONE_DAY });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  const dProduct = data || new DProduct();

  const {
    category,
    description,
    destination,
    jobDate,
    jobId,
    jobType,
    name,
    price,
    shipDate,
    shippedBy,
    shippedVia,
  } = dProduct;

  return (
    <Form
      className="flex flex-col gap-12"
      defaultValues={{
        category,
        description,
        destination,
        jobDate,
        jobId,
        jobType,
        name,
        price,
        shipDate,
        shippedBy,
        shippedVia,
      }}
      onSubmit={onSubmit}
    >
      <Form.Section
        contentClass="grid grid-cols-2 gap-3"
        collapsible
        title="Job Information"
      >
        <Input label="Job ID" name="jobId" type="number" />
        <Input label="Job Type" name="jobType" />
        <Input.Date label="Job Date" name="jobDate" />
      </Form.Section>
      <Form.Section
        collapsible
        contentClass="grid grid-cols-2 gap-3"
        title="Product Information"
      >
        <Input label="Name" name="name" />
        <Input.Textarea label="Description" name="description" />
        <Input label="Price" name="price" step="0.01" min="0.01" type="number" />
        <Input.Select
          label="Category"
          name="category"
          options={CATEGORIES}
        />
        <Input.Select
          label="Destination"
          name="destination"
          options={DESTINATIONS}
        />
      </Form.Section>
      <Form.Section
        collapsible
        contentClass="grid grid-cols-2 gap-3"
        title="Shipping Information"
      >
        <Input.Date label="Shipped By" name="shippedBy" />
        <Input.Date label="Ship Date" name="shipDate" />
        <Input label="Shipped Via" name="shippedVia" />
      </Form.Section>
      <div className="flex justify-end">
        <Button fullWidth={{ sm: true }} submit variant="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
}
