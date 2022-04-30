import Button from '../components/ui/Button';
import Form from '../components/ui/Form';
import Input from '../components/ui/Form/Inputs/Input';
import Page from '../components/ui/Page';
import DropdownButton from '../components/ui/DropdownButton';

export default function Customer() {
  return (
    <Page>
      <Form
        onSubmit={(values) => console.log(values)}
        defaultValues={{
          options: [
            { imageTypes: [{ name: 'Image Type 1' }], name: 'Option A' },
            { imageTypes: [{ name: 'Image Type 2', printTemplate: 1 }] },
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
          <div>
            <Input label="Name" name="name" />
          </div>
          <Form.NestedFields
            addText="Add Image Type"
            scope="imageTypes"
            newItemDefaults={{
              name: 'Image Type'
            }}
          >
            <div>
              <Input label="Name" name="name" />
              <Input label="Print Template" name="printTemplate" />
              <Input label="Remove?" name="isMarkedForDestruction" type="checkbox" />
            </div>
          </Form.NestedFields>
        </Form.NestedFields>
        <Button submit variant="primary">Submit</Button>
      </Form>
      <DropdownButton label="Actions">
        <DropdownButton.Item onClick={() => console.log('bloop')}>
          Item 1
        </DropdownButton.Item>
        <DropdownButton.Link external to="/customer">
          Item 2
        </DropdownButton.Link>
      </DropdownButton>
    </Page>
  );
}
