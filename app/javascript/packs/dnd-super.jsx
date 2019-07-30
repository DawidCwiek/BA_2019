import React from 'react'
import ReactDOM from 'react-dom'
import initaialData from './initaial-data';
import { DragDropContext } from 'react-beautiful-dnd' 
import Column from './column'

class App extends React.Component {
  state = initaialData;

  onDragEnd = result => {

  }

render() {
  return (
    <DragDropContext onDragEnd={this.onDragEnd}>
      {this.state.columnOrder.map(columnId => {
        const column = this.state.columns[columnId];
        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
    })}
    </DragDropContext>
    );
  }
}
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("dnd-app"));
});
