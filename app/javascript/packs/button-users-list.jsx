import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

class Users extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, users: [] };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Users
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody users={this.state.users}></CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Users;
