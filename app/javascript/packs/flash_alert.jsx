import React from 'react';
import ReactDOM from "react-dom";
import { Alert } from 'reactstrap';

class FlshAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      flash: this.props.alert.pop(),
    };
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  color = () => {
    if (this.state.flash[0] === "notice") {
      return "success"
    } else if (this.state.flash[0] === "alert") {
      return "warning"
    } else {
      return "info"
    }
  }

  render() {
    return (
      <Alert color={this.color()} isOpen={this.state.visible} toggle={this.onDismiss}>
        {this.state.flash[1]}
      </Alert>
    );
  }
}

export default FlshAlert;

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('alert')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <FlshAlert alert={data}/>,
  document.getElementById('alert'))
})
