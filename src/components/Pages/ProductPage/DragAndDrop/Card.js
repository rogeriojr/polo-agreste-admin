import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { Grid, Fab, Icon } from '@material-ui/core'
import styled from 'styled-components';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const StyledGridImg = styled.img`
  && {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
  }
`;

const StyledFab = styled(Fab)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: #003B40;
    color: white;
    width: 32px;
    height: 32px;
    margin: 0 2px;
    min-height: 0;
    &:hover {
      background: #003B40;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
    &:active {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const StyledIcon = styled(Icon)`
  && {
    width: auto;
    height: auto;
    font-size: 22px;
    text-align: center;
  }
`;

const Card = ({ children, id, text, index, image, moveCard, featured, setFieldValue, onDelete, }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <Grid
      item
      ref={ref}
      xs={6}
      sm={3}
      key={image.id}
      style={{ position: 'relative' }}
    >
      <StyledFab
        onClick={() => {
          onDelete(image);
        }}
      >
        <StyledIcon>delete</StyledIcon>
      </StyledFab>
      <StyledFab style={{ right: 50 }}
        onClick={() => {
          setFieldValue('featured', image.id);
        }}

      >
        {(featured == image.id || image.featured == 1)
          ? <StyledIcon>star</StyledIcon>
          : <StyledIcon>star_border</StyledIcon>
        }
      </StyledFab>
      <StyledGridImg src={image.url} alt="" />
    </Grid>
  )
}
export default Card
