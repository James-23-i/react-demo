import { Table } from 'antd'
import React, { useState } from 'react'
import { TPaginationInfo } from '../../../api/mock/queryDataSource'
import { TModel } from '../../../setting/model'
import { TPageInfo } from '../../hooks/useTableData'

type TQkTable<ResponseData> = {
  model: TModel[]
  dataSource: ResponseData[]
  loading: boolean
  tableRowKey: string
  pageInfo?: TPaginationInfo
  onPaginationChange: (pageInfo: TPageInfo) => void
} & (
  | { isMultiple: true; onSelectedChange: (data: ResponseData[]) => void }
  | { isMultiple: false; onSelectedChange: (data: ResponseData) => void }
)

const QkTable = <ResponseData extends Record<string, unknown>>({
  model,
  dataSource,
  loading,
  pageInfo,
  isMultiple,
  tableRowKey,
  onSelectedChange,
  onPaginationChange,
}: TQkTable<ResponseData>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const getColumns = () => {
    return model
      .filter(({ isFormItem }) => !isFormItem)
      .map(({ field, label }) => {
        return {
          title: label,
          key: field,
          dataIndex: field,
        }
      })
  }

  const columns = getColumns()

  return (
    <Table<ResponseData>
      rowKey={tableRowKey}
      loading={loading}
      rowSelection={{
        type: isMultiple ? 'checkbox' : 'radio',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRowKeys(selectedRowKeys)
          // 这里不能用三目运算符，用if else 才能走到上面定义的交叉类型定义分支
          if (isMultiple) {
            onSelectedChange(selectedRows)
          } else {
            onSelectedChange(selectedRows[0])
          }
        },
      }}
      pagination={{
        ...pageInfo,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `总共${total}条`,
        onChange: (page, pageSize) => {
          onPaginationChange({
            page,
            pageSize,
          })
        },
      }}
      columns={columns}
      dataSource={dataSource}
    />
  )
}

export default QkTable
