import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TasksArea } from "./dnd_tasks";
import { moveElement, findIndex } from "./collection_helper";

export const ColumnArea = ({name, moveColumn, columns }) => {
  const [, drop] = useDrop({
    accept: itemType,
    drop: (item, monitor) => {
      if(!monitor.didDrop()) {
        moveColumn(item.id, name);
      }
    }
  });

  const columnIds = columns.map(columsOrder => 
    columsOrder.id
    )
  console.log(columnIds); 
  return(
      <div className="row" ref={drop}>
        {columns.map(column => (
            <Column 
            key={column.id}
            id={column.id}
            name={column.name}
            moveColumn={moveColumn} />
          ))}
      </div>
  );
}

const Column = ({ id, name, moveColumn }) => {
  const ref = useRef();

  const [, drag] = useDrag({
    item: { id: id, name, type: itemType }
  });

  const [, drop] = useDrop({
    accept: itemType,
    drop: item => {
      moveColumn(item.id, name, id)
    }
  })

  drag(ref);
  drop(ref);

  const [tasks, updateTask] = useState(initalTasks);
   
  const moveTask = (id, nameTask, targetId) => {
    updateTask(tasks => {
        console.log(id, targetId);

        const taskIndex = findIndex(tasks, task => task.id === id);

        const targetIndex = targetId
        ? findIndex(tasks, task => task.id === targetId)
        : tasks.length;

        const newList = moveElement(tasks, taskIndex, targetIndex)

        return newList.map(task => {
        if (task.id === id) {
            return { ...task};
        } else {
            return task;
        }
        });
    });
};

  return(
  <div class="Single_Column col-4" style={{ paddingBottom: 100 }}>
    <div ref={ref} style={{ padding : 10 }} key={id}>
      {name}
    </div>
    <TasksArea
      nameTask={tasks.nameTask}
      moveTask={moveTask}
      tasks={tasks}
    />
  </div>
  );
};

export default ColumnArea;
const itemType = "COLUMN";
const initalTasks = [
  {
    id: 0,
    nameTask: "TassskUMN >1sza",
  },
  {
    id: 1,
    nameTask: "Tasssk",
  },
  {
    id: 2,
    nameTask: "Tassske",
  },
  {
    id: 3,
    nameTask: "Tasssk",
  },
  {
    id: 4,
    nameTask: "Tassskr",
  },
  {
    id: 5,
    nameTask: "Tasssk",
  },
  {
    id: 6,
    nameTask: "Tasssk",
  }
];