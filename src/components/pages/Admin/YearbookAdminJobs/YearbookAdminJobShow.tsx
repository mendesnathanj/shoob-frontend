import { useParams } from 'react-router';
import Page from '../../../ui/Page';
import { useYearbookAdminJob } from './utils';

export default function YearbookAdminJobShow() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useYearbookAdminJob(id as string);

  console.log(data);

  return (
    <Page isLoading={isLoading}>
      boop
    </Page>
  );
}
