import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import initaialData from './initaial-data';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Column from './column'
import axios from "axios";

const Container = styled.div`
  display: flex;
`

class App extends React.Component {
  state = initaialData

  componentDidMount(){
    this.dataTaker()
  }

  dataTaker = () =>{
    axios
     .get(
       `/projects/${this.props.project.id}/users.json`,
     {
         headers: {
           "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
             .content
         }
       })
       .then(response => {
        let data = (response.data.data)
          const newData = {
            ...initaialData,
            column_order: data.columns_order,
            task: Object.fromEntries(data.task.map(task => [task.id, task])),
            columns: Object.fromEntries(data.columns.map(column => [column.id, column])),
          };
        this.setState(newData)
     });
   }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index)
     {
      return
     }

     if(type === 'column'){
      const newColumnOrder = Array.from(this.state.column_order);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        column_order: newColumnOrder,
      };
      axios
        .patch(
          `/projects/update_column/${this.props.project.id}`,
          { columns_order: newColumnOrder },
          {
            headers: {
              "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
                .content
            }
          }
        )

      this.setState(newState);
      return
     }

      const start = this.state.columns[source.droppableId];
      const finish = this.state.columns[destination.droppableId];

      if(start === finish){
          const newTaskIds = Array.from(start.tasks_order);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);

          const newColumn = {
            ...start,
            tasks_order: newTaskIds,
          };

          const newState = {
            ...this.state,

            columns: {
              ...this.state.columns,
              [newColumn.id]: newColumn,
            },
          };
          axios
            .patch(
              `/columns/update_task/${newColumn.id}`,
              { tasks_order: newColumn.tasks_order },
              {
                headers: {
                  "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
                    .content
                }
              }
            )
          this.setState(newState);
          return
      }

      const startTaskIds = Array.from(start.tasks_order);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        tasks_order: startTaskIds,
      };
      axios
        .patch(
          `/columns/update_task/${newStart.id}`,
          { tasks_order: newStart.tasks_order },
          {
            headers: {
              "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
                .content
            }
          }
        )
      const finishTaskIds = Array.from(finish.tasks_order);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        tasks_order: finishTaskIds,
      };
      axios
        .patch(
          `/columns/update_task/${newFinish.id}`,
          { tasks_order: newFinish.tasks_order },
          {
            headers: {
              "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
                .content
            }
          }
        )
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
      <Droppable droppableId="all-columns" direction="horizontal" type="column" >
        {provided => (
          <Container {...provided.droppableProps}
                     ref={provided.innerRef}>
          {this.state.column_order.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.tasks_order.map(taskId => this.state.task[taskId]);
            return <Column key={column.id} column={column} task={tasks} index={index} projectId={this.props.project}/>;
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
  const node = document.getElementById('dnd-app')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(<App project={data}/>, document.getElementById("dnd-app"));
});
