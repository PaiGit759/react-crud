import React, { Component } from "react";

import TutorialDataService from "../services/tutorial.service";

import { Link } from "react-router-dom";

import userBasketDataService from "../services/user.basket.service";


//import "../css/tutorials.css"; //tutorialscompontynt.css 
import "../css/tutorialscompontynt.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import AuthService from "../services/auth.service";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.showActiveTutorial = this.showActiveTutorial.bind(this);

    this.onChangeQuantity = this.onChangeQuantity.bind(this);

    this.saveUserBasket = this.saveUserBasket.bind(this);


    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      quantity: 1,
    };
  }

  componentDidMount() {

    const user = AuthService.getCurrentUser();
    //  console.log(`+++++${user}`);

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    this.retrieveTutorials();


  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then((response) => {
        this.setState({
          tutorials: response.data,
        });
        //        console.log("11111",response.data); 
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  //
  showActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }
  //


  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then((response) => {
        //      console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          tutorials: response.data,
        });
        //        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  saveUserBasket(event) {
    event.preventDefault();

    var data = {
      user: this.state.currentUser.id,
      quantity: this.state.quantity,
      goods: this.state.currentTutorial.id,
    };

    userBasketDataService.create(data)
      .then((response) => {
      })
      .catch((e) => {
        console.log(e);
      });
  
  alert(`goods ${this.state.currentTutorial.title} added to Basket`)
    }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex, currentUser, showAdminBoard } =
      this.state;

    return (
      <Container fluid>

        <Row>

          <Col xs={6} sm={7} lg={8}>
            <div className="div3-ts">
              < Container fluid>
                <Row>
                  <div className="div1-ts ">
                    {tutorials &&
                      tutorials.map((tutorial, index) => (
                        <div
                          className={"div2-ts"
                            + (index === currentIndex ? "active" : "")}
                          onClick={() => this.setActiveTutorial(tutorial, index)}
                          key={index}
                        >
                          <img src={tutorial.img} className="img1-ts" alt={"*"} />
                          <div className="name-ts">
                            {tutorial.title}
                          </div>
                        </div>
                      ))}
                  </div>
                </Row>
              </Container>
            </div>
          </Col>

          <Col xs={6} sm={5} lg={4}>
            < div className="div4-ts">
              {currentTutorial ? (
                <Container>

                  <Row>
                    <Col xs={12}>
                      <div className="title-ts">
                        {" "}
                        {currentTutorial.title}
                      </div>
                    </Col>
                  </Row>

                  <Row>

                    <Col >
                      <img src={`${currentTutorial.img}`} className="img2-ts" alt={"*"} />
                    </Col>

                    <Col >

                      <div className="description-ts">
                        <label>
                          <p className="descriptionName-ts">Description:</p>
                        </label>{" "}
                        {currentTutorial.description}
                      </div>


                      <div className="description-ts">
                        <label>
                          <p className="descriptionName-ts">Price:</p>
                        </label>{" "}
                        {currentTutorial.price}
                        <span> kr</span>
                      </div>

                      <div className="description-ts">
                        <label>
                          <p className="descriptionName-ts">Discount:</p>
                        </label>{" "}
                        {currentTutorial.discount}
                        <span> %</span>
                      </div>

                    </Col>

                    {showAdminBoard ? (

                      <Button variant="primary">
                        <Link
                          to={"/tutorials/" + currentTutorial.id}
                          className="edit-ts"
                        >
                          Edit
                        </Link>
                      </Button>

                    ) :
                      (
                        ""
                      )
                    }

                    {(!showAdminBoard && currentUser) ? (

                      <div>

                        <label htmlFor="description">Quantity of goods</label>
                        <input
                          type="number"
                          className="form-control"
                          id="quantity"
                          value={this.state.quantity}
                          onChange={this.onChangeQuantity}
                          name="quantity"
                        />

                        <Button
                          onClick={this.saveUserBasket} className="btn btn-success">
                          Add to Basket
                        </Button>

                        <Link
                          to={"/user/"}
                          className="badge badge-warning"
                        >
                          <Button>
                            Go to Basket
                          </Button>

                        </Link>
                      </div>

                    ) :
                      (
                        ""
                      )
                    }
                  </Row>

                </Container>
              ) : (
                <div>
                  <br />
                  <p>Please click on a goods...</p>
                </div>
              )}
            </div>
          </Col>


        </Row>

      </Container>
    );
  }
}

