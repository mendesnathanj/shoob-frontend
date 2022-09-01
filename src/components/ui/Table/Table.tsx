import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';

export interface Cell {
  [key: string]: any;
}

export interface TableProps {
  columns: ColumnDef<any>[];
  data?: Cell[];
  tableOptions?: Omit<TableOptions<any>, 'getCoreRowModel' | 'columns' | 'data'>;
}

function Table({ columns, data = [], tableOptions = {} }: TableProps) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });

  return (
    <table className="min-w-full rounded border overflow-hidden">
      <thead>
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => {
              const headerProps = header.column.columnDef.headerProps || {};

              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  {...headerProps}
                  className={cn('border border-gray-200 p-2', headerProps.className)}
                >
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              )
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row: any) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell: any) => (
              <td
                className={cn('text-center p-2 border', cell.column.columnDef.className)}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot />
    </table>
  );
}

export default Table;
