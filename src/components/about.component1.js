import React, { Component } from "react";
import UserService from "../services/user.service";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

//import "./tutorials.css";

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
   <div>

    <p> Welcome to our internetshop! </p>
    <p> We are there for the small needs and big dreams in everyday life - good music and quality music equipment. </p>
    <p> We are always ready to help you in important moments when you want to realize your dreams.</p>
    <p> We are constantly evolving and reinventing ourselves to be a relevant part of the future.</p>
    <p> If you have a question regarding an existing order, you will need to log in to your account to create a case that the respective merchant will respond to.</p>

    </div>
    </Col>
    <Col>
<div>
    <h3>Our team - graduates of the course "Front-end" of the organization <a href="https://framtidstaget.se/ukraine"> "Föreningen Framtidståget"</a> under the guidance of Mikhail Vlasov: </h3>
       < img src={anatolii} className="photo" width={'100px'} height={'100px'}/>
    <p> Anatolii Puzin</p>
      < img src={tetyana} className="photo" width={'100px'} height={'100px'}/> 
    <p> Tetyana Kozak</p>

    <p> Project was created with HTML, CSS, Flexbox, JavaScript ES6, JSX, React, React Hooks, Redux, Node.js, Mongo DB, GitHub</p>
</div>
    </Col>
    </Row>
    </Container>
    );
}
}