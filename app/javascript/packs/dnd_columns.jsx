import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const ColumnArea = ({ columnName, id, moveColumn }) => {
  const [, drop] = useDrop({
    accept: itemType,
    drop: (item, monitor) => {
      if(!monitor.didDrop()) {
        moveColumn(item.id, columnName);
      }
    }
  });
  return(
    <div ref={drop}></div>
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
    <table  moveColumn={moveColumn} key={Column.id} ref={ref}>
      <tr>{columnName}</tr>
      <td></td>
    </table>
  );
};

export default ColumnArea;

const itemType = "COLUMN";
/////////////////////////////////////////
const Posts = () => {
  const [posts, updatePost] = useState(initialData);

  const moveColumn = (id, columnName, targetId) => {
    updatePost(posts => {
      console.log(id, targetId);

      const postIndex = findIndex(posts, post => Column.id === id);

      const targetIndex = targetId
        ? findIndex(posts, post => Column.id === targetId)
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

  const newPosts = posts.filter(post => post.status === "new");
  const goodPosts = posts.filter(post => post.status === "good");
  const badPosts = posts.filter(post => post.status === "bad");

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Posts</h1>
          </div>
        </div>
        <div className="row">
          <ColumnArea columnName="new" posts={newPosts} moveColumn={moveColumn} />
          <ColumnArea columnName="good" posts={goodPosts} moveColumn={moveColumn} />
          <ColumnArea columnName="bad" posts={badPosts} moveColumn={moveColumn} />
        </div>
      </div>
    </DndProvider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Posts />, document.querySelector(".post-app"));
});

const initialData = [
  {
    id: 0,
    title: "Inear",
    status: "new"
  },
  {
    id: 1,
    title: "Lovepad",
    status: "new"
  },
  {
    id: 2,
    title: "Netplode",
    status: "new"
  },
  {
    id: 3,
    title: "Comcur",
    status: "new"
  },
  {
    id: 4,
    title: "Nitracyr",
    status: "new"
  },
  {
    id: 5,
    title: "Remold",
    status: "new"
  },
  {
    id: 6,
    title: "Namegen",
    status: "new"
  }
];


