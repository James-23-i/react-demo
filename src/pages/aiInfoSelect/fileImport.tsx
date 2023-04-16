import { Button } from 'antd'
import React, { ChangeEvent, useRef } from 'react'

type TFileImportProps = {
  callBack: (data: string) => void
}

const FileImport: React.FC<TFileImportProps> = ({ callBack }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const onImport = () => {
    inputRef.current?.click()
  }

  const onImportChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()
    reader.readAsText(new Blob([file!]))
    reader.onload = function () {
      callBack(reader.result as string)
    }
    event.target.value = ''
  }

  return (
    <>
      <Button onClick={onImport}>导入</Button>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        accept=".txt"
        onChange={onImportChange}
      />
    </>
  )
}

export default FileImport
