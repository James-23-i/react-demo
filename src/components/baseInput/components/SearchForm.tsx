import { Button, Col, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { EFormType, TConfig } from '../../../setting/config'
import { FormItemProps } from 'antd/es/form'

type TSearchForm<RequestForm> = {
  queryDataSource: (formValues: RequestForm) => void
  config: TConfig
}

const EXPAND_LENGTH = 5

const getFormItemWithCol =
  (props: FormItemProps, col?: number) => (children: FormItemProps) => {
    return (
      <Col span={col}>
        <Form.Item {...props} {...children}></Form.Item>
      </Col>
    )
  }

const SearchForm = <RequestForm,>({
  queryDataSource,
  config,
}: TSearchForm<RequestForm>) => {
  const [form] = Form.useForm()

  const [isExpand, setIsExpand] = useState<Boolean>(false)

  const getForm = () => {
    return config.form.map(({ type, formItem, children, col }) => {
      return (
        <>
          {type === EFormType.INPUT &&
            getFormItemWithCol(
              formItem,
              col
            )({
              children: <Input {...children} />,
            })}
          {type === EFormType.SELECT &&
            getFormItemWithCol(
              formItem,
              col
            )({
              children: <Select {...children} />,
            })}
        </>
      )
    })
  }

  const renderForm = () => {
    if (!Array.isArray(getForm())) {
      return
    }
    if (getForm().length > 5) {
      return (
        <>
          {getForm().slice(0, EXPAND_LENGTH)}
          {isExpand && getForm().slice(EXPAND_LENGTH)}
        </>
      )
    }
    return getForm()
  }

  return (
    <Form form={form} colon={false} labelAlign='left'>
      <Row gutter={24}>
        {renderForm()}
        <Col span={4}>
          <Form.Item label=" ">
            <Button
              type="primary"
              onClick={() => queryDataSource(form.getFieldsValue())}
            >
              查询
            </Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Form.Item>
        </Col>
        {config.form.length > 5 && (
          <Col span={4}>
            <Form.Item>
              <div onClick={() => setIsExpand((isExpand) => !isExpand)}>
                {isExpand ? (
                  <div>
                    <UpOutlined />
                    收起
                  </div>
                ) : (
                  <div>
                    <DownOutlined />
                    展开
                  </div>
                )}
              </div>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  )
}

export default SearchForm
