import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { School } from '@/models/v2';
import Input from '@/components/ui/Form/Inputs';

export default function SchoolInput() {
  const [page, setPage] = useState(1);
  const [schools, setSchools] = useState<{[key: string]: School[] }>({});

  useQuery(['schoolInput', page], () => (
    School
      .where({ salesStat: 'CUST' })
      .page(page)
      .select(['name', 'scode'])
      .order('name')
      .all()
      .then((res) => {
        if (res.data.length > 0) setPage((prev) => prev + 1);

        setSchools({ ...schools, [page]: res.data });
        return res.data;
      })
  ), { keepPreviousData: true });

  const options = useMemo(() => (
    Object.values(schools).flat().map((school) => ({
      label: `${school.name} (${school.scode})`,
      value: school.id }))
  ), [page]);

  return (
    <Input.Select
      async
      label="School"
      name="schoolId"
      options={options}
    />
  );
}
