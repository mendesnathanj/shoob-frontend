import { useMemo } from 'react';
import currency from 'currency.js';
import { useQuery } from 'react-query';
import { ColumnDef } from '@tanstack/react-table';
import qs from 'query-string';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { DProduct } from '../../../../models/v2';
import { capitalize } from '../../../../utils/functions';
import { CATEGORIES } from '../../../admin/forms/DProductsForm/utils';
import routes from '../../../routes';
import Button from '../../../ui/Button';
import DropdownButton from '../../../ui/DropdownButton';
import Form from '../../../ui/Form';
import Input from '../../../ui/Form/Inputs';
import Link from '../../../ui/Link';
import Page from '../../../ui/Page';
import Table from '../../../ui/Table';

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

  const columns: ColumnDef<DProduct>[] = useMemo(() => ([
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'description', header: 'Description', },
    {
      accessorFn: (row) => currency(row.price).format(),
      accessorKey: 'price',
      header: 'Price',
    },
    {
      accessorFn: (row) => row.category.split('_').map((substring: string) => capitalize(substring)).join(' '),
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorFn: (row) => row.djobType.jobType,
      accessorKey: 'djobType',
      header: 'Job Type'
    },
    {
      accessorFn: (row) => row.destination.split('_').map((substring: string) => capitalize(substring)).join(' '),
      accessorKey: 'destination',
      header: 'Destination'
    },
    {
      cell: (props) => (
        <DropdownButton label="Actions">
          <DropdownButton.Link to={routes.admin.products.edit(props.row.original.id as string)}>
            Edit
          </DropdownButton.Link>
        </DropdownButton>
      ),
      header: '',
      id: 'actions',
    }
  ]), []);

  const memoizedData = useMemo(() => {
    console.log('re-memoizing...');
    return data;
  }, []);

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
      <Table
        columns={columns}
        data={memoizedData}
      />
    </Page>
  );
}
