import { useState } from 'react'
import { TPaginationInfo } from '../../api/mock/queryDataSource'

export type TPageInfo = Partial<{
  page: number
  pageSize: number
}>

type TQueryDataState<ResponseData> = {
  dataSource: ResponseData[]
  loading: boolean
  pageInfo?: TPaginationInfo
  error?: unknown
}

type TTableData<RequestForm, ResponseData> = {
  queryDataSource: (
    formValues: RequestForm
  ) => Promise<{ dataSource: ResponseData[]; paginationInfo: TPaginationInfo }>
}

const useTableData = <RequestForm, ResponseData>({
  queryDataSource,
}: TTableData<RequestForm, ResponseData>) => {
  const [queryDataState, setQueryDataState] = useState<
    TQueryDataState<ResponseData>
  >({
    dataSource: [],
    loading: false,
    pageInfo: undefined,
    error: undefined,
  })

  const [formValues, setFormValues] = useState<RequestForm>()

  const onPaginationChange = (pageInfo: TPageInfo) => {
    if (!formValues) {
      return
    }
    queryTableData(formValues, pageInfo)
  }

  const queryTableData = async (
    formValues: RequestForm,
    pageInfo?: TPageInfo
  ) => {
    try {
      setQueryDataState((state) => ({
        ...state,
        loading: true,
      }))
      const { dataSource, paginationInfo } = await queryDataSource(formValues)
      setFormValues(formValues)
      setQueryDataState((state) => ({
        ...state,
        dataSource,
        pageInfo: paginationInfo,
      }))
    } catch (error) {
      setQueryDataState((state) => ({ ...state, error }))
    } finally {
      setQueryDataState((state) => ({ ...state, loading: false }))
    }
  }

  return {
    queryDataState,
    queryTableData,
    onPaginationChange,
  }
}

export default useTableData
