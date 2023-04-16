import { ModalProps } from 'antd'
import React from 'react'
import { render } from 'react-dom'
import Modal from './modal'

type TModalProps = {
  onOK?: (data: string) => void
} & Omit<ModalProps, 'onOk'>

export type TCallUpModalProps = {
  id?: string
  name?: string
} & TModalProps

const container = document.createDocumentFragment()

export default class CallUpModal {
  visible = true
  callUpModalProps: TCallUpModalProps
  constructor(props: TCallUpModalProps) {
    this.callUpModalProps = props
    // this.getModal = this.getModal.bind(this)
    this.renderModal = this.renderModal.bind(this)
    // this.hideModal = this.hideModal.bind(this)
  }

  renderModal(onOK?: TModalProps['onOK']) {
    render(
      <>
        {this.visible && <Modal {...this.callUpModalProps} onOK={onOK}></Modal>}
      </>,
      container
    )
  }

  hideModal() {
    this.visible = false
    this.renderModal()
  }

  getModal() {
    return new Promise<string>((resolve) => {
      this.renderModal((data) => {
        this.hideModal()
        resolve(data)
      })
    })
  }
}
