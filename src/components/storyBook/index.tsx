import {
  Form,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
} from '@formily/antd'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Modal } from 'antd'
import React, { useState } from 'react'
import { schema } from './schema'
import MyTable from './table'

const MyModal: React.FC = () => {
  const [isVisibe, setIsVisible] = useState<boolean>()

  const onClickOK = () => {
    console.log('onClickOK')
  }

  const form = createForm({
    effects() {},
  })

  console.log(form.fields)

  const SchemaField = createSchemaField({
    components: {
      FormItem,
      Select,
      Input,
      FormLayout,
      FormGrid,
    },
    scope: {},
  })

  return (
    <>
      <Input
        onClick={() => setIsVisible(true)}
        value=""
        readOnly
        placeholder="请选择"
      ></Input>
      {isVisibe && (
        <Modal
          visible={isVisibe}
          title="蝼蚁ID"
          onCancel={() => setIsVisible(false)}
          onOk={onClickOK}
          width={1024}
        >
          <Form form={form}>
            <FormLayout colon={false} layout="horizontal">
              <FormGrid minColumns={3} maxColumns={3} columnGap={32}>
                <SchemaField schema={schema}></SchemaField>
              </FormGrid>
            </FormLayout>
          </Form>

          <MyTable
            form={form}
            config={schema.properties as Record<string, any>}
          ></MyTable>
        </Modal>
      )}
    </>
  )
}

export default MyModal
