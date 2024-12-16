/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Sort, Status, StatusEnum } from "@/common/general"
import { Button } from "@/components/ui/button"
import { UserProps } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { symbols } from "."
import { Checkbox } from "@/components/ui/checkbox"
import BaseButton from "@/components/float-button/BaseButton"
import actionsUserTable from "./actions-user-table"

export const columnsKey = {
  select: "select",
  name: "name",
  email: "email",
  role: "role",
  phone: "phone",
  zipcode: "zipcode",
  prefecture: "prefecture",
  city: "city",
  street: "street",
  building: "building",
  status: "status",
  actions: "actions",
}

export const actionsKey = {
  copyId: "copyId",
}

export const columns: ColumnDef<UserProps>[] = [
  {
    id: columnsKey.select,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: columnsKey.name,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.name')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("name") ? row.getValue("name") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: columnsKey.email,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.email')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("email") ? row.getValue("email") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: columnsKey.role,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.role')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("role") ? row.getValue("role") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: columnsKey.phone,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.phone')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("phone") ? row.getValue("phone") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: columnsKey.status,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.status')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const s = row.getValue("status");
      const status = s as keyof typeof StatusEnum;
      const statusValue = StatusEnum[status];
      return (
      <div className="w-full flex items-center justify-center">
        <span 
          className={`w-max text-nowrap text-sm font-normal capitalize 
            ${Number(s) === Status.Active ? "text-emerald-500" : "text-red-500"}`}
          >{statusValue}</span>
      </div>
    )},
  },
  {
    accessorKey: columnsKey.prefecture,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.prefecture')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("prefecture") ? row.getValue("prefecture") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: columnsKey.city,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.city')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("city") ? row.getValue("city") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: columnsKey.street,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.street')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("street") ? row.getValue("street") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: columnsKey.building,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.building')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("building") ? row.getValue("building") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: columnsKey.zipcode,
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const t = useTranslations('Account');
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === Sort.ASC)}
        >
          {t('users.zipcode')}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <span className="w-max text-nowrap text-sm font-normal">
          {row.getValue("zipcode") ? row.getValue("zipcode") : symbols.inValid}
        </span>
      </div>
    ),
  },
  {
    id: columnsKey.actions,
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      const handle = (i: any) => {
        if (i === actionsKey.copyId) { return navigator.clipboard.writeText(user.id)}
      }
      return (
        <div className="w-max">
          <BaseButton 
            variant="horizontal" 
            handle={(i: any) => {handle(i)}}
            options={actionsUserTable(user.id)}
          />
        </div>
      )
    },
  }
]
