import { useParams } from 'react-router-dom';
import DProductsForm from '../../../admin/forms/DProductsForm';
import Page from '../../../ui/Page';

type PageParams = {
  id: string;
};

export default function ProductsEdit() {
  const { id } = useParams<PageParams>();

  return (
    <Page>
      <DProductsForm id={id} />
    </Page>
  );
}
