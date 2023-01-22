import React, { Component , useState  } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import userBasketDataService from "../services/user.basket.service";
import AuthService from "../services/auth.service";
import Container from "react-bootstrap/esm/Container";



import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/* 
const [rowData] = [
  {make: "Toyota", model: "Celica", price: 35000},
  {make: "Ford", model: "Mondeo", price: 32000},
  {make: "Porsche", model: "Boxster", price: 72000}
];

const [columnDefs] = [
  { field: 'make' },
  { field: 'model' },
  { field: 'price' }
]; */

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.retrieveUserBasket = this.retrieveUserBasket.bind(this);

    this.state = {

      userBaskets: [],
      currentUserBasket: null,
      currentIndex: -1,
      currentUser: undefined,

      columnDefs : [],
      rowData : [],

      content: ""
    };
  }

  componentDidMount() {

    const user = AuthService.getCurrentUser();
  
    function getPrise(params) {
      return params.price * params.discount / 100;
    }  
    

    if (user) {
      this.setState({
        currentUser: user,

        columnDefs : 
        [
          {headerName: 'Title', field: 'goods.title' , resizable: true},
        { headerName: 'Quantity', field: 'quantity', type: 'rightAligned' , width: 100, maxWidth: 100 , resizable: true},
        { headerName: 'Price', field: 'goods.price', type: 'rightAligned' , width: 100, maxWidth: 200 , resizable: true},
        { headerName: 'Discount %', field: 'goods.discount', type: 'rightAligned' , width: 120, maxWidth: 200, resizable: true },
        { headerName: 'Price new', field: 'price_new', valueGetter: 'Math.round(getValue("goods.price") * (1 - (getValue("goods.discount") / 100)))', type: 'rightAligned' , width: 100, maxWidth: 200 , resizable: true},
        { headerName: 'Amount payable', field: 'amount', valueGetter: 'Math.round(getValue("quantity") * getValue("price_new"))', type: 'rightAligned' , width: 160, maxWidth: 200 , resizable: true},
        
        { headerName: 'Id', field: 'goods.id', hide : true },
        
      ],
/*         rowData : 
        
        [{make: "Toyota", model: "Celica", price: 35000},
          {make: "Ford", model: "Mondeo", price: 32000},
          {make: "Porsche", model: "Boxster", price: 72000}
        ]
        
        ,     */

      });
    }

    this.retrieveUserBasket();
    //   console.log(this.state.userBaskets);



    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data        }
        );
//                console.log('!!!!!',rowData);

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
          rowData : [...response.data] 
        });
        //         console.log("77777",response.data);
      //           console.log("99999",rowData);
      })
      .catch((e) => {
        console.log(e);
      });
  }

}

  render() {

    const { userBaskets , currentUser , rowData , columnDefs } = this.state;
      console.log("999999999",rowData);

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



      <div className="ag-theme-alpine" style={{height: 300, width : 900}} >
           < AgGridReact rowHeight={'35'}
               rowData={rowData}
               columnDefs={columnDefs}
           />
       </div>



      </div >
    );
  }
}
