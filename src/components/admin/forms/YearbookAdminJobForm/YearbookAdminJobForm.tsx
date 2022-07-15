type YearbookAdminJobFormProps = {
  id?: string | number;
};

export default function YearbookAdminJobForm({ id }: YearbookAdminJobFormProps) {
  return (
    <div>
      {id ? 'Edit page' : 'New page'}
    </div>
  );
}
