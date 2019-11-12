import React, { useState, useCallback } from 'react'
import Card from './Card'
import update from 'immutability-helper'
import { Grid } from '@material-ui/core'
const style = {
  width: 400,
  display: 'flex',
  flexDirection: 'row',
}
const Container = ({ children, featured, setFieldValue, onDelete, images, changeImages }) => {
  {

    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = images[dragIndex]
        
        changeImages(
          update(images, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
          }),
        )
        
      },
      [images],
    )
    const renderCard = (card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          image={card}
          moveCard={moveCard}
          featured={featured} 
          setFieldValue={setFieldValue} 
          onDelete={onDelete}
        />
      )
    }
    return (
      <>
        <Grid container spacing={1} style={{ marginBottom: 10 }}>{images.map((card, i) => renderCard(card, i))}</Grid>
      </>
    )
  }
}
export default Container
