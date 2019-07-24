import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { moveElement, findIndex } from "./collection_helper";
import axios from "axios";

const ColumnArea = ({columnName, moveColumn, columns }) => {
  const [, drop] = useDrop({
    accept: itemType,
    drop: (item, monitor) => {
      if(!monitor.didDrop()) {
        moveColumn(item.id, columnName);
      }
    }
  });

  console.log(columns)

  return(
    <div className="container">
      <div className="row" ref={drop}>
        {columns.map(column => (
          <div style={{padding: 15}}>
            <Column 
            key={column.id}
            id={column.id}
            columnName={column.columnName}
            moveColumn={moveColumn} />
          </div>))}
      </div>
    </div>
  );
}

const Column = ({ id, columnName, moveColumn }) => {
  const ref = useRef();

  const [, drag] = useDrag({
    item: { id: id, columnName, type: itemType }
  });

  const [, drop] = useDrop({
    accept: itemType,
    drop: item => {
      moveColumn(item.id, columnName, id)
    }
  })

  drag(ref);
  drop(ref);

  return(
  <div style={{ paddingBottom: 100 }}>
    <div ref={ref} style={{ padding : 10 }} key={id}>
      {columnName}
    </div>
  </div>
  );
};

export default ColumnArea;

const itemType = "COLUMN";
/////////////////////////////////////////
const Posts = () => {
  const [posts, updatePost] = useState(initalColumns);

  useEffect(() => {
    fetchColumns();
  }, [])

  const fetchColumns = () => {
    axios
        .get("/projects/1/users.json", {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        })
        .then(response => {
          incomingData=response.data.data.columns
    })
  }
  console.log(incomingData)
  const moveColumn = (id, columnName, targetId) => {
    updatePost(posts => {
      console.log(id, targetId);

      const postIndex = findIndex(posts, post => post.id === id);

      const targetIndex = targetId
        ? findIndex(posts, post => post.id === targetId)
        : posts.length;

      const newList = moveElement(posts, postIndex, targetIndex)

      return newList.map(post => {
        if (post.id === id) {
          return { ...post, status: columnName };
        } else {
          return post;
        }
      });
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container1">
            <ColumnArea 
            columns={posts} 
            moveColumn={moveColumn}/>
      </div>
    </DndProvider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Posts />, document.querySelector(".post-app"));
});

const initalColumns = [
  {
    id: 0,
    columnName: "NEW COLUMN >1sza",
  },
  {
    id: 1,
    columnName: "Lovepad",
  },
  {
    id: 2,
    columnName: "Netplode",
  },
  {
    id: 3,
    columnName: "Comcur",
  },
  {
    id: 4,
    columnName: "Nitracyr",
  },
  {
    id: 5,
    columnName: "Remold",
  },
  {
    id: 6,
    columnName: "Namegen",
  }
];
let incomingData = [];

