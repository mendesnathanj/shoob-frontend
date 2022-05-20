import Button from '../components/ui/Button';
import Form from '../components/ui/Form';
import Input from '../components/ui/Form/Inputs/Input';
import Page from '../components/ui/Page';

export default function Customer() {
  return (
    <Page>
      <Form
        className="grid grid-cols-12"
        onSubmit={(values) => console.log(values)}
        defaultValues={{
          options: [
            { imageTypes: [{ name: 'Image Type 1' }], name: 'Option A' },
          ],
          // packageName: 'Package 1',
        }}
      >
        <Form.Section className="col-span-12" collapsible title="Package Details">
          <Input
            label="Package Name"
            name="packageName"
            placeholder="My Package"
          />
        </Form.Section>
        <Form.NestedFields
          addText="Add Option"
          scope="options"
          newItemDefaults={{
            name: 'Option A'
          }}
        >
          <Input
            containerProps={{ className: 'col-span-12' }}
            label="Name"
            name="name"
          />
          <Form.NestedFields
            addText="Add Image Type"
            scope="imageTypes"
            newItemDefaults={{
              name: 'Image Type'
            }}
          >
            <Input label="Name" name="name" />
            <Input label="Print Template" name="printTemplate" />
            <Input label="Remove?" name="isMarkedForDestruction" type="checkbox" />
          </Form.NestedFields>
        </Form.NestedFields>
        <Button submit variant="primary">Submit</Button>
      </Form>
    </Page>
  );
}
