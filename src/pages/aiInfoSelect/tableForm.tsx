import React, { useEffect, useImperativeHandle, useState } from 'react'
import {
  Button,
  Form,
  FormListFieldData,
  Input,
  message,
  Select,
} from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import FileImport from './fileImport'

const query = (prodId: string) => {
  console.log(prodId)
  return new Promise<{ label: string; value: string }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { label: '名称2', value: 'prod.18888888' },
        { label: '名称1', value: 'prod.10000000' },
      ])
    }, 1000)
  })
}

/**
 * 1、
 *  prodNameChange Select绑定label value都为中文 value 赋值 prodId
 *  change 赋值时 find 用value中文查找label 对应出 value id (getProdIdByValue)
 *  prodId中文转换为id
 *
 *
 * 2、
 *  setToal 展示总条数
 *  add：setTotal
 *  import：setTotal
 *  onRemove：setTotal
 */

const { Option } = Select

enum EState {
  ADD = 'add',
  FINISH = 'finish',
}

type AiInfoProps = {
  telNum: string
  prodName: string
  prodId: string
  state: EState
}
type TProps = {
  prodId: string
}

type TColumnsType = (aiData: AiInfoProps[]) => ColumnsType<FormListFieldData>
type aiDataRef = {
  getFieldsValue: () => Promise<AiInfoProps[]>
}

const App = React.forwardRef<aiDataRef, TProps>(({ prodId }, ref) => {
  const [form] = Form.useForm<{ aiData: AiInfoProps[] }>()
  const [total, setTotal] = useState<number>(0)
  const [options, setOptions] = useState<{ label: string; value: string }[]>()

  useEffect(() => {
    query(prodId).then((options) => setOptions(options))
  }, [prodId])

  useImperativeHandle(ref, () => {
    return {
      getFieldsValue: () => form.validateFields().then(({ aiData }) => aiData),
    }
  })

  const getColumns: TColumnsType = (aiData: AiInfoProps[]) => {
    return [
      {
        title: '号码',
        render: (_, record, index) => {
          return (
            <Form.Item
              rules={[{ required: true, message: '必填' }]}
              name={[record.name, 'telNum']}
              style={{ margin: 0 }}
            >
              {aiData[index].state === EState.ADD ? (
                <Input />
              ) : (
                <>{aiData[index].telNum}</>
              )}
            </Form.Item>
          )
        },
      },
      {
        title: '商品名称',
        width: 300,
        render: (_, record, index) => {
          return (
            <Form.Item
              rules={[{ required: true, message: '必填' }]}
              name={[record.name, 'prodName']}
              style={{ margin: 0 }}
            >
              {aiData[index].state === EState.ADD ? (
                <Select onChange={(value) => onProdNameChange(index, value)}>
                  {options?.map((item) => (
                    <Option key={item.value} value={item.label}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              ) : (
                <>{aiData[index].prodName}</>
              )}
            </Form.Item>
          )
        },
      },
      {
        title: '商品编码',
        render: (_, record, index) => {
          return (
            <Form.Item name={[record.name, 'prodId']} style={{ margin: 0 }}>
              {aiData[index].state === EState.ADD ? (
                <Input disabled />
              ) : (
                <>{aiData[index].prodId}</>
              )}
            </Form.Item>
          )
        },
      },
      {
        title: '操作',
        render: (_, _record, index) => {
          return (
            <Form.Item style={{ margin: 0 }}>
              {aiData[index].state === EState.ADD ? (
                <>
                  <Button type="link" onClick={() => onOk(index)}>
                    确定
                  </Button>
                  <Button type="link" onClick={() => onRemove(index)}>
                    取消
                  </Button>
                </>
              ) : (
                <Button onClick={() => onRemove(index)}>删除</Button>
              )}
            </Form.Item>
          )
        },
      },
    ]
  }

  /**
   *
   * 导入
   * 入参 返回 list[]
   * const newList = list.map((item) => ({ ...item, state: EState.FINISH }))
   * form.setFieldsValue({ aiData: [...form.getFieldsValue().aiData || [], ...newList] })
   * setTotal(form.getFieldsValue().aiData.length)
   */

  const onAdd = () => {
    const aiData = form.getFieldsValue().aiData || []
    if (aiData.some((item) => item.state === EState.ADD)) {
      message.info('请先保存当前数据')
      return
    }
    const given: AiInfoProps = {
      telNum: '',
      prodId: '',
      prodName: '',
      state: EState.ADD,
    }
    form.setFieldsValue({ aiData: [...aiData, given] })
    setTotal(form.getFieldsValue().aiData.length)
  }
  const onOk = (index: number) => {
    form.validateFields().then(({ aiData }) => {
      aiData[index].state = EState.FINISH
      form.setFieldsValue({ aiData })
    })
  }

  const onProdNameChange = (index: number, value: string) => {
    const newAiData = form.getFieldsValue().aiData
    // 这里的value为中文，需要转换
    newAiData[index].prodId =
      options?.find((item) => item.label === value)?.value ?? ''
    form.setFieldsValue({ aiData: newAiData })
  }

  const onRemove = (index: number) => {
    const newAiData = form.getFieldsValue().aiData
    newAiData.splice(index, 1)
    form.setFieldsValue({ aiData: newAiData })
    setTotal(newAiData.length)
  }

  return (
    <Form form={form}>
      <Form.List name="aiData">
        {(fields) => (
          <>
            <Button onClick={onAdd}>新增</Button>
            <FileImport
              callBack={(data) => {
                const reg = /\r\n/g
                const arr = data.split(reg)
                // 调接口检查数据是否正确，正确则导入成功到表格中
                // 不正确则根据后台返回提示xxx不正确
                const newGiven = arr.map((item) => {
                  const newArr = item.split('|')
                  return {
                    telNum: newArr[0],
                    prodId: newArr[1],
                    state: EState.FINISH,
                  }
                })
                form.setFieldsValue({
                  aiData: [...form.getFieldsValue().aiData || [], ...newGiven],
                })
                setTotal(form.getFieldsValue().aiData.length)
              }}
            />
            <Table<FormListFieldData>
              dataSource={fields}
              columns={getColumns(form.getFieldsValue().aiData)}
              pagination={
                total > 0
                  ? {
                      showSizeChanger: false,
                      showQuickJumper: true,
                      showTotal: () => `总共${total}条`,
                    }
                  : undefined
              }
            ></Table>
          </>
        )}
      </Form.List>
    </Form>
  )
})

export default App
