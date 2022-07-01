import currency from 'currency.js';
import { useQuery } from 'react-query';
import qs from 'query-string';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { DProduct } from '../../../../models/v2';
import { capitalize, formattedDate } from '../../../../utils/functions';
import { CATEGORIES } from '../../../admin/forms/DProductsForm/utils';
import routes from '../../../routes';
import Button from '../../../ui/Button';
import DropdownButton from '../../../ui/DropdownButton';
import Form from '../../../ui/Form';
import Input from '../../../ui/Form/Inputs';
import Link from '../../../ui/Link';
import Page from '../../../ui/Page';

export default function ProductsHome() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { error, data } = useQuery(['productsData', searchParams.get('category')], () => (
    DProduct
      .includes('djobType')
      .order({ createdAt: 'desc' })
      .where({ category: searchParams.get('category') })
      .all()
      .then((res) => res.data)
  ));

  const onSubmit = (formData: { category: string }) => {
    navigate({
      pathname: routes.admin.products.home(),
      search: qs.stringify(formData, { skipEmptyString: true }),
    });
  };

  return (
    <Page hasError={error as boolean}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-display font-medium text-gray-700">Products</h1>
        <div className="flex items-center gap-12">
          <Form
            autoSave
            defaultValues={{ category: searchParams.get('category') || '' }}
            onSubmit={onSubmit as () => any}
          >
            <Input.Select
              reactSelectProps={{
                styles: {
                  control: (provided: object) => ({ ...provided, height: 44, minWidth: '200px', }),
                }
              }}
              label="Category Filter"
              name="category"
              options={[{ label: 'Select Category', value: '' }, ...CATEGORIES]}
              showLabel={false}
            />
          </Form>
          <Link to={routes.admin.products.new()}>
            <Button variant="primary">
              Add New
            </Button>
          </Link>
        </div>
      </div>
      <table className="min-w-full rounded border overflow-hidden">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Description</th>
            <th className="border border-gray-200 p-2">Price</th>
            <th className="border border-gray-200 p-2">Category</th>
            <th className="border border-gray-200 p-2">Job Type</th>
            <th className="border border-gray-200 p-2">Destination</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="border border-gray-200 p-2" />
          </tr>
        </thead>
        <tbody>
          {data?.map(({ id, djobType, name, description, price, category, destination }) => (
            <tr key={id}>
              <td className="text-center p-2 border">
                {name}
              </td>
              <td className="text-center p-2 border">
                {description}
              </td>
              <td className="text-center p-2 border">
                {price ? currency(price).format() : ''}
              </td>
              <td className="text-center p-2 border">
                {category.split('_').map((substring) => capitalize(substring)).join(' ')}
              </td>
              <td className="text-center p-2 border">
                {djobType.jobType}
              </td>
              <td className="text-center p-2 border">
                {destination.split('_').map((substring) => capitalize(substring)).join(' ')}
              </td>
              <td className="text-center p-2 border">
                <DropdownButton label="Actions">
                  <DropdownButton.Link to={routes.admin.products.edit(id)}>
                    Edit
                  </DropdownButton.Link>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
