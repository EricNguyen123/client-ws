/* eslint-disable @typescript-eslint/no-explicit-any */
import { Options, OptionsActive } from '@/constant/menuAccount'
import React, { useEffect, useState } from 'react'
import AddCategories from './AddCategories'
import BaseButton from '@/components/float-button/BaseButton'
import actionsCategories from '@/constant/actions-categories'
import { Separator } from '@/components/ui/separator'
import ChangeParent from './ChangeParent'

export interface dataViewTree {
  id: string,
  name: string,
  sub: dataViewTree[],
  option?: React.ReactNode,
  optionActive?: React.ReactNode,
}

export interface ItemViewProps {
  id: string
  name: React.ReactNode
  sub: dataViewTree[]
  option?: React.ReactNode
  optionActive?: React.ReactNode
  isChild?: string
}

export const ItemView = ({ id, name, sub, option, optionActive, isChild }: ItemViewProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className={`w-full min-h-10 py-2 px-6 flex flex-row items-center justify-between space-x-2 rounded-md border 
                        ${open && sub && sub.length > 0 ? "border-[1px] border-rose-500" : ""}`}>
        <span className='text-base font-medium capitalize'>{name}</span>
        <div className='h-10 flex flex-row items-center justify-end space-x-2'>
          <AddCategories idParent={id} variant={'icon'}/>
          <BaseButton options={actionsCategories(id)}/>
          {isChild && <ChangeParent id={id}/>}
          {sub && sub.length > 0 && 
          <>
            <Separator orientation={"vertical"}/>
            <div 
              className={`w-9 h-9 cursor-pointer rounded-full hover:bg-rose-500 hover:text-white border flex items-center justify-center 
                            ${open ? "bg-rose-500 text-white hover:bg-rose-600" : ""}`} 
              onClick={handleClick}>
              {open ? optionActive ? optionActive : <OptionsActive/> : option ? option : <Options/>}
            </div>
          </>}
        </div>
      </div>
      {open && sub && sub.length > 0 && 
      <div className='w-full h-max shrink-0 border-l-[1px] border-rose-200 pl-3'>
        <ViewTree data={sub} isChild={id}/>
      </div>}
    </>
  )
}

export default function ViewTree({ data, isChild }: { data: dataViewTree[], isChild?: string }) {
  const [dataOut, setDataOut] = useState<dataViewTree[]>(data);

  useEffect(() => {
    setDataOut(data)
  }, [data])

  return (
    <div className='w-full flex flex-col items-start justify-center space-y-2'>
      {dataOut.map((i, index) => 
        <ItemView 
          key={index} 
          id={i.id} 
          name={i.name} 
          sub={i.sub} 
          option={i.option} 
          optionActive={i.optionActive}
          isChild={isChild}
        />)}
    </div>
  )
}
