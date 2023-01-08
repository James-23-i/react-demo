import React from 'react'
import { ResponseData, RequestForm } from './api/mock/mockData'
import { queryDataSource } from './api/mock/queryDataSource'
import BaseInput from './components/baseInput/Index'
import StoryBook from './components/storyBook'
import AiInfoSelect from './pages/aiInfoSelect'
import AiInfoSelect2 from './pages/aiInfoSelect2'
import EditForm from './pages/editForm'
import { model } from './setting/model'

const App: React.FC = () => {
  return (
    <>
      <BaseInput<RequestForm, ResponseData>
        tableRowKey="numberId"
        isMultiple={true}
        title="弹窗"
        queryDataSource={queryDataSource}
        onSelectedChange={(data) => {
          console.log(data)
        }}
        model={model}
      ></BaseInput>

      <StoryBook></StoryBook>

      <AiInfoSelect></AiInfoSelect>

      <AiInfoSelect2></AiInfoSelect2>

      <EditForm></EditForm>
    </>
  )
}

export default App
