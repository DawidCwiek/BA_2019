import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { moveElement, findIndex } from "./collection_helper";
import { ColumnArea } from "./dnd_columns_area";
import axios from "axios";

const Dnd = ({projectId}) => {

  const [posts, updatePost] = useState(initalColumns);

  useEffect(() => {
    fetchColumns();
  }, [])

  const fetchColumns = () => {
    axios
        .get(`/projects/${projectId}/users.json`, {
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
            moveColumn={moveColumn}
            projectId={projectId}
            />
      </div>
    </DndProvider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".post-app");
  ReactDOM.render(<Dnd projectId={el.dataset.projectId}/>, el);
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


