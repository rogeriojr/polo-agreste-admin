import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

/**
 * Your Component
 */
export default function CardDnD() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        teste
      </DndProvider>
    </div>
  )
}