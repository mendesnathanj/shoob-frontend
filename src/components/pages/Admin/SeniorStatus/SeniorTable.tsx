import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Section from '@/components/common/Section';
import { useSeniorPageCount, useSeniorsWithYearbookPoses } from '@/hooks/seniors/useSeniorData';
import { useAuth } from '@/hooks/useAuth';
import { Pose, SeniorImage, Student, User } from '@/models/v2';
import Table from '@/components/ui/Table';
import { useTablePagination } from '@/components/ui/Table/tableHooks';
import Modal, { useModal } from '@/components/ui/Modal/Modal';

function StatusCell({ status }: { status: boolean }) {
  const icon = status ? faCircleCheck : faCircleXmark;
  const className = status ? 'text-green-500' : 'text-red-500';

  return <FontAwesomeIcon className={className} icon={icon} />;
}

function usePhotoSectionTableColumns() {
  return useMemo<ColumnDef<Student>[]>(() => ([
    {
      accessorFn: (row) => row.yearbookImage(),
      accessorKey: 'view',
      cell: (row) => {
        const modal = useModal();
        const value = row.getValue() as Pose | SeniorImage | undefined;

        return (
          <>
            <button
              type="button"
              onClick={() => {
                modal.toggleModal();
              }}
            >
              View
            </button>
            <Modal {...modal}>
              {value ? (
                <img src={value.imageUrl as string} alt="Student Yearbook Pose" />
              ) : (
                <div>boop</div>
              )}
            </Modal>
          </>
        );
      },
      header: '',
    },
    {
      accessorKey: 'id',
      className: '!text-left pl-4',
      header: 'School ID',
      headerProps: { className: 'text-left pl-4' },
    },
    {
      accessorKey: 'schoolId',
      className: '!text-left pl-4',
      header: 'School ID',
      headerProps: { className: 'text-left pl-4' },
    },
    {
      accessorKey: 'studentId',
      className: '!text-left pl-4',
      header: 'Student ID',
      headerProps: { className: 'text-left pl-4' },
    },
    {
      accessorFn: (row) => row.fullName(),
      accessorKey: 'fullName',
      className: '!text-left pl-4',
      header: 'Name',
      headerProps: { className: 'text-left pl-4' },
    },
    {
      accessorKey: 'hasSelectedYearbookPose',
      cell: (row) => <StatusCell status={row.getValue() as boolean} />,
      header: 'Has Selected Yearbook Pose',
    },
    {
      accessorKey: 'hasDefaultYearbookPose',
      cell: (row) => <StatusCell status={row.getValue() as boolean} />,
      header: 'Has Default Yearbook Pose',
    }
  ]), []);
}

const pageSize = 25;

export default function SeniorTable() {
  const { user } = useAuth();
  const pageCount = useSeniorPageCount((user as User).schoolId, pageSize);
  const { pageIndex, setPage, tableOptions } = useTablePagination({ pageCount, pageSize });

  const { data: students = [] } =
    useSeniorsWithYearbookPoses((user as User).schoolId, pageIndex + 1, pageSize);
  const columns = usePhotoSectionTableColumns();

  return (
    <Section title="Photos">
      <div>
        <button onClick={() => setPage(Math.max(pageIndex - 1, 0))} type="button">Page - 1</button>
        <span className="px-6">{pageIndex}</span>
        <button onClick={() => setPage(pageIndex + 1)} type="button">Page + 1</button>
      </div>
      <div className="flex flex-wrap gap-y-4">
        <Table
          columns={columns}
          data={students}
          {...tableOptions}
        />
      </div>
    </Section>
  );
}
