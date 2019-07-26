import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export const TasksArea = ({nameTask, moveTask, tasks }) => {

const [, drop] = useDrop({
    accept: itemType2,
    drop: (item, monitor) => {
    if(!monitor.didDrop()) {
        moveTask(item.id, nameTask);
    }
    }
});

const columnIds = tasks.map(taskOrder => 
    taskOrder.id
    )

console.log(columnIds); 
    return(
        <div className="Task-container" ref={drop}>
            {tasks.map(task => (
                <Task 
                key={task.id}
                id={task.id}
                name={task.nameTask}
                moveTask={moveTask}
                tasks={tasks}
                />
            ))}
        </div>
    );
}

const Task = ({id, name, moveTask}) => {
  const ref = useRef();

  const [, drag] = useDrag({
    item: { id: id, name, type: itemType2 }
  });

  const [, drop] = useDrop({
    accept: itemType2,
    drop: item => {
      moveTask(item.id, name, id)
    }
  })

  drag(ref);
  drop(ref);

  return(
  <div class="Single_Task" style={{ paddingBottom: 20 }} ref={ref}  key={id}>
      {name}
  </div>
  );
};

const itemType2= "TASK";

  