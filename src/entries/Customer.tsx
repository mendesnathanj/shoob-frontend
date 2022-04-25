import Button from '../components/ui/Button';
import Form from '../components/ui/Form';
import Input from '../components/ui/Form/Inputs/Input';
import Page from '../components/ui/Page';

export default function Customer() {
  return (
    <Page>
      <Form
        onSubmit={(values) => console.log(values)}
        defaultValues={{
          options: [
            { name: 'Option A', imageTypes: [{ name: 'Image Type 1' }] },
            { imageTypes: [{ name: 'Image Type 2', printTemplate: 1 }] },
          ],
          packageName: 'Package 1',
        }}
      >
        <Input name="packageName" />
        <Form.FieldArray
          scope="options"
          newItemDefaults={{
            name: 'Option A'
          }}
        >
          <div>
            <Input name="name" />
          </div>
          <Form.FieldArray
            scope="imageTypes"
            newItemDefaults={{
              name: 'Image Type'
            }}
          >
            <div>
              <Input name="name" />
              <Input name="printTemplate" />
            </div>
          </Form.FieldArray>
        </Form.FieldArray>
        <Button submit>Submit</Button>
      </Form>
    </Page>
  );
}
