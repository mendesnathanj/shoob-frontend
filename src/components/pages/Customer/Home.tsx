import routes from '@/routes';
import Page from '@/components/ui/Page';

export default function Home() {
  return (
    <Page>
      <h1 className="mb-8">Customer Page</h1>
      <a href={routes.admin.home()}>Admin page</a>
    </Page>
  );
}
