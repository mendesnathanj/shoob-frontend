import Button from '../components/ui/Button';
import Form from '../components/ui/Form';
import Input from '../components/ui/Form/Inputs/Input';
import Page from '../components/ui/Page';
import DropdownButton from '../components/ui/DropdownButton';
import routes from '../components/routes';

export default function Customer() {
  return (
    <Page>
      <Form
        onSubmit={(values) => console.log(values)}
        defaultValues={{
          options: [
            { imageTypes: [{ name: 'Image Type 1' }], name: 'Option A' },
          ],
          packageName: 'Package 1',
        }}
      >
        <Input label="Package Name" name="packageName" />
        <Form.NestedFields
          addText="Add Option"
          scope="options"
          newItemDefaults={{
            name: 'Option A'
          }}
        >
          <Form.Section>
            <Input label="Name" name="name" />
          </Form.Section>
          <Form.NestedFields
            addText="Add Image Type"
            scope="imageTypes"
            newItemDefaults={{
              name: 'Image Type'
            }}
          >
            <Form.Section inline>
              <Input label="Name" name="name" />
              <Input label="Print Template" name="printTemplate" />
              <Input label="Remove?" name="isMarkedForDestruction" type="checkbox" />
            </Form.Section>
          </Form.NestedFields>
        </Form.NestedFields>
        <Button submit variant="primary">Submit</Button>
      </Form>
    </Page>
  );
}
