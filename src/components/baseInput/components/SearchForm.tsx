import { Button, Col, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { TModel } from '../../../setting/model'

const { Option } = Select

type TSearchForm<RequestForm> = {
  queryDataSource: (formValues: RequestForm) => void
  model: TModel[]
}

const SearchForm = <RequestForm,>({
  queryDataSource,
  model,
}: TSearchForm<RequestForm>) => {
  const [form] = Form.useForm()

  const [isExpand, setIsExpand] = useState<Boolean>(false)

  return (
    <Form form={form}>
      <Row gutter={24}>
        {model.length > 0 &&
          model
            .filter(({ isFormItem }) => isFormItem === undefined || isFormItem)
            .map(({ field, label, type, placeholder, selectOptions }) => {
              return (
                <>
                  {type === 'Input' && (
                    <Col span={8}>
                      <Form.Item name={field} label={label}>
                        <Input placeholder={placeholder} />
                      </Form.Item>
                    </Col>
                  )}
                  {type === 'Select' && (
                    <Col span={8}>
                      <Form.Item name={field} label={label}>
                        <Select placeholder={placeholder}>
                          {selectOptions &&
                            selectOptions.length > 0 &&
                            selectOptions.map(({ value, label }) => {
                              return <Option value={value}>{label}</Option>
                            })}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}
                </>
              )
            })}
        <Col
          span={5}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            type="primary"
            onClick={() => queryDataSource(form.getFieldsValue())}
          >
            查询
          </Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Col>
        <Col span={3}>
          <div onClick={() => setIsExpand((isExpand) => !isExpand)}>
            {isExpand ? (
              <div>
                <DownOutlined />
                展开
              </div>
            ) : (
              <div>
                <UpOutlined />
                收起
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
