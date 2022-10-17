import { useState } from 'react';
import { useQuery } from 'react-query';
import { School } from '@/models/v2';
import Select from './Select';

function useSchoolsForInput() {
  const [data, setData] = useState<{[key: number]: School[]}>({});
  const [page, setPage] = useState(1);

  const query = useQuery(['schoolsForInput', page], () => (
    School
      .select(['id', 'name'])
      .per(1000)
      .page(page)
      .where({ salesStat: 'CUST' })
      .order('name')
      .all()
      .then((res) => {
        if (res.data.length === 0) return;

        setData((prev) => ({ ...prev, [page]: res.data }));
        setPage((prev) => prev + 1);
      })
  ));

  return { ...query, data: Object.values(data).flat() };
}

export default function SchoolInput() {
  const { data } = useSchoolsForInput();

  return (
    <Select
      label="Select School"
      name="schoolId"
      options={data?.map((datum) => ({ label: datum.name, value: datum.id }))}
    />
  );
}
