import Button from '../components/ui/Button';
import Form from '../components/ui/Form';
import Input from '../components/ui/Form/Inputs/Input';
import Page from '../components/ui/Page';

export default function Customer() {
  return (
    <Page>
      <Form defaultValues={{ firstName: 'Nathan', lastName: 'Mendes' }} onSubmit={(values) => console.log(values)}>
        <div className="grid grid-cols-1 gap-8">
          <Input name="firstName" />
          <Input name="lastName" />
          <Input name="email" />
          <Button submit>Submit</Button>
        </div>
      </Form>
    </Page>
  );
}
