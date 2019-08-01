import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled.div`
  margin: 8px; 
  border: 1px solid lightgrey;
  border-radius: 6px; 
  min-width: 120px;
  max-width: 320px;
  background-color: ${props => (props.isDragging ? '#e7dff6' : '#f9f6ff' )}
  display: flex;
  flex-direction: column;
  `
const Title = styled.h4`
  text-align: center; 
  word-break: break-all;
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
const Button = styled.div`
padding-bottom: 20px;
text-align: right; 
`

export default class Column extends React.Component {
    render() {
        return (
            <Draggable key={this.props.column.id} draggableId={this.props.column.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container {...provided.draggableProps}
                                ref={provided.innerRef}
                                isDragging={snapshot.isDragging}>
                     <Button></Button>
                     <Title {...provided.dragHandleProps} >
                        {this.props.column.name}
                      </Title> 
                        <Droppable key={this.props.column.id} droppableId={this.props.column.id} type="task">
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