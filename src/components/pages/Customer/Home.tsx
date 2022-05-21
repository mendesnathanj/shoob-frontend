import routes from '../../routes';
import Calendar from '../../ui/Calendar';
import Form from '../../ui/Form';
import DateInput from '../../ui/Form/Inputs/DateInput';
import Page from '../../ui/Page';

export default function Home() {
  return (
    <Page>
      <h1>Customer Page</h1>
      <a href={routes.admin.home()}>Admin page</a>
      <Form onSubmit={(e) => console.log(e)}>
        <DateInput />
      </Form>
    </Page>
  );
}
