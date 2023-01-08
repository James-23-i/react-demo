import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import Info from '../../components/info'

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values)
  }

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Info key={key} index={name} remove={remove} />
            ))}
            <Form.Item>
              <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
