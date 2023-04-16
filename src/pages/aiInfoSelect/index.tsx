import React, { useRef } from 'react'
import { Modal } from 'antd'
import TableForm from './tableForm'

type AiInfoProps = {
  telNum: string
  prodName: string
  prodId: string
  state: EState
}
enum EState {
  ADD = 'add',
  FINISH = 'finish',
}
type TProps = {
  visible: boolean
  onCancel: () => void
  onModalOk: (data: AiInfoProps[]) => void
}

type aiDataRef = {
  getFieldsValue: () => Promise<AiInfoProps[]>
}

const App: React.FC<TProps> = ({ visible, onCancel, onModalOk }) => {
  const tableFormRef = useRef<aiDataRef>(null)
  return (
    <>
      <Modal
        width={1024}
        title="减免列表"
        visible={visible}
        onCancel={onCancel}
        onOk={async () => {
          const list = await tableFormRef.current?.getFieldsValue()
          if (!list || list.length === 0) {
            return
          }
          onModalOk(list)
        }}
      >
        <TableForm ref={tableFormRef} prodId={'11111'}></TableForm>
      </Modal>
    </>
  )
}

export default App
