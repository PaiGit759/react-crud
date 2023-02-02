import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { withRouter } from "../common/with-router";

import { useLocation } from 'react-router-dom'

//import "../components/css/users-order.css";
import "../css/users-order.css";

class UsersOrder extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);


    this.state = {
      currentOrder: {
        id: null,
        firstname: "",
        surname: "",
      },
      message: "",
    };
  }


  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });
    return result_base64;
  }

  componentDidMount() {


    const prstr = localStorage.getItem('useData');
    const obj = JSON.parse(prstr);
    console.log('vvvvv', obj);

  }

  onChangeFirstName(e) {
    const firstname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentOrder: {
          ...prevState.currentOrder,
          firstname: firstname,
        },
      };
    });
  }

  onChangeSurname(e) {
    const surname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentOrder: {
          ...prevState.currentOrder,
          surname: surname,
        },
      };
    });
  }

  render() {
    //    const { currentTutorial } = this.state;
    //console.log('ggggg',this.props)
    return (
      <div className="submit-form">
        <h3> Buyer Order Form </h3>

        <div className="div13">

          <div className="div15">
            <label htmlFor="title">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              required
              value={this.state.firstname}
              onChange={this.onChangeFirstName}
              name="firstname"
            />
          </div>

          <div className="div14">
            <label htmlFor="title">Surname</label>
            <input
              type="text"
              className="form-control"
              id="surname"
              required
              value={this.state.surname}
              onChange={this.onChangeSurname}
              name="surname"
            />
          </div>
        </div>


        <div className="div16">

          <div className="div15">
            <label >First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              required
              value={this.state.firstname}
              onChange={this.onChangeFirstName}
              name="firstname"
            />
          </div>

          <div className="div14">
            <label htmlFor="title">Surname</label>
            <input
              type="text"
              className="form-control"
              id="surname"
              required
              value={this.state.surname}
              onChange={this.onChangeSurname}
              name="surname"
            />
          </div>
        </div>



      </div>
    );
  }
}

export default withRouter(UsersOrder);
