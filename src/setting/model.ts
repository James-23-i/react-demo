export type TModel = {
  type?: 'Input' | 'Select'
  field: string
  label: string
  isFormItem?: boolean // true代表只有表单才有，false代表只有表格才有，undefined代表都有的配置
  placeholder?: string // 统一扩展为 options 配置项
  selectOptions?: { value: string | number; label: string }[]
}

export const model: TModel[] = [
  { field: 'id', label: 'ID', isFormItem: false },
  { type: 'Input', field: 'class', label: '班级', placeholder: '请输入班级' },
  { type: 'Input', field: 'name', label: '姓名', placeholder: '请输入姓名' },
  {
    type: 'Select',
    field: 'age',
    label: '性别',
    placeholder: '请选择性别',
    selectOptions: [
      { value: 'male', label: '男' },
      { value: 'female', label: '女' },
      { value: 'other', label: '不详' },
    ],
  },
  {
    type: 'Select',
    field: 'authorization',
    label: '权限等级',
    placeholder: '请选择权限等级',
    selectOptions: [
      { value: '1', label: '高级' },
      { value: '5', label: '中级' },
      { value: '10', label: '低级' },
    ],
  },
]
