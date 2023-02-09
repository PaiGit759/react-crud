import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";


//import React, { Component, useState } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import ClickableStatusBarComponent from '../components/clickableStatusBarComponent.tsx'
import ClickableStatusBarComponentDelete from '../components/clickableStatusBarComponentDelete.tsx'

import UserOrderDataService from "../services/user.order.service";

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import 'ag-grid-enterprise';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      userOrder: [],
      rowData: [],

    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, 
      userReady: true,
      columnDefs:
          [
            { headerName: 'Order Id', field: '_id',  width: 300, maxWidth: 350, },
            { headerName: 'Surname', field: 'surname', resizable: true, cellRenderer: 'agGroupCellRenderer' },
            { headerName: 'Totalamount', wrapHeaderText: true, field: 'totalamount',  type: 'numericColumn', width: 160, maxWidth: 200, resizable: true },
            { headerName: 'Status', field: 'orderstatus.name', resizable: true, cellRenderer: 'agGroupCellRenderer' },
//orderstatus totalamount



/*             
            { headerName: 'Quantity', wrapHeaderText: true, field: 'quantity', type: 'numericColumn', width: 110, maxWidth: 110, resizable: true },
            { headerName: 'Price', field: 'goods.price', type: 'numericColumn', width: 100, maxWidth: 200, resizable: true },
            { headerName: 'Discount %', field: 'goods.discount', type: 'numericColumn', width: 130, maxWidth: 200, resizable: true },
            { headerName: 'Price new', field: 'price_new', valueGetter: 'Math.round(getValue("goods.price") * (1 - (getValue("goods.discount") / 100)))', type: 'numericColumn', width: 120, maxWidth: 120, resizable: true },
            { headerName: 'Amount payable', wrapHeaderText: true, field: 'amount', valueGetter: 'Math.round(getValue("quantity") * getValue("price_new"))', type: 'numericColumn', width: 160, maxWidth: 200, resizable: true },

 */
  //          { headerName: 'Id', field: 'id', hide: true },
            

          ],

    })


    
    if (currentUser) {

      UserOrderDataService.get(currentUser.id)

        .then((response) => {
          this.setState({
            userOrder: response.data,
            rowData: [...response.data]
          });
                   console.log("77777",response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
 }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser , rowData, columnDefs } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Orders
          </h3>
        </header>

{/* 
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>

 */}
      
      <div className="ag-theme-alpine" style={{ width: 870, height: 300 }} >
          < AgGridReact rowHeight={'35'}  rowSelection='multiple'
            rowData={rowData}
            columnDefs={columnDefs}
          />
        </div>  
        
      </div>
      
      : null}

      </div>
    );
  }
}

/* 
<ul>
{currentUser.roles &&
  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
</ul> 


*/