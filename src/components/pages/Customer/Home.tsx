import routes from '../../routes';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Checkboxes from '../../ui/Form/Inputs/Checkboxes/Checkboxes';
import Page from '../../ui/Page';

export default function Home() {
  return (
    <Page>
      <h1 className="mb-8">Customer Page</h1>
      <a href={routes.admin.home()}>Admin page</a>
      <Form className="grid grid-cols-2" onSubmit={(e) => console.log(e)}>
        <div className="grid col-span-2">
          <Checkboxes
            canSelectAll
            name="favoriteAnimals"
            options={[
              { label: 'Dog', value: 'Dog' },
              { label: 'Cat', value: 'Cat' },
            ]}
          />
        </div>

        <Button className="col-span-2" submit variant="primary">Submit</Button>
      </Form>
    </Page>
  );
}
