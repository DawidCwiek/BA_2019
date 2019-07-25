import React from "react";
import ReactDOM from "react-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import NoActiveUsersList from "./no_active_users_list";
import UsersList from "./users_list";

export default class TabsUserList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      first_key: 1,
      second_key: 1
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  refresFirstKey = () => {
    this.state.first_key += 1;
  };

  refresSecondKey = () => {
    this.state.first_key += 1;
  };

  render() {
    return (
      <>
        <h2 className="title-positioning sign-up-header">Users</h2>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1"), this.refresFirstKey();
              }}
            >
              Users list
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2"), this.refresSecondKey();
              }}
            >
              Users to activate
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <UsersList key={this.state.first_key} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <NoActiveUsersList key={this.state.second_key} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<TabsUserList />, document.getElementById("tabs_list"));
});
