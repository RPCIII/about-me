import React from "react";
import { Link } from "react-router-dom";

class Qualifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualifications: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/qualifications/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ qualifications: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { qualifications } = this.state;
    const allQualifications = qualifications.map((qualification, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={qualification.image}
            className="card-img-top"
            alt={`${qualification.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{qualification.name}</h5>
            <Link to={`/qualification/${qualification.id}`} className="btn custom-button">
              View Qualification
            </Link>
          </div>
        </div>
      </div>
    ));
    const noQualification = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No qualifications added yet. Why not <Link to="/qualification">add one?</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">All of my qualifications</h1>
            <p className="lead text-muted">
              Here's a list of all the experience that I have. I hope it impresses you, at least a little.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/qualification" className="btn custom-button">
                Add New Qualification
              </Link>
            </div>
            <div className="row">
              {qualifications.length > 0 ? allQualifications : noQualification}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default Qualifications;
