import React from "react";
import { Link } from "react-router-dom";

class NewQualification extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        skill: "",
        experience: ""
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }
  
    stripHtmlEntities(str) {
      return String(str)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  
    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    onSubmit(event) {
      event.preventDefault();
      const url = "/api/v1/qualifications/create";
      const { name, skill, experience } = this.state;
  
      if (name.length == 0 || skill.length == 0 || experience.length == 0){
        return;
      }
      const body = {
        name,
        skill,
        experience: experience.replace(/\n/g, "<br> <br>")
      };
  
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/qualification/${response.id}`))
        .catch(error => console.log(error.message));
    }
  
    render() {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Add a new qualification to this web app resume.
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="qualificationName">Qualification name</label>
                  <input
                    type="text"
                    name="name"
                    id="qualificationName"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skill">Skills</label>
                  <input
                    type="text"
                    name="skill"
                    id="skill"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                  <small id="skillsTip" className="form-text text-muted">
                    Separate each skill with a comma.
                  </small>
                </div>
                <label htmlFor="experience">Experience</label>
                <textarea
                  className="form-control"
                  id="experience"
                  name="experience"
                  rows="5"
                  required
                  onChange={this.onChange}
                />
                <button type="submit" className="btn custom-button mt-3">
                  Create Qualification
                </button>
                <Link to="/qualifications" className="btn btn-link mt-3">
                  Back to qualifications
                </Link>
              </form>
            </div>
          </div>
        </div>
      );
    }
  
  }
  
  export default NewQualification;
