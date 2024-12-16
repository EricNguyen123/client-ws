/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { columns } from "@/constant/columns"
import { UserProps } from "@/types"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchUsersPagination } from "@/store/user/actions"
import { useToast } from "@/hooks/use-toast"
import { ErrorNumber } from "@/common/general"
import { useTranslations } from "next-intl"
import { Check, PencilOff } from "lucide-react"
import { LIMIT, PAGE_INIT } from "@/constant"
import { calculateTotalPages, offset } from "@/utils"
import { BasePagination } from "@/components/pagination/BasePagination"
import { UseTable } from "@/components/table/UseTable"
import FeatureTable from "./FeatureTable"

export default function BaseTables() {
  const [data, setData] = useState<UserProps[]>([])
  const [currentPage, setCurrentPage] = useState<number>(PAGE_INIT);
  const [totalPages, setTotalPages] = useState<number>(0);
  const dispatch = useDispatch();
  const userSelector = useSelector(({ user } : any) => user);
  const { toast } = useToast()
  const t = useTranslations('Account');
  const tTable = useTranslations('Tables');
  const [keySearch, setKeySearch] = useState<string>("");
  
  const getUsers = (page: number, keyword?: string) => {
    const data = keyword && keyword.trim() !== "" ? {
      keyword: keyword,
      limit: LIMIT,
      offset: offset(page),
    } : {
      limit: LIMIT,
      offset: offset(page),
    }
    dispatch(searchUsersPagination({
      data: data,
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("users.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("users.error.description")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (!keyword && success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("users.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("users.success.description")}
            </div>,
          })
        }
      },
    }))
  }

  useEffect(() => {
    if (userSelector.pages.users) {
      setData(userSelector.pages.users)
      setCurrentPage(userSelector.pages.currentPage)
    }
    else {
      getUsers(currentPage)
    }
    setTotalPages(calculateTotalPages(userSelector.pages?.totalUsers, LIMIT))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelector.pages])
  
  const handleSearch = (value: string) => {
    setKeySearch(value)
    setCurrentPage(PAGE_INIT)
    getUsers(PAGE_INIT, value)
  }

  const handlePageChange = (page: number) => {
    if (keySearch.trim() !== "") {
      getUsers(page, keySearch)
    } else {
      getUsers(page)
    }
  }

  return (
    <div className="container mx-auto">
      <UseTable 
        columns={columns} 
        data={data} 
        onChange={handleSearch} 
        placeholder={tTable('users.filter')} 
        moreFeatures={<FeatureTable data={data}/>}
      />
      {totalPages > 1 && 
        <BasePagination pages={totalPages} chagneData={handlePageChange} currentPage={currentPage}/>}
    </div>
  )
}
