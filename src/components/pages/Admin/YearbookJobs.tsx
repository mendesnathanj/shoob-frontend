import routes from '../../routes';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Form/Inputs';
import Link from '../../ui/Link';
import Page from '../../ui/Page';

export default function YearbookJobs() {
  return (
    <Page>
      <Link to={routes.admin.root()}>Admin Page</Link>
      <Form
        className="grid grid-cols-12"
        onSubmit={(values) => console.log(values)}
      >
        <Form.Section
          className="col-span-12"
          collapsible
          contentInnerClassName="grid grid-cols-2 gap-x-8 gap-y-4"
          title="Contact Information"
        >
          <Input label="Scode:" name="scode" className="col-span-1" />
          <Input label="School name:" name="school_name" />
          <Input label="School name:" name="school_name" />
          <Input label="YB Advisor 1:" name="yearbook_advisor" />
          <Input label="YB Advisor 1 Email:" name="yearbook_advisor" />
        </Form.Section>
        <div className="pt-3">
          <Button submit variant="primary">Submit</Button>
        </div>
      </Form>
    </Page>
  );
}
