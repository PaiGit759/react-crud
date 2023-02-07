import React, { Component } from "react";
import UserOrderDataService from "../services/user.order.service";
import { withRouter } from "../common/with-router";

import AuthService from "../services/auth.service";

import "../css/users-order.css";

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';


class UsersOrder extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAdress = this.onChangeAdress.bind(this);

    this.saveOrder = this.saveOrder.bind(this);
    //telephone  email  adress surname saveOrder

    this.state = {
      //    currentOrder: {
      id: null,
      firstname: "",
      surname: "",
      telephone: "",
      email: "",
      adress: "",
      //      },
      message: "",
      currentUser: null,
      columnDefs: [],
      rowData: [],
      totalAmount: 0,
    };
  }

  /* 
    async readFileAsDataURL(file) {
      let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
      });
      return result_base64;
    }
   */
  componentDidMount() {


    const prstr = localStorage.getItem('useData');
    const obj = JSON.parse(prstr);
    let itsum = 0;

    const rowData = obj.map((elem) => {
      let xxx = Math.round(elem.quantity * elem.goods.price * (1 - elem.goods.discount / 100));
      itsum += xxx;
      let vvv = { id: elem.goods.id, title: elem.goods.title, amount: xxx, quantity: elem.quantity }
      return vvv;
    });

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        email: user.email,

        columnDefs:
          [
            { headerName: 'Title', field: 'title', resizable: true, cellRenderer: 'agGroupCellRenderer' },
            { headerName: 'Quantity', wrapHeaderText: true, field: 'quantity', type: 'numericColumn', width: 120, maxWidth: 120, resizable: true },
            { headerName: 'Amount payable', wrapHeaderText: true, field: 'amount', type: 'numericColumn', width: 160, maxWidth: 200, resizable: true },
            { headerName: 'Id', field: 'id', hide: true },
          ],
        rowData: rowData,
        totalAmount: itsum,
      });
    }
  }


  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  onChangeSurname(e) {
    this.setState({
      surname: e.target.value,
    });
  }

  onChangeTelephone(e) {
    this.setState({
      telephone: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeAdress(e) {
    this.setState({
      adress: e.target.value,
    });
  }
 
  saveOrder(e) {
    e.preventDefault();
//    alert('£££££')
    //console.log('£££££')

    var data = {
      user: this.state.currentUser.id,
      firstname: this.state.firstname,
      surname: this.state.surname,
      telephone: this.state.telephone,
      email: this.state.email,
      totalAmount: this.state.totalAmount,


      goods: this.state.rowData,
    };

    UserOrderDataService.create(data)
      .then((response) => {
      })
      .catch((e) => {
        console.log(e);
      });


  }

  render() {

    const { rowData, columnDefs , totalAmount} = this.state;

    return (

      <div className="container">

        <div className="submit-form-uo">
          <h3> Buyer Order Form </h3>

          <div className="div3-uo" >

            <div className="div5-uo">
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

            <div className="div4-uo">
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


          <div className="div6-uo">

            <div className="div5-uo">
              <label >Telephone</label>
              <input
                type="text"
                className="form-control"
                id="telephone"
                required
                value={this.state.telephone}
                onChange={this.onChangeTelephone}
                name="telephone"
              />
            </div>

            <div className="div4-uo">
              <label htmlFor="title">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="div6-uo">
              <div className="div7-uo">
                <label htmlFor="title">Adress</label>
                <input
                  type="text"
                  className="form-control"
                  id="adress"
                  required
                  value={this.state.adress}
                  onChange={this.onChangeAdress}
                  name="adress"
                />
              <h4> Ordered goods for the total amount = {totalAmount} SEK</h4>
                <div className="ag-theme-alpine" style={{ width: 480, height: 280 }} >

                  < AgGridReact rowHeight={'35'}
                    rowData={rowData}
                    columnDefs={columnDefs}
                  />
                </div>

                <button onClick={this.saveOrder} className="btn btn-success btn-uo ">
                Checkout and pay
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    );
  }
}

export default withRouter(UsersOrder);
