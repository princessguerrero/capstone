import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// import './profile.css';
import axios from "axios";
// import Bffs from "./Bffs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";
import AddTrips from "./AddTrips";
import dateFormat from "dateformat";
import MyListedTrips from './MyListedTrips'
// import DatePicker from "react-datepicker";
// import "react-dates/initialize";
// import {
//   DateRangePicker,
//   SingleDatePicker,
//   DayPickerRangeController
// } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng
// } from "react-places-autocomplete";

import '../Stylesheets/AddTrips.css'
import BucketList from './BucketList'



class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      user_id: this.props.user.id,
      username: this.props.username,
      activeUser:this.props.active,
      userImageURL: "",
      first_name: "",
      my_location: "",
      age: "",
      bio: "",
      ethnicity: "",
      religion:'', 
      early_bird: "",
      night_owl: "",
      clubbing: "",
      spontaneous: "",
      active: "",
      sightseeing: "",
      foodie: "",
      relax: "",
      nature: "",
      extroverted: "",
      smokes: "",
      drinks: "", 
      trips:'', 
      openTrips:'', 
      pastTrips:'', 
      // bucketListTodos:'', 
      // startDate: null,
      // endDate: null,
      // focusedInput: null,
      // start_date: "",
      // end_date: "",
      // address: "",
      // submitted:false,
      // bucketlist:[],
      

    };
  }


  fixUser = () => {
    console.log('im trying to fix the user!!!')
    const {user, username, user_id}= this.state
    if(!this.state.username){
      this.setState({
        username:this.state.user
      })
    }
    if(!this.state.user_id){
      axios.get("/users/").then(response => {
        console.log('user id ', response.data.data)
        const found=response.data.data.find(n => n.username === this.state.user.username)
        console.log(found)
        if (found) 
        this.setState({
          user_id:found.id
        })
         
    })
    }
  
}
  

  getUserInfo = () => {
    const { username, user } = this.state;

    axios
      .get(`/users/userAttributes/${this.state.username}`)
      .then(res => {
        let UserInfo = res.data;
        this.setState({
          user: UserInfo,
          userImageURL: UserInfo.pic,
          first_name: UserInfo.first_name,
          my_location: UserInfo.my_location,
          age: UserInfo.age,
          bio: UserInfo.bio,
          ethnicity: UserInfo.ethnicity,
          religion:UserInfo.religion, 
          early_bird: UserInfo.early_bird,
          night_owl: UserInfo.night_owl,
          clubbing: UserInfo.clubbing,
          spontaneous: UserInfo.spontaneous,
          active: UserInfo.active,
          sightseeing: UserInfo.sightseeing,
          foodie: UserInfo.foodie,
          relax: UserInfo.relax,
          nature: UserInfo.nature,
          extroverted: UserInfo.extroverted,
          smokes: UserInfo.smokes,
          drinks: UserInfo.drinks, 
          bucketlist:'', 
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  getUserTrips=()=>{
    const {trips}=this.state
      //getting the current Date;
      const dateNow= new Date()
    axios
    .get(`/users/allTrips/${this.state.username}`)
    .then(res => {
      let UserInfo = res.data;
      this.setState({
        trips:res.data, 
      })
     //have to create a date object bc its originally a string
      // comparing date objects with date objects 
      const pastTrips= this.state.trips.filter(trip=> new Date(trip.end_date)< dateNow)
      const openTrips= this.state.trips.filter(trip=> new Date(trip.end_date)> dateNow)
      this.setState({
        pastTrips:pastTrips, 
        openTrips:openTrips
      })
    });
  };

  getBucketList = ()=>{
    console.log('hitting the bucket list!' )
    const {username}= this.state
    
    axios
    .get(`/users/bucketlist/${username}`)
    .then(res =>{
      console.log('this is the response,', res.data)
      this.setState({
        bucketlist: res.data 
      })
      console.log(
      ' in the bucket list function ' , this.state.bucketlist)
    })
    .catch(err => {
      console.log("err in getting bucketlist", err);
    });
  }



  componentWillMount() {
    this.fixUser();
    this.getUserTrips();
    this.getBucketList();
  }

  componentDidMount() {
    this.getUserInfo();
    // this.getBucketList();
  }

  handleClickAddTrip = e => {
    e.preventDefault();
    const { username, user } = this.state;
    return (window.location.href = `http://localhost:3000/users/me/${username}/trips/add`);
  };

  // handleInput = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  // inputChange = address => {
  //   this.setState({
  //     address: address
  //   });
  // };

  // addToBucketList = e => {
  //   e.preventDefault();
  //   console.log("submitting survey");
  //   console.log(this.state.startDate._d)
  //   axios
   
  //     .post("/users/addBucketList", {
  //       id: this.state.user_id,
  //       username: this.state.username,
  //       destination: this.state.address,
  //       startDate: this.state.startDate._d,
  //       endDate: this.state.endDate._d,
  //       todos: this.state.bucketListTodos
  //     })
  //     .then(res => {
  //       console.log(res);
  //       // this.getBucketList(); 
  //       this.setState();
  //       // window.location.reload();
        
  //     })
  //     .catch(err => {
  //       console.log("err posting bucket list", err);
  //     });
  // };


  render() {
    const {
      user,
      user_id,
      username,
      activeUser,
      userImageURL,
      first_name,
      my_location,
      age,
      bio,
      ethnicity,
      religion,
      early_bird,
      night_owl,
      clubbing,
      spontaneous,
      sightseeing,
      foodie,
      relax,
      nature,
      extroverted,
      smokes,
      drinks, 
      trips, 
      openTrips, 
      pastTrips, bucketListTodos, startDate, endDate, address, bucketlist
    } = this.state;

    console.log(this.state)
    console.log(username , 'this is the username')
    const AddressInputProps = {
      value: this.state.address,
      onChange: this.inputChange
    };

    const addressCSSClasses = {
      root: "form-group",
      input: "search-input",
      autocompleteContainer: "autocomplete-container"
    };
console.log('active user ' , activeUser)
    return (
      <div className="userProfile">
        <div>
          <img src={userImageURL} className="pic" />
        </div>
        <div>
          <div>
            Name: {first_name}, Age: {age}
          </div>

          <div>@{username}</div>
          <div>Location: {my_location}</div>
        </div>
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Trips</Tab>
            <Tab>Bucket List </Tab>
          </TabList>
          <TabPanel>
            <div>
              <div>
               {activeUser ? <Link to={`/users/me/${username}/editprofile`}><i className="far fa-edit fa-2x" /></Link>  :''} 
              </div>
              <div>
                <h3>About me: {bio} </h3>
              </div>
              Ethnicity: {ethnicity}
              <div>
                <br/>
                <div> 
                  Religion: {religion}
                  </div>
                  <br/>
                <pre>
                  <b>As a traveler: </b>
                  <br />
                  <br /> I am an early bird:{" "}
                  {this.state["early_bird"] ? "yes" : "no"} ,
                  <br /> A night owl: {this.state["night_owl"] ? "yes" : "no"},
                  <br /> Like clubbing: {this.state["clubbing"] ? "yes" : "no"},
                  <br /> I am spontaneous:{" "}
                  {this.state["spontaneous"] ? "yes" : "no"},
                  <br /> I am active: {this.state["active"] ? "yes" : "no"},
                  <br /> I like sightseeing:{" "}
                  {this.state["sightseeing"] ? "yes" : "no"},
                  <br /> I am a foodie: {this.state["foodie"] ? "yes" : "no"},
                  <br /> Relax: {this.state["relax"] ? "yes" : "no"},
                  <br /> Enjoy nature: {this.state["nature"] ? "yes" : "no"},
                  <br /> I am extroverted:{" "}
                  {this.state["extroverted"] ? "yes" : "no"},
                  <br /> Smoke: {this.state["smokes"] ? "yes" : "no"},
                  <br /> Drink: {this.state["drinks"] ? "yes" : "no"}
                </pre>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              
            <h2> Current Trips</h2>
              {openTrips
                ? <MyListedTrips  activeUser={activeUser} username={username}/>
                : ""}
              {activeUser ? <button onClick={this.handleClickAddTrip}>Add Trips</button> :''}
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <h2>My BucketList </h2>
              <br/>
              {console.log('my bucketlist!!! , ' , bucketlist)}
               <BucketList activeUser={activeUser} username={this.state.username}/> 
              

              {/* Destination:{" "}
          <PlacesAutocomplete
            classNames={addressCSSClasses}
            inputProps={AddressInputProps}
          />
          <br />
          <div className-travel-calendar>
            <br />
            Please Select Your Travel Dates:
            <DateRangePicker
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => {
                this.setState({ startDate, endDate });
              }}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => {
                this.setState({ focusedInput });
              }}
            />
          </div>
          <div className="bucketListTodos">
            Planned Activites:
            <input
              type="text"
              placeholder="todos"
              name="bucketListTodos"
              value={bucketListTodos}
              onChange={this.handleInput}
            />
          </div>

              <br />
         {startDate &&endDate && address? <input
            className="companionBtn"
            type="submit"
            value="Add to my bucket list"
            onClick={this.addToBucketList}
          /> : 
          <input
            className="companionBtn"
            type="submit"
            value="Add  to my bucket list!"
            onClick={this.addToBucketList}
            disabled
          />} */}
              </div>


            </TabPanel>
        </Tabs>
        
      </div>
    );
  }
}

export default UserProfile;
