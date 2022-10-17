import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import StatusCell from '@/components/admin/helpers/StatusCell';
import Tooltip from '@/components/ui/Tooltip';
import { Student } from '@/models/v2';

export function usePhotoSectionTableColumns() {
  return useMemo<ColumnDef<Student>[]>(() => ([
    {
      accessorKey: 'id',
      className: '!text-left pl-4',
      header: 'ID',
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
      cell: (row) => <StatusCell className="text-xl" status={row.getValue() as boolean} />,
      header: 'Has Selected Yearbook Pose',
    },
    {
      accessorKey: 'hasDefaultYearbookPose',
      cell: (row) => <StatusCell className="text-xl" status={row.getValue() as boolean} />,
      header: 'Has Default Yearbook Pose',
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
    }
  ]), []);
}
