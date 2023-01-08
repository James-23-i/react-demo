import React from 'react'
import { Button, Card, Form, Input, Select } from 'antd'

const cityOptions = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

const App: React.FC<{
  index: number
  remove: (number: number | number[]) => void
}> = ({ index, remove }) => {
  return (
    <Card
      title={`支付渠道${index + 1}`}
      extra={<Button onClick={() => remove(index)}>删除</Button>}
    >
      <Form.Item
        name={[index, 'first']}
        rules={[{ required: true, message: 'Missing first name' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name={[index, 'last']}
        rules={[{ required: true, message: 'Missing last name' }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        name={[index, 'city']}
        rules={[{ required: true, message: 'Missing city' }]}
      >
        <Select options={cityOptions} />
      </Form.Item>
    </Card>
  )
}

export default App
