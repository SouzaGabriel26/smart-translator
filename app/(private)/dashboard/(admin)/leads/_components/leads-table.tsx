'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { InformAboutPlan } from './inform-about-plan';

export type Lead = {
  email: string;
  createdAt: Date;
  updatedAt: Date;
  planId: string;
  name: string;
  price: number;
  translationsLimit: number;
  active: boolean;
};

const columns: ColumnDef<Lead>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'createdAt',
    header: 'Interested since',
    cell: ({ row }) => {
      const value = row.getValue('createdAt') as Date;
      const date = new Date(value).toLocaleDateString('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      return (
        <span className="text-muted-foreground">
          {date}
        </span>
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'Plan name',
  },
  {
    accessorKey: 'active',
    header: 'Plan Status',
    cell: ({ row }) => {
      const value = row.getValue('active');
      const label = value === true ? 'Active' : 'Inactive';

      return (
        <span className={cn('px-2 py-1 rounded-full border dark:border-muted', value ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500')}>
          {label}
        </span>
      )
    }
  },
  {
    id: "actions",
    header: ({ table }) => {
      const amountSelected = table.getSelectedRowModel().rows.length;

      const text = `Inform about plan (${amountSelected} leads)`;

      return (
        <div>
          <InformAboutPlan enabled={amountSelected > 1} customText={text} />
        </div>
      )
    },
    cell: () => <InformAboutPlan enabled />
  },
];

type LeadsTableProps = {
  data: Lead[];
};

export function LeadsTable({ data }: LeadsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className='flex-1 flex'>
      <Table className='relative flex-1'>
        <TableHeader className='sticky top-0 z-10 bg-background shadow-md'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className='overflow-y-auto'>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
