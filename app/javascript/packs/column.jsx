import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled.div`
  margin: 8px; 
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  background-color: ${props => (props.isDragging ? '#e7dff6' : '#f9f6ff' )}
  display: flex;
  flex-direction: column;
  `
  const Title = styled.h3`
  text-align: center 
  padding: 8px;
  height: 80px;
  border-bottom: 1px solid lightgrey; 
  flex
`
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  `

export default class Column extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container {...provided.draggableProps}
                                ref={provided.innerRef}
                                isDragging={snapshot.isDragging}>
                        <Title {...provided.dragHandleProps} >
                            {this.props.column.name}
                        </Title>
                        <Droppable droppableId={this.props.column.id} type="task">
                            {provided => (
                            <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            >
                            {this.props.task.map((tasks, index) => <Task key={tasks.id} task={tasks} index={index}/>)}
                            {provided.placeholder}
                            </TaskList>
                        )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}