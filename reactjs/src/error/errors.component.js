import React from "react";
import { Component } from "react";

import AuthRedirect from "../auth/redirect/auth-redirect.component";

const traitError = error => {
    if (error.status && error.data) {
        return error.data;
    }

    if (error.message) {
        return error.message
    }

    return error;
}

export default class Errors extends Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(e) {
    this.props.onDelete(e);
  }

  renderErrors(errors) {
    return errors
      .map(e => traitError(e))
      .map((e, index) => (<div key={index}><span>{e}</span><br /></div>))
  }

  render() {
    const errors = this.props.errors && this.props.errors.filter(e => e);
    const hasErrors = errors.length > 0;
    const isUnauthenticated = hasErrors && errors.some(e => e.status === 401);

    if (hasErrors && isUnauthenticated) {
      return <AuthRedirect />
    }

    if (hasErrors) {
      return (
        <div className="notification is-danger">
          <button className="delete" onClick={this.onDeleteClick}></button> 
          { this.renderErrors(errors) }
        </div>
      );
    }

    return "";
  }
}
