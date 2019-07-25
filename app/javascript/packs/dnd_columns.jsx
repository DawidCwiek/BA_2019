import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { moveElement, findIndex } from "./collection_helper";
import axios from "axios";

const ColumnArea = ({name, moveColumn, columns }) => {
  const [, drop] = useDrop({
    accept: itemType,
    drop: (item, monitor) => {
      if(!monitor.didDrop()) {
        moveColumn(item.id, name);
      }
    }
  });

  columns.length;
  console.log(columns)
  columns.map(columsOrder =>  
    
    console.log(columsOrder.id)
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

  return(
  <div class="Single_Column" style={{ paddingBottom: 100 }}>
    <div ref={ref} style={{ padding : 10 }} key={id}>
      {name}
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
          updatePost(response.data.data.columns)
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

  const moveColumn = (id, name, targetId) => {
    updatePost(posts => {
      console.log(id, targetId);

      const postIndex = findIndex(posts, post => post.id === id);
    
      const targetIndex = targetId
        ? findIndex(posts, post => post.id === targetId)
        : posts.length;

      const newList = moveElement(posts, postIndex, targetIndex)

      return newList.map(post => {
        if (post.id === id) {
          return { ...post};
        } else {
          return post;
        }
      });
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="TableContainer">
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
    name: "NEW COLUMN >1sza",
  },
  {
    id: 1,
    name: "Lovepad",
  },
  {
    id: 2,
    name: "Netplode",
  },
  {
    id: 3,
    name: "Comcur",
  },
  {
    id: 4,
    name: "Nitracyr",
  },
  {
    id: 5,
    name: "Remold",
  },
  {
    id: 6,
    name: "Namegen",
  }
];


