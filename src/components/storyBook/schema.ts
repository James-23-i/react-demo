import { ISchema } from '@formily/react'

export const schema: ISchema = {
  type: 'object',
  properties: {
    isShow: {
      type: 'string',
      title: '是否展示',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      default: 1,
      enum: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
      'x-data': {
        hideInTable: true,
        hideInSearch: false,
      },
    },
    name: {
      type: 'string',
      title: '名字',
      'x-decorator': 'FormItem',
      'x-visible': '{{ Boolean($values.isShow) }}',
      'x-data': {
        hideInTable: false,
        hideInSearch: true,
      },
    },
    age: {
      type: 'string',
      title: '年龄',
      'x-decorator': 'FormItem',
      'x-visible': '{{ Boolean($values.isShow) }}',
      'x-data': {
        hideInTable: false,
        hideInSearch: true,
      },
    },
    height: {
      type: 'string',
      title: '身高',
      'x-decorator': 'FormItem',
      'x-visible': '{{ Boolean($values.isShow) }}',
      'x-data': {
        hideInTable: false,
        hideInSearch: true,
      },
    },
  },
}
