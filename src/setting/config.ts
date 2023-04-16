import type { FormItemProps, InputProps, SelectProps } from 'antd'
import { ColumnsType } from 'antd/lib/table'

type TFormItemWithCol = {
  formItem: FormItemProps
  col?: number
}

type TInputType = {
  type: EFormType.INPUT
  children: InputProps
} & TFormItemWithCol

type TSelectType = {
  type: EFormType.SELECT
  formItem: FormItemProps
  children: SelectProps
} & TFormItemWithCol

export enum EFormType {
  INPUT = 'Input',
  SELECT = 'Select',
}

export type TConfig<T = any> = {
  form: (TInputType | TSelectType)[]
  columns: ColumnsType<T>
}
