import routes from '../../routes';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Form/Inputs';
import Page from '../../ui/Page';

export default function Home() {
  return (
    <Page>
      <h1 className="mb-8">Customer Page</h1>
      <a href={routes.admin.home()}>Admin page</a>
      <Form
        className="grid grid-cols-2"
        defaultValues={{
          favoriteAnimals: [],
        }}
        onSubmit={(e) => console.log(e)}
      >
        <div className="grid col-span-2">
          <Input.Checkboxes
            canSelectAll
            name="favoriteAnimals"
            options={[
              { label: 'Dog', value: 'Dog' },
              { label: 'Cat', value: 'Cat' },
            ]}
          />
          <Input.Radio label="Activate" name="active" value="true" />
          <Input.Radio label="Deactivate" name="active" value="false" />
        </div>

        <Button className="col-span-2" submit variant="primary">Submit</Button>
      </Form>
    </Page>
  );
}
