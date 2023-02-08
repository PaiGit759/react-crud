import React, { Component, useState } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import ClickableStatusBarComponent from '../components/clickableStatusBarComponent.tsx'
import ClickableStatusBarComponentDelete from '../components/clickableStatusBarComponentDelete.tsx'

import userBasketDataService from "../services/user.basket.service";
import AuthService from "../services/auth.service";
//import Container from "react-bootstrap/esm/Container";



import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import 'ag-grid-enterprise';

import logo from '../IMG/basket.jpeg'//"./public/basket.jpeg"; react-crud/public/basket.jpeg



export default class BoardUser extends Component {
  constructor(props) {
    super(props);
  
    this.retrieveUserBasket = this.retrieveUserBasket.bind(this);

    this.state = {

      userBaskets: [],
      currentUserBasket: null,
      currentIndex: -1,
      currentUser: undefined,

      columnDefs: [],
      rowData: [],
      statusBar: undefined,

      content: ""
    };
  }

  componentDidMount() {


    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,

        columnDefs:
          [
            { headerName: 'Title', field: 'goods.title', resizable: true, cellRenderer: 'agGroupCellRenderer' },
            { headerName: 'Quantity', wrapHeaderText: true, field: 'quantity', type: 'numericColumn', width: 110, maxWidth: 110, resizable: true },
            { headerName: 'Price', field: 'goods.price', type: 'numericColumn', width: 100, maxWidth: 200, resizable: true },
            { headerName: 'Discount %', field: 'goods.discount', type: 'numericColumn', width: 130, maxWidth: 200, resizable: true },
            { headerName: 'Price new', field: 'price_new', valueGetter: 'Math.round(getValue("goods.price") * (1 - (getValue("goods.discount") / 100)))', type: 'numericColumn', width: 120, maxWidth: 120, resizable: true },
            { headerName: 'Amount payable', wrapHeaderText: true, field: 'amount', valueGetter: 'Math.round(getValue("quantity") * getValue("price_new"))', type: 'numericColumn', width: 160, maxWidth: 200, resizable: true },

            { headerName: 'Id', field: 'goods.id', hide: true },
            { headerName: 'Payable', field: 'callId', checkboxSelection: true },

          ],

        statusBar: {
          statusPanels: [
            //         { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left', },
            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            { statusPanel: 'agFilteredRowCountComponent' },
            { statusPanel: 'agSelectedRowCountComponent' },
            {
              statusPanel: 'agAggregationComponent',
              statusPanelParams: {
                // possible values are: 'count', 'sum', 'min', 'max', 'avg'
                aggFuncs: ['avg', 'sum']
              }
            },
            {
              statusPanel: ClickableStatusBarComponent,
            },
            {
              statusPanel: ClickableStatusBarComponentDelete, align: 'right'
            },

          ]
        }

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
    const user = AuthService.getCurrentUser();

    if (user) {

      userBasketDataService.get(user.id)

        .then((response) => {
          this.setState({
            userBaskets: response.data,
            rowData: [...response.data]
          });
          //         console.log("77777",response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

  }

  render() {

    const { userBaskets, currentUser, rowData, columnDefs, statusBar } = this.state;
    //    console.log("999999999", statusBar);

    return (
      <div className="container">
        <header className="jumbotron">

          <img

            src={logo}
          />


          <h3>User shopping cart</h3>
        </header>

        <div className="ag-theme-alpine" style={{ width: 900, height: 300 }} >
          < AgGridReact rowHeight={'35'} statusBar={statusBar} rowSelection='multiple'
            rowData={rowData}
            columnDefs={columnDefs}
          />
        </div>
      </div >
    );
  }
}
