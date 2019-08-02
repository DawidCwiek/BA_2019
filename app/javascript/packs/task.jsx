import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    word-break: normal;
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? '#ae9dd2' : 'white' )}
`;
const E = styled.div`
    backbround-color: black;
    border: 1px solid lightgrey;
    padding-left: 50px;
`


export default class Task extends React.Component{
    render(){
        return (
            <Draggable key={this.props.task.id} draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => ( 
                     <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        onClick = {() => 
                        window.location.assign(`/manage_io/task/${this.props.task.id.replace('task-', '')}`)
                        }>
                     {this.props.task.title}
                     </Container>
                )}
            </Draggable>
        );
    }
}
