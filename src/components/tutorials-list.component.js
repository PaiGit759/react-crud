import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

import "./tutorials.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        // console.log(response.data);
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


  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex, currentUser, showAdminBoard } =
      this.state;

    return (
      <Container>
        <Row>
          <div className="div3">

            <div className="div1 ">
              {tutorials &&
                tutorials.map((tutorial, index) => (
                  <div
                    className={"div2"
                      + (index === currentIndex ? "active" : "")}
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    <img src={tutorial.img} className="img1" alt={"*"} />
                    <div>
                      {tutorial.title}
                    </div>

                  </div>
                ))}
            </div>
          </div>



          < div className="div4">
            {currentTutorial ? (
              <Container>


                <Row>
                  <Col xs={12}>
                    <h2 id="headerGoods">Goods</h2>
                  </Col>
                </Row>


                <Row>

                  <Col >
                    <img src={`${currentTutorial.img}`} className="img2" alt={"*"} />
                  </Col>



                  <Col >
                    <div>
                      <label>
                        <strong>Title:</strong>
                      </label>{" "}
                      {currentTutorial.title}
                    </div>
                    <div>
                      <label>
                        <strong>Description:</strong>
                      </label>{" "}
                      {currentTutorial.description}
                    </div>
                    <div>
                      <label>
                        <strong>Price:</strong>
                      </label>{" "}
                      {currentTutorial.price}
                      <span> kr</span>
                    </div>
                    <div>
                      <label>
                        <strong>Discount:</strong>
                      </label>{" "}
                      {currentTutorial.discount}
                      <span> %</span>
                    </div>
                    <div>
                      <label>
                        <strong>Status:</strong>
                      </label>{" "}
                      {currentTutorial.published ? "Published" : "Pending"}
                    </div>
                  </Col>

                  {showAdminBoard ? (
                    <Link
                      to={"/tutorials/" + currentTutorial.id}
                      className="badge badge-warning"
                    >
                      Edit
                    </Link>
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

                      <Link

                        className="badge badge-warning"
                      >
                        Add to Basket
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



        </Row>
      </Container>
    );
  }
}

