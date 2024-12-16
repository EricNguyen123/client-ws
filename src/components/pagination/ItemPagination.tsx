import React from 'react'
import { PaginationItem } from '../ui/pagination'
import { Button } from '../ui/button'

type ItemPaginationProps = {
  index: number;
  onClick: (i: number) => void;
  active?: boolean;
  children?: React.ReactNode;
}

export default function ItemPagination({ index, onClick, active = false, children }: ItemPaginationProps) {
  return (
    <PaginationItem>
        <Button
          variant={"ghost"} 
          onClick={() => { onClick(index) }}
          className={`${active ? "bg-accent text-accent-foreground" : ""}`}
        >{children ? children : index}</Button>
    </PaginationItem>
  )
}
