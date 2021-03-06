import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

class Users extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div className="right">
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Users
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card className="left">
            <CardBody className="width">{this.props.ProjectUser}</CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Users;
