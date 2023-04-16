import React, { useState } from 'react'
import { Modal } from 'antd'
import { TPaginationInfo } from '../../../api/mock/queryDataSource'
import QkTable from './QkTable'
import SearchForm from './SearchForm'
import { TConfig } from '../../../setting/config'
import useTableData from '../../hooks/useTableData'

type TQkModal<RequestForm, ResponseData> = {
  title: string
  isVisible: boolean
  config: TConfig
  tableRowKey: string
  onCancel: () => void
  queryDataSource: (
    params: RequestForm
  ) => Promise<{ dataSource: ResponseData[]; paginationInfo: TPaginationInfo }>
} & (
  | { isMultiple: true; onSelectedChange: (data: ResponseData[]) => void }
  | { isMultiple: false; onSelectedChange: (data: ResponseData) => void }
)

const QkModal = <RequestForm, ResponseData extends Record<string, unknown>>({
  title,
  isVisible,
  config,
  tableRowKey,
  onCancel,
  isMultiple,
  onSelectedChange,
  queryDataSource,
}: TQkModal<RequestForm, ResponseData>) => {
  const {
    queryDataState: { dataSource, loading, pageInfo },
    queryTableData,
    onPaginationChange,
  } = useTableData<RequestForm, ResponseData>({ queryDataSource })

  // 存储 table 组件选中的数据 统一保存为数组
  // onOk 确定的时候区分是否多选将数据继续暴露到上一层组件
  const [selectedRows, setSelectedRows] = useState<ResponseData[]>([])

  return (
    <Modal
      title={title}
      width={1024}
      centered
      visible={isVisible}
      onCancel={onCancel}
      onOk={() => {
        if (isMultiple) {
          onSelectedChange(selectedRows)
        } else {
          onSelectedChange(selectedRows[0])
        }
      }}
    >
      <SearchForm<RequestForm>
        config={config}
        queryDataSource={queryTableData}
      ></SearchForm>
      {isMultiple ? (
        <QkTable<ResponseData>
          tableRowKey={tableRowKey}
          config={config}
          loading={loading}
          pageInfo={pageInfo}
          onPaginationChange={onPaginationChange}
          dataSource={dataSource}
          isMultiple={true}
          onSelectedChange={(data) => setSelectedRows(data)}
        />
      ) : (
        <QkTable<ResponseData>
          tableRowKey={tableRowKey}
          config={config}
          loading={loading}
          pageInfo={pageInfo}
          onPaginationChange={onPaginationChange}
          dataSource={dataSource}
          isMultiple={false}
          onSelectedChange={(data) => setSelectedRows([data])}
        />
      )}
    </Modal>
  )
}

export default QkModal
