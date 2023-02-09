import React, { Component } from "react";
import UserService from "../services/user.service";


 import UncontrolledExample from "./Carouselgoods";  

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//import TutorialDataService from "../services/tutorial.service";
//import { Link } from "react-router-dom";

//import "./tutorials.css";
import "../css/about.css";

import tetyana from '../IMG/tetyana.JPG'   //tetyana.JPG anatolii.JPG
import anatolii from '../IMG/anatolii.JPG' 

export default class About extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          content: ""
        };
      }
    
      componentDidMount() {
        UserService.getPublicContent().then(
          response => {
            this.setState({
              content: response.data
            });
          },
          error => {
            this.setState({
              content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
            });
          }
        );
      }


    render(){
    return (
        <Container fluid>
            <Row>
          <Col>
   <div className="p-ab">

    <p> Welcome to our internetshop! </p>
    <p> We are there for the small needs and big dreams in everyday life and we are always ready to help you in important moments when you want to realize your dreams - we have for you good music and quality music equipment.</p>
    <p> We are constantly evolving and reinventing ourselves to be a relevant part of the future.</p>
    <p> If you have a question regarding an existing order, you will need to log in to your account to create a case that the respective merchant will respond to.</p>

    </div>
    </Col>
    <Col>
    
<div>
  
    <p id="header-ab">Our team - graduates of the course Front-end of the organization <a href="https://framtidstaget.se/ukraine" className="organization-ab" target={'_blank'}> Föreningen Framtidståget</a> under the guidance of Mikhail Vlasov: </p>
      <div className="flex-container-ab">
        <div className="user-ab">
          <img src={anatolii} className="photo-ab" />
          <p className="Name-ab">Anatolii Puzin</p>
        </div>

        <div className="user-ab">
          <img src={tetyana} className="photo-ab" /> 
          <p className="Name-ab"> Tetyana Kozak </p>
        </div>
      </div>
    <div>
    <p className="p-ab"> Project was created with <span id="skills-ab">HTML, CSS, Flexbox, JavaScript ES6, JSX, React, React Hooks, Redux, Node.js, Mongo DB, GitHub</span></p>
    </div>
</div>

    </Col>
    </Row>

     <UncontrolledExample/> 

    </Container>
 );
    
} 
}