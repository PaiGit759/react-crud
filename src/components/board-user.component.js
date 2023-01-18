import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import userBasketDataService from "../services/user.basket.service";
import AuthService from "../services/auth.service";
import Container from "react-bootstrap/esm/Container";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.retrieveUserBasket = this.retrieveUserBasket.bind(this);

    this.state = {

      userBaskets: [],
      currentUserBasket: null,
      currentIndex: -1,
      currentUser: undefined,

      content: ""
    };
  }

  componentDidMount() {

    const user = AuthService.getCurrentUser();
    

    if (user) {
      this.setState({
        currentUser: user,

      });
    }

    this.retrieveUserBasket();
    //   console.log(this.state.userBaskets);



    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        }
        );
        //        console.log(response.data);

      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );




  }




  retrieveUserBasket() {
//    userBasketDataService.getAll()

const user = AuthService.getCurrentUser();
    
if (user) {

    userBasketDataService.get(user.id)
    
      .then((response) => {
        this.setState({
          userBaskets: response.data,
        });
                 console.log("77777",response.data);
        //         console.log("99999",this.state.userBaskets);
      })
      .catch((e) => {
        console.log(e);
      });
  }

}

  render() {

    const { userBaskets , currentUser } = this.state;
    //  console.log("99999",userBaskets);

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        <div>
          {userBaskets &&
            userBaskets.map((userBaskets, index) => (
              <Container>
              <img src={userBaskets.goods.img} className="img1" alt={"*"} />
              <h5> { userBaskets.goods.title}  { userBaskets.quantity } </h5>
              </Container>  
            ))}
      </div>

      </div >






    );
  }
}
