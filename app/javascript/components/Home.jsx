import React from "react";
import { Link } from "react-router-dom";
import 'stylesheets/application.css';

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Robert Crites</h1>
        <p className="lead">
          A desperate plea for you to hire me.
        </p>
        <hr className="my-4" />
        <Link
          to="/qualifications"
          className="btn btn-lg custom-button"
          role="button"
        >
          See Why
        </Link>
      </div>
    </div>
  </div>
);
