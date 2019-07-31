import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import initaialData from './initaial-data';
import { DragDropContext, Droppable } from 'react-beautiful-dnd' 
import Column from './column'

const Container = styled.div`
  display: flex;
`

class App extends React.Component {
  state = initaialData
  
  // dataTaker = (data) =>{
  //   axios
  //    .get(
  //      "projects/1/users.json",
  //    {
  //        headers: {
  //          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
  //            .content
  //        }
  //      })
  //      .then(response => {
  //      data=== response.data.data
  //    });
  //  }
   
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result
    
    // console.log(result);

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index)
     {
      return
     }

     if(type === 'column'){
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
       console.log(newColumnOrder);
      // console.log(newState);
      this.setState(newState);
      return
     }
      
      const start = this.state.columns[source.droppableId];
      const finish = this.state.columns[destination.droppableId];

      if(start === finish){
          const newTaskIds = Array.from(start.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);

          const newColumn = {
            ...start,
            taskIds: newTaskIds,
          };

          const newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              [newColumn.id]: newColumn,
            },
          };
          // console.log(newColumn);
          // console.log(newState);
          this.setState(newState);
          return
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      this.setState(newState);
  };
   
render() {
  return (
    
    <DragDropContext onDragEnd={this.onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => ( 
          <Container {...provided.droppableProps}
                     ref={provided.innerRef}>
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} index={index} />;
        })}
        {provided.placeholder}
        </Container>
      )}
    </Droppable>
    </DragDropContext>
    );
  }
}
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("dnd-app"));
});
