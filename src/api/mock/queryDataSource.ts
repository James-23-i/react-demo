import { dataSource, RequestForm, ResponseData } from './mockData'

export type TPaginationInfo = Partial<{
  current: number
  pageSize: number
  total: number
}>

export const queryDataSource = (formValues: RequestForm) => {
  console.log(formValues)

  return new Promise<{
    dataSource: ResponseData[]
    paginationInfo: TPaginationInfo
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        dataSource,
        paginationInfo: {
          current: 1,
          pageSize: 10,
          total: 11,
        },
      })
    }, 1000)
  })
}
