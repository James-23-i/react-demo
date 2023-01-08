import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormItemProps, Input, Select, Space, Table } from 'antd'
import type { FormInstance } from 'antd/es/form'
import { ColumnsType } from 'antd/lib/table'

type AiInfoProps = {
  key: number
  aiLogoName: string
  aiName: string
  aiId: string
  aiType: string
}
// type EditableTableProps = Parameters<typeof Table>[0];
// type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
type EditableCellProps<T> = {
  title: string
  children: React.ReactNode
  dataIndex: keyof T
  record: T
  handleSave: (record: T) => void
  componentType?: string
  options?: { label: string; value: string }[]
}
type TColumnType = ColumnsType<AiInfoProps> & {
  componentType?: string
  options?: { label: string; value: string }[]
}

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]
const sights = [
  { label: 'jjj', value: 'jjj' },
  { label: 'aaa', value: 'aaa' },
]
// 创建表单上下文 提供给表格数据绑定
const EditableContext = React.createContext<FormInstance<AiInfoProps> | null>(
  null
)

const EditableRow: React.FC = (props) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const getFormItem = (name: string) => (props: FormItemProps) => {
  return <Form.Item style={{ margin: 0 }} name={name} {...props}></Form.Item>
}

const EditableCell: React.FC<EditableCellProps<AiInfoProps>> = ({
  title,
  children,
  dataIndex,
  record,
  componentType,
  options,
  handleSave,
  ...restProps
}) => {
  const form = useContext(EditableContext)

  useEffect(() => {
    form?.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }, [dataIndex, record])

  const onSave = () => {
    try {
      handleSave({ ...record, ...form?.getFieldsValue() })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  const renderFormItem = () => {
    if (componentType === 'Input') {
      return getFormItem(dataIndex)({ children: <Input onBlur={onSave} /> })
    }
    if (componentType === 'Select') {
      return getFormItem(dataIndex)({
        children: <Select options={options} onBlur={onSave} />,
      })
    }
    return <>{children}</>
  }

  return <td {...restProps}>{renderFormItem()}</td>
}

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<AiInfoProps[]>([
    {
      key: 1,
      aiName: 'Edward King',
      aiId: Math.random().toString(),
      aiLogoName: 'Beijing',
      aiType: 'fff',
    },
  ])

  const [count, setCount] = useState(2)

  const defaultColumns: TColumnType = [
    {
      title: 'key',
      dataIndex: 'key',
    },
    {
      title: 'aiName',
      dataIndex: 'aiName',
      componentType: 'Input',
    },
    {
      title: 'aiType',
      dataIndex: 'aiType',
      componentType: 'Select',
      options: sights,
    },
    {
      title: 'aiLogoName',
      dataIndex: 'aiLogoName',
      componentType: 'Select',
      options: areas,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length > 1 && (
          <Button onClick={() => handleDelete(record.aiId)}>Delete</Button>
        ),
    },
  ]

  const handleAdd = () => {
    const newData: AiInfoProps = {
      key: count,
      aiId: Math.random().toString(),
      aiLogoName: 'Beijing',
      aiType: 'fff',
      aiName: '',
    }
    setDataSource([...dataSource, newData])
    setCount(count + 1)
  }

  const handleDelete = (aiId: string) => {
    setCount(dataSource.length)
    const newData = dataSource
      .filter((item) => item.aiId !== aiId)
      .map((item, index) => ({ ...item, key: index + 1 }))
    setDataSource(newData)
  }

  const handleSave = (row: AiInfoProps) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    newData.splice(index, 1, row)
    setDataSource(newData)
  }

  const handleOk = () => {
    console.log(dataSource)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const columns = defaultColumns.map((col) => {
    return {
      ...col,
      onCell: (record: AiInfoProps) => ({
        ...col,
        record,
        handleSave,
      }),
    }
  })

  return (
    <>
      <Space>
        <Button onClick={handleAdd} type="primary">
          Add a row
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </Space>
      <Table
        components={components}
        bordered
        dataSource={dataSource}
        columns={columns as TColumnType}
        pagination={false}
      />
    </>
  )
}

export default App
