import React from 'react'
import ReactDOM from 'react-dom'
import Example from './example'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const DragAndDrop = ({ children, featured, setFieldValue, onDelete, images, changeImages }) => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Example images={images} featured={featured} setFieldValue={setFieldValue} changeImages={changeImages} onDelete={onDelete} />
      </DndProvider>
    </div>
  )
}

export default DragAndDrop;