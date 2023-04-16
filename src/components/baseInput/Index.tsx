import React, { useState } from 'react'
import { Input } from 'antd'
import QkModal from './components/QkModal'
import { TPaginationInfo } from '../../api/mock/queryDataSource'
import { TConfig } from '../../setting/config'

type TBaseInput = {
  onInputClick: () => void
}

type TBaseInputWithModal<RequestForm, ResponseData> = {
  title: string
  tableRowKey: string
  config: TConfig
  queryDataSource: (
    formValues: RequestForm
  ) => Promise<{ dataSource: ResponseData[]; paginationInfo: TPaginationInfo }>
} & (
  | { isMultiple: true; onSelectedChange: (data: ResponseData[]) => void }
  | { isMultiple: false; onSelectedChange: (data: ResponseData) => void }
)

const BaseInput: React.FC<TBaseInput> = ({ onInputClick }) => {
  return <Input onClick={onInputClick}></Input>
}

const BaseInputWithModal = <
  RequestForm,
  ResponseData extends Record<string, unknown>
>({
  title,
  tableRowKey,
  config,
  queryDataSource,
  isMultiple,
  onSelectedChange,
}: TBaseInputWithModal<RequestForm, ResponseData>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <>
      <BaseInput onInputClick={() => setIsVisible(true)}></BaseInput>
      {isVisible &&
        (isMultiple ? (
          <QkModal<RequestForm, ResponseData>
            tableRowKey={tableRowKey}
            isMultiple={true}
            title={title}
            isVisible={isVisible}
            config={config}
            onCancel={() => setIsVisible(false)}
            queryDataSource={queryDataSource}
            onSelectedChange={(data) => onSelectedChange(data)}
          />
        ) : (
          <QkModal<RequestForm, ResponseData>
            tableRowKey={tableRowKey}
            isMultiple={false}
            title={title}
            isVisible={isVisible}
            config={config}
            onCancel={() => setIsVisible(false)}
            queryDataSource={queryDataSource}
            onSelectedChange={(data) => onSelectedChange(data)}
          />
        ))}
    </>
  )
}

export default BaseInputWithModal
