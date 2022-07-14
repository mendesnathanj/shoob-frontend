import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { DProduct } from '../../../../models/v2';
import DjobType from '../../../../models/v2/DjobType';
import { ONE_DAY } from '../../../../utils/constants';
import routes from '../../../routes';
import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import Input from '../../../ui/Form/Inputs';
import { CATEGORIES, DESTINATIONS, SCHEMA } from './utils';

type FormData = {
  category: string;
  description: string;
  destination: string;
  jobDate: string;
  djobId: number;
  djobTypeId: string;
  name: string;
  price: number;
  shipDate: string;
  shippedBy: string;
  shippedvia: string;
};

type DProductsFormProps = {
  id?: string | number;
};

export default function DProductsForm({ id }: DProductsFormProps) {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { data: dProduct } = useQuery(`dProductForForm-${id || 'new'}`, () => {
    if (!id) return new DProduct();

    return DProduct.find(id).then((res) => res.data.dup());
  }, { cacheTime: 0, enabled: !!id, staleTime: ONE_DAY });

  const { data: djobTypes } = useQuery('djobTypesForForm', () => (
    DjobType.per(100).order('jobType').all().then((res) => res.data)
  ));

  const onSubmit = async (formData: FormData) => {
    if (!dProduct) return;

    setErrors({});

    Object.assign(dProduct.attributes, SCHEMA.cast(formData));

    const success = await dProduct.save();

    if (success) {
      toast('Successfully saved.', { autoClose: 500, type: 'success' });
      setTimeout(() => navigate(routes.admin.products.home()), 1000);
    }
    else {
      toast('Error with form submission', { autoClose: 1500, type: 'error' });
      setErrors(dProduct.errors);
    }
  };

  if (!dProduct) return null;

  const {
    category,
    description,
    destination,
    djobTypeId,
    name,
    price,
  } = dProduct;

  return (
    <Form
      className="flex flex-col gap-12"
      defaultValues={{
        category,
        description,
        destination,
        djobTypeId,
        name,
        price,
      }}
      onSubmit={(onSubmit as () => any)}
      schema={SCHEMA}
      serverErrors={errors}
    >
      <Form.Section
        contentClass="grid grid-cols-2 gap-3"
        collapsible
        title="Job Information"
      >
        <Input.Select
          label="Job Type"
          name="djobTypeId"
          options={djobTypes?.map((djobType) => ({
            label: djobType.jobType, value: djobType.id
          }))}
        />
      </Form.Section>
      <Form.Section
        collapsible
        contentClass="grid grid-cols-2 gap-3"
        title="Product Information"
      >
        <Input label="Name" name="name" />
        <Input label="Price" name="price" step="0.01" min="0" type="number" />
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
        <Input.Textarea
          containerProps={{
            className: 'col-span-2',
          }}
          label="Description"
          name="description"
        />
      </Form.Section>
      <div className="flex justify-end">
        <Button fullWidth={{ sm: true }} submit variant="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
}
