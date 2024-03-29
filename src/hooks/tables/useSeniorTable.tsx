import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import StatusCell from '@/components/admin/helpers/StatusCell';
import Tooltip from '@/components/ui/Tooltip';
import { Student } from '@/models/v2';
import { useModal, UseModal } from '@/hooks/useModal';
import Button from '@/components/ui/Button';
import StudentYearbookPoseForm from '@/components/admin/forms/StudentYearbookPoseForm';
import { PersistedSpraypaintRecord } from 'spraypaint';

type defaultColumnsArgs = Omit<UseModal, 'closeModal' | 'toggleModal' | 'isOpen' | 'content'>;
function defaultColumns({ openModal, setContent }: defaultColumnsArgs) {
  const DEFAULT_COLUMNS = [
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
      cell: (row) => <StatusCell className="text-xl" status={row.getValue() as boolean} />,
      header: 'Has Selected Pose',
    },
    {
      accessorKey: 'hasDefaultYearbookPose',
      cell: (row) => {
        if (row.getValue()) {
          return <StatusCell className="text-xl" status={row.getValue() as boolean} />;
        }

        return 'Not photographed';
      },
      header: 'Is Photographed',
    },
    {
      accessorKey: 'seniorYearbookPoseUrl',
      cell: (row) => {
        if (!row.getValue()) return '';

        return (
          <Tooltip
            label={(
              <img
                alt="Student Yearbook Pose"
                className="w-80 rounded mx-auto bg-slate-100 text-xs"
                src={row.getValue() as string}
              />
            )}
            openDelay={250}
            placement="left"
          >
            <img
              alt="Yearbook Pose"
              className="w-12 rounded mx-auto bg-slate-100 text-xs"
              src={row.getValue() as string}
            />
          </Tooltip>
        );
      },
      header: 'Yearbook Pose',
    },
    {
      cell: (props) => (
        <Button
          variant="primary"
          onClick={() => {
            setContent(<StudentYearbookPoseForm id={props.row.original.id} />);
            openModal();
          }}
        >
          Edit
        </Button>
      ),
      header: 'Actions',
    }
  ] as ColumnDef<PersistedSpraypaintRecord<Student>>[];

  return DEFAULT_COLUMNS;
}

export function usePhotoSectionTableColumns({ isAdmin = false }: { isAdmin?: boolean }) {
  const { openModal, setContent } = useModal();

  return useMemo<ColumnDef<Student>[]>(() => {
    if (!isAdmin) return defaultColumns({ openModal, setContent });

    return ([
      {
        accessorKey: 'id',
        className: '!text-left pl-4',
        header: 'ID',
        headerProps: { className: 'text-left pl-4' },
      },
      ...defaultColumns({ openModal, setContent }),
    ]);
  }, [isAdmin]);
}
