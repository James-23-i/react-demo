import CallUpModal from './callUpModal'

const openModal = async () => {
  const { getModal } = new CallUpModal({ id: '1', name: 'lyh' })
  await getModal()
}

export default openModal
