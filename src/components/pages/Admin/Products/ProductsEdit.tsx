import { useParams } from 'react-router-dom';
import Page from '@/components/ui/Page';
import DProductsForm from '@/components/admin/forms/DProductsForm';

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
