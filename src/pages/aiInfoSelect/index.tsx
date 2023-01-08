import React, { useState } from 'react'
import { Button, Form, FormListFieldData, Input, Modal, Select } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

const sights = [
  { label: 'jjj', value: 'fff' },
  { label: 'aaa', value: 'rrr' },
]

type AiInfoProps = {
  key: number
  aiLogoName: string
  aiName: string
  aiId: string
  aiType: string
}

type TColumnsType = (
  remove: (index: number | number[]) => void
) => ColumnsType<FormListFieldData>

const App: React.FC = () => {
  const [form] = Form.useForm<{ aiData: AiInfoProps[] }>()
  const [isModal, setIsModal] = useState<boolean>(false)

  const getColumns: TColumnsType = (remove) => {
    return [
      {
        title: '序号',
        render: (_, record) => {
          return <p>{record.name + 1}</p>
        },
      },
      {
        title: '算法商品',
        render: (_, record) => {
          return (
            <Form.Item name={[record.name, 'aiLogoName']}>
              <Input />
            </Form.Item>
          )
        },
      },
      {
        title: '算法名称',
        render: (_, record) => {
          return (
            <Form.Item name={[record.name, 'aiName']} initialValue="Beijing">
              <Select options={areas}></Select>
            </Form.Item>
          )
        },
      },
      {
        title: '算法类型',
        render: (_, record) => {
          return (
            <Form.Item name={[record.name, 'aiType']} initialValue="jjj">
              <Select options={sights}></Select>
            </Form.Item>
          )
        },
      },
      {
        title: '操作',
        render: (_, record) => {
          return <Button onClick={() => remove(record.name)}>删除</Button>
        },
      },
    ]
  }

  return (
    <>
      <Input onClick={() => setIsModal(true)}></Input>
      {isModal && (
        <Modal
          width={1024}
          title="ai算法"
          visible={isModal}
          onCancel={() => setIsModal(false)}
          onOk={() => {
            console.log(form.getFieldsValue().aiData)
          }}
        >
          <Form form={form}>
            <Form.List name="aiData">
              {(fields, { add, remove }) => (
                <>
                  <Button onClick={add}>新增</Button>
                  <Table<FormListFieldData>
                    dataSource={fields}
                    rowKey="key"
                    columns={getColumns(remove)}
                    pagination={false}
                  ></Table>
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default App
