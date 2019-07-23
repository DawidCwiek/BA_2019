import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { findIndex, moveElement } from "./collection_helpers";

class Columns extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        columnsData: []
      };

const [columns, updateColumns] = useState(columnsData);

columnsDataTaker = () =>{

axios
    .get(
    "projects.json",
    {
        headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
    })
    .then(response => {
    this.setState({ columnsData: response.data.data });
    });
}

componentDidMount() {
    this.columnsDataTaker();
}

const moveColumn = (id, columnTitle, targetId) => {
updateColumns(columns => {
    console.log(id, targetId);

    const columnIndex = findIndex(columns, columns => columns.id === id);

    const targetIndex = targetId
    ? findIndex(columns, column => column.id === targetId)
    : columns.length;

    const newList = moveElement(posts, columnIndex, targetIndex)

    return newList.map(column => {
    if (column.id === id) {
        return { ...column};
    } else {
        return column;
    }
    });
  });
};

const Column = ({ id, columnTitle, moveColumn }) => {
    const ref = useRef();
  
    const [, drag] = useDrag({
      item: { id: id, type: itemType }
    });
  
    const [, drop] = useDrop({
      accept: itemType,
      drop: item => {
        moveColumn(item.id, columnTitle, id)
      }
    })
  
    drag(ref);
    drop(ref);
  
    return (
        <table className="col-4">
          <th>{columnTitle}</th>
          <td className="list-group" style={{ paddingBottom: 100 }} ref={drop}>
            {posts.map(column => (
              <Post
                key={column.id}
                id={column.id}
                columnTitle={columnTitle}
                movePost={moveColumn}
              />
            ))}
          </td>
        </table>
      );
  };

const itemType="COLUMN"
    }
}

export default Columns;

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Columns />, document.querySelector(".post-app"));
  });
