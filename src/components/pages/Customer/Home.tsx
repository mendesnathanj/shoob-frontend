import routes from '../../routes';
import Page from '../../ui/Page';

export default function Home() {
  return (
    <Page>
      <h1>Customer Page</h1>
      <a href={routes.admin.home()}>Admin page</a>
    </Page>
  );
}
