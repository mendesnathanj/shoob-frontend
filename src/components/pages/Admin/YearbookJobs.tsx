import { formatISO, parse } from 'date-fns';
import routes from '../../routes';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Form/Inputs';
import Link from '../../ui/Link';
import Page from '../../ui/Page';

export default function YearbookJobs() {
  // console.log(formatISO(parse('06-09-2022', 'MM-dd-yyyy', new Date())));
  return (
    <Page>
      <Link to={routes.admin.root()}>Admin Page</Link>
      <Form
        className="grid grid-cols-12 gap-y-5"
        defaultValues={{
          schoolId: 49,
        }}
        onSubmit={(values) => console.log(values)}
      >
        <Form.Section
          className="col-span-12"
          collapsible
          contentClass="grid grid-cols-2 gap-x-8 gap-y-4"
          title="Contact Information"
        >
          <Input.Textarea
            label="Fill in details"
            name="details"
            placeholder="Gabba goo"
          />
          <Input.Date
            label="Promise Date"
            name="promiseDate"
          />
          <Input.Select
            label="School"
            name="schoolId"
            options={[
              { label: 'Enochs', value: 49 },
              { label: 'Gregory', value: 42 },
            ]}
          />
          <Input label="Scode:" name="s_code" />
          <Input label="School name:" name="school_name" />
          <Input label="School name:" name="school_name" />
          <Input label="YB Advisor 1:" name="yearbook_advisor" />
          <Input label="YB Advisor 1 Email:" name="yearbook_advisor" />
        </Form.Section>
        <Form.Section
          className="col-span-12"
          collapsible
          contentClass="grid grid-cols-2 gap-x-8 gap-y-4"
          title="Yearbook Contract Details"
        >
          <Input.Select
            label="Binding Type"
            name="binding_type"
            options={[
              { label: 'Soft Cover', value: 'soft_cover' },
              { label: 'Hard Cover', value: 'hard_cover' },
              { label: 'Perfect Bound', value: 'Perfect Bound' },
            ]}
          />
          <Input label="Quantity" name="quantity" type="number" step={10} />
        </Form.Section>
        <div className="pt-3">
          <Button submit variant="primary">Submit</Button>
        </div>
      </Form>
    </Page>
  );
}
