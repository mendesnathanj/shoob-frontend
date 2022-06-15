import routes from '../../../routes';
import Link from '../../../ui/Link';
import Page from '../../../ui/Page';

export default function ProductsHome() {
  return (
    <Page>
      Products page.
      <Link to={routes.admin.products.edit(1)}>Edit 1</Link>
      <Link to={routes.admin.products.new()}>New</Link>
    </Page>
  );
}
