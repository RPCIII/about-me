import React from "react";
import { Link } from "react-router-dom";

class Qualification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { qualification: { skill: "" } };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteQualification = this.deleteQualification.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ qualification: response }))
      .catch(() => this.props.history.push("/qualifications"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteQualification() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/qualifications"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { qualification } = this.state;
    let skillsList = "No ingredients available";

    if (qualification.skill.length > 0) {
      skillsList = qualification.skill
        .split(",")
        .map((skill, index) => (
          <li key={index} className="list-group-item">
            {skill}
          </li>
        ));
    }
    const experienceDescription = this.addHtmlEntities(qualification.experience);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={qualification.image}
            alt={`${qualification.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {qualification.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Skills</h5>
                {skillsList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Experience</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${experienceDescription}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteQualification}>
                Delete Qualification
              </button>
            </div>
          </div>
          <Link to="/qualifications" className="btn btn-link">
            Back to qualifications
          </Link>
        </div>
      </div>
    );
  }

}

export default Qualification;