import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import MatchedBuddies from "../LoggedInUser/FEED/MatchedBuddies";
import "../App.css";
import "../Stylesheets/Navbar.css";
import "../Stylesheets/Login.css";

class Select extends React.Component {
  render() {
    const { name, values, selectedValue, handleSelected } = this.props;
    const displayValues = ["", ...values];

    return (
      <select name={name} value={selectedValue} onChange={handleSelected}>
        {displayValues.map(element => (
          <option value={element}> {element}</option>
        ))}
      </select>
    );
  }
}

class NewUserSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.attributes = [
      "Clubbing",
      "Night Owl",
      "Early Bird",
      "Active",
      "Foodie",
      "Mainly likes to relax",
      "Nature-Lover",
      "Likes sightseeing",
      "Spontaneous",
      "Extroverted"
    ];
    this.smokes = ["No", "Yes-occasionally", "Yes-daily"];
    this.drinks = ["Never", "Social drinker", "Moderately", "Regularly"];
    this.ethnicities = [
      "Asian",
      "Black / African",
      "East Indian",
      "Latin / Hispanic",
      "Middle Eastern",
      "Mixed race",
      "Native American",
      "Other ethnicity",
      "Pacific Islander",
      "White / Caucasian"
    ];
    this.religions = [
      "Agnostic / Non-religious",
      "Buddhist",
      "Christian",
      "Hindu",
      "Jewish",
      "Muslim",
      "New Age (Spiritual, but not religious)",
      "Other Religion"
    ];
    this.state = {
      username: this.props.username,
      firstName: "",
      age: "",
      location: "",
      bio: "",
      Clubbing: false,
      "Night Owl": false,
      "Early Bird": false,
      // Active: false,
      Foodie: false,
      "Mainly likes to relax": false,
      "Nature-Lover": false,
      "Likes sightseeing": false,
      Spontaneous: false,
      Extroverted: false,
      smokes: false,
      drinks: false,
      ethnicity: "",
      religion: "",
      submitted: false,
      USERLOGGED:this.props.active
    };
  }
  renderSurvey = e => {
    console.log('submitting survey')
    e.preventDefault()
    axios
      .post("/users/survey", {
        firstName: this.state.firstName,
        age: this.state.age,
        location: this.state.location,
        bio: this.state.bio,
        pic: this.state.pic,
        ethnicity: this.state.ethnicity,
        earlyBird: this.state["Early Bird"],
        nightOwl: this.state["Night Owl"],
        clubbing: this.state.Clubbing,
        spontaneous: this.state.Spontaneous,
        // active: this.state.Active,
        sightseeing: this.state["Likes sightseeing"],
        foodie: this.state.Foodie,
        relax: this.state["Mainly likes to relax"],
        nature: this.state["Nature-Lover"],
        extroverted: this.state.Extroverted,
        smokes: this.state.smokes,
        drinks: this.state.drinks
      })
      .then(res => {
        console.log(res);
        this.setState({
          submitted: true
        });
      })
      .catch(err => {
        console.log("err sending post req in NewUserSurvey", err);
      });
   
  };


  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheckBoxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleSmokes = e => {
    if (
      e.target.value === "Yes-occasionally" ||
      e.target.value === "Yes-daily"
    ) {
      this.setState({ smokes: true });
    } else {
      this.setState({ smokes: false });
    }
  };

  handleDrinks = e => {
    if (e.target.value === "Never") {
      this.setState({ drinks: false });
    } else {
      this.setState({ drinks: true });
    }
  };

  render() {
    const {
      username,
      firstName,
      age,
      location,
      bio,
      ethnicity,
      religion,
      submitted
    } = this.state;
    const { attributes, ethnicities, religions } = this;
    console.log(this.state);
    if (submitted) {
      return <Redirect to="/users/feed" />;
    }
    return (
      <div className="register-survey-container">
        <h2 id="navLogoName">Tell Us About Yourself</h2>
        <hr />
        <form>
          First Name <br />
          <input
            className="firstName"
            placeholder="First name"
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleInput}
          />
          <br />
          Age <br />
          <input
            className="age"
            placeholder="Age"
            type="text"
            name="age"
            onChange={this.handleInput}
          />
          <br />
          Location <br />
          <input
            className="location"
            placeholder="location"
            type="text"
            name="location"
            value={location}
            onChange={this.handleInput}
          />
          <br />
          Bio <br />
          <input
            className="bio"
            placeholder="Bio"
            type="textarea"
            name="bio"
            value={bio}
            onChange={this.handleInput}
          />
          <br />
          {/*  now we are going to start radio buttons here */}
          <br />
          <div className="checkBoxes">
            What are you like on vacation? <br />
            {attributes.map(value => (
              <span>
                <input
                  type="checkbox"
                  name={value}
                  value={value}
                  onChange={this.handleCheckBoxChange}
                />{" "}
                {value}
                <br />
              </span>
            ))}
          </div>
          <br />
          <div className="smoke">
            Do you smoke?
            <br />
            {this.smokes.map(value => (
              <span>
                <input
                  type="radio"
                  name="smokes"
                  value={value}
                  onChange={this.handleSmokes}
                />{" "}
                {value}{" "}
              </span>
            ))}
          </div>
          <br />
          <div className="drink">
            {" "}
            How often do you drink?
            <br />
            {this.drinks.map(value => (
              <span>
                <input
                  type="radio"
                  name="drinks"
                  value={value}
                  onChange={this.handleDrinks}
                />{" "}
                {value}{" "}
              </span>
            ))}
          </div>
          <br />
          <div className="ethnicity">
            Which ethnicity best describes you?{" "}
            <Select
              values={ethnicities}
              name="ethnicity"
              selectedValue={ethnicity}
              handleSelected={this.handleInput}
            />
          </div>
          <br />
          <div className="religion">
            What is your religion?{" "}
            <Select
              values={religions}
              name="religion"
              selectedValue={religion}
              handleSelected={this.handleInput}
            />
          </div>
          <input
            className="surveyBtn"
            type="submit"
            value="Submit"
            onClick={this.renderSurvey}
          />
        </form>
      </div>
    );
  }
}
export default NewUserSurvey;
