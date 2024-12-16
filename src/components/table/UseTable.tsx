/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import BaseSearch from "@/components/search-form/BaseSearch"
import { useTranslations } from "next-intl"
import SelectColumns from "./SelectColumns"
import { columnsKey } from "@/constant/columns"
import React from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onChange?: (value: string) => void
  placeholder?: string
  moreFeatures?: React.ReactNode
}

export function UseTable<TData, TValue>({
  columns,
  data,
  onChange,
  placeholder,
  moreFeatures,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations('Tables');
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ [columnsKey.select]: false })
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleColumnVisibility = (key: VisibilityState) => {
    setColumnVisibility({ ...columnVisibility, ...key})
  }

  const handleRowSelection = (key?: VisibilityState, handleRowChoose?: (i?: any) => void) => {
    key && handleColumnVisibility(key)
    handleRowChoose && handleRowChoose(rowSelection)
    setRowSelection({})
  }

  return (
    <div className="w-full space-y-2">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between space-y-2 lg:space-y-0 lg:space-x-2">
        <BaseSearch placeholder={placeholder || t('filter')} onChange={onChange}/>
        <div className="flex items-center justify-between sm:justify-end space-x-2 w-full lg:w-max">
          {React.cloneElement(moreFeatures as React.ReactElement, {
                          handle: handleColumnVisibility,
                          result: handleRowSelection,
                        })}
          <SelectColumns table={table}/>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
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
                  {t('noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
