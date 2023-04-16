import React from 'react'
import { ResponseData, RequestForm } from './api/mock/mockData'
import { queryDataSource } from './api/mock/queryDataSource'
import BaseInput from './components/baseInput/Index'
import { ColorContextValue } from './context'
import './index.css'
import { ButtonGroup } from './components/buttonGroup'
import { AButton } from './components/buttonGroup/fragment/aButton'
import { BackOrBottom } from './pages/backOrBottom'
import { EFormType, TConfig } from './setting/config'

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color } = ColorContextValue()

  const config: TConfig<ResponseData> = {
    form: [
      {
        type: EFormType.INPUT,
        formItem: { name: 'class', label: '班级', required: true },
        children: { placeholder: '请输入班级', disabled: true },
      },
      {
        type: EFormType.INPUT,
        formItem: { name: 'description', label: '座位' },
        children: { placeholder: '请输入座位' },
      },
      {
        type: EFormType.INPUT,
        formItem: { name: 'control', label: '把控' },
        children: { placeholder: '请输入把控' },
      },
      {
        type: EFormType.INPUT,
        formItem: { name: 'app', label: 'APP' },
        children: { placeholder: '请输入APP' },
      },
      {
        type: EFormType.INPUT,
        formItem: { name: 'name', label: '姓名' },
        children: { placeholder: '请输入姓名' },
      },
      {
        type: EFormType.SELECT,
        formItem: { name: 'age', label: '性别' },
        children: {
          placeholder: '请选择性别',
          options: [
            { value: 'male', label: '男' },
            { value: 'female', label: '女' },
            { value: 'other', label: '不详' },
          ],
        },
      },
      {
        type: EFormType.SELECT,
        formItem: { name: 'authorization', label: '权限等级' },
        children: {
          placeholder: '请选择权限等级',
          options: [
            { value: '1', label: '高级' },
            { value: '5', label: '中级' },
            { value: '10', label: '低级' },
          ],
        },
      },
    ],
    columns: [
      {
        title: '班级',
        dataIndex: 'class',
        key: 'class',
        render: (value) => <div style={{ color: 'red' }}>{value}</div>,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '权限等级',
        dataIndex: 'authorization',
        key: 'authorization',
      },
    ],
  }

  return (
    <>
      <BaseInput<RequestForm, ResponseData>
        tableRowKey="age"
        isMultiple={true}
        title="弹窗"
        queryDataSource={queryDataSource}
        onSelectedChange={(data) => {
          console.log(data)
        }}
        config={config}
      ></BaseInput>

      {/* <iframe
        title="1"
        src="http://127.0.0.1:3000/src/assets/1.pdf"
      ></iframe> */}

      <ButtonGroup>
        <AButton text="按钮1"></AButton>
        <AButton text="按钮2"></AButton>
        <AButton text="按钮3"></AButton>
        <AButton text="按钮4"></AButton>
        <AButton text="按钮5"></AButton>
      </ButtonGroup>

      <BackOrBottom offsetBottom={300}></BackOrBottom>
    </>
  )
}

export default App
