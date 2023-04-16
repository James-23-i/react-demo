import React from 'react'
import { TCallUpModalProps } from './callUpModal'

const Modal: React.FC<TCallUpModalProps> = ({ onOK, id, name, ...rest }) => {
  console.log(id, name)
  return <Modal {...rest} onOK={() => onOK?.('onOK')}></Modal>
}

export default Modal
