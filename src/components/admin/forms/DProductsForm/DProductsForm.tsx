import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { DProduct } from '../../../../models/v2';
import { ONE_DAY } from '../../../../utils/constants';
import { formattedDate } from '../../../../utils/functions';
import routes from '../../../routes';
import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import Input from '../../../ui/Form/Inputs';
import { CATEGORIES, DESTINATIONS } from './utils';

type FormData = {
  category: string;
  description: string;
  destination: string;
  jobDate: string;
  jobId: number;
  jobType: string;
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
  const navigate = useNavigate();

  const { data } = useQuery(`dProductForForm-${id || 'new'}`, () => {
    if (!id) return new DProduct();

    return DProduct.find(id).then((res) => res.data.dup());
  }, { cacheTime: 0, enabled: !!id, staleTime: ONE_DAY });

  const onSubmit = async (formData: FormData) => {
    const formattedValues = {
      jobDate: formattedDate(formData.jobDate, 'server') || null,
      price: formData.price || null,
      shipDate: formattedDate(formData.shipDate, 'server') || null,
      shippedBy: formattedDate(formData.shippedBy, 'server') || null,
    };

    Object.assign(dProduct.attributes, formData, formattedValues);

    const success = await dProduct.save();

    if (success) {
      toast('Successfully saved.', { type: 'success' });
      navigate(routes.admin.products.home());
    }
    else {
      console.log(dProduct.errors);
    }
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
      onSubmit={(onSubmit as () => any)}
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
        <Input.Textarea
          containerProps={{
            className: 'col-span-2',
          }}
          label="Description"
          name="description"
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
