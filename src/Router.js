import React, { Component } from 'react';
import get from 'lodash/get';


//process.env.NODE_TLS_REJECT_UNAUTHORIZED = (config.server.node_env !== 'production') ? '0' : '1';

class Router extends Component {
  componentDidUpdate(prevProps) {
    const { match } = this.props;
  }

  render() {
    const { content, error } = this.props;
    const { asset } = content;
    const errorMessage = get(error, 'message', '');

    let body = 'Hello World';

    return (
      <>
      {body}
      </>
    );
  }
}

export default Router;
