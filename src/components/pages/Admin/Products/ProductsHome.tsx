import currency from 'currency.js';
import { useQuery } from 'react-query';
import { DProduct } from '../../../../models/v2';
import { clientFormattedDate } from '../../../../utils/functions';
import PageSpinner from '../../../common/PageSpinner';
import routes from '../../../routes';
import Button from '../../../ui/Button';
import DropdownButton from '../../../ui/DropdownButton';
import Link from '../../../ui/Link';
import Page from '../../../ui/Page';

export default function ProductsHome() {
  const { isLoading, error, data } = useQuery('productsData', () => (
    DProduct
      .order({ createdAt: 'desc' })
      .all()
      .then((res) => res.data)
  ));

  if (isLoading) return <PageSpinner />;
  if (error) return <p>Something has gone wrong.</p>;

  return (
    <Page>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-display font-medium text-gray-700">Products</h1>
        <Button variant="primary">
          <Link to={routes.admin.products.new()}>
            Add New
          </Link>
        </Button>
      </div>
      <table className="min-w-full rounded border overflow-hidden">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Job ID</th>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Description</th>
            <th className="border border-gray-200 p-2">Price</th>
            <th className="border border-gray-200 p-2">Category</th>
            <th className="border border-gray-200 p-2">Destination</th>
            <th className="border border-gray-200 p-2">Ship Date</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="border border-gray-200 p-2" />
          </tr>
        </thead>
        <tbody>
          {data?.map(({ id, jobId, name, description, price, category, destination, shipDate }) => (
            <tr key={id}>
              <td className="text-center p-2 border">
                {jobId}
              </td>
              <td className="text-center p-2 border">
                {name}
              </td>
              <td className="text-center p-2 border">
                {description}
              </td>
              <td className="text-center p-2 border">
                {currency(price).format()}
              </td>
              <td className="text-center p-2 border">
                {category}
              </td>
              <td className="text-center p-2 border">
                {destination}
              </td>
              <td className="text-center p-2 border">
                {clientFormattedDate(shipDate)}
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
