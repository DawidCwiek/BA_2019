import React, { useRef, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TasksArea } from "./dnd_tasks";
import { moveElement, findIndex } from "./collection_helper";
import { black } from "ansi-colors";
import axios from "axios";

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
   
  const moveTask = (id, title, targetId) => {
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

  useEffect(() => {
    fetchTasks();
  }, [])

  const fetchTasks = () => {
    axios
        .get("/projects/1/users.json", {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        })
        .then(response => {
          const tasks = response.data.data.task;
          updateTask(tasks.filter(task => task.column_id === id))
    }
    // )
    // axios
    //     .patch(
    //       `/administrators/add_admin/${this.props.user_id}`,{
    //         headers: {
    //           "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
    //             .content
    //         }
    //       })
    //     .then(() => {
    //       this.props.user_data();
    // }
    );
  }

  return(
  <div className="Single_Column col-4" style={{ paddingBottom: 100 }}>
    <div ref={ref} style={{ padding : 10 }} key={id}>
      <h4>{name}</h4>
    </div>
    <TasksArea
      title={tasks.title}
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
    column_id: 1,
    title: "TassskUMN >1sza",
  },
  {
    id: 1,
    column_id: 1,
    title: "Tasssk",
  },
  {
    id: 2,
    column_id: 2,
    title: "Tassske",
  },
  {
    id: 3,
    column_id: 2,
    title: "Tasssk",
  },
  {
    id: 4,
    column_id: 3,
    title: "Tassskr",
  },
  {
    id: 5,
    column_id: 3,
    title: "Tasssk",
  },
  {
    id: 6,
    column_id: 3,
    title: "Tasssk",
  }
];