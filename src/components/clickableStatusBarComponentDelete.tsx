import React, { useState } from 'react';
import { GroupCellRenderer, IStatusPanelParams } from 'ag-grid-community';

//import { useParams, Link } from "react-router-dom";

import UserBasketDataService from "../services/user.basket.service";
import { withRouter } from "../common/with-router";

import BoardUser from "./board-user.component";

import { useParams, Link } from "react-router-dom";

export default (props: IStatusPanelParams) => {

  const onClick = () => {
    let userBasket = props.api.getSelectedRows();

//    console.log('+++++',props.api)

    const result = window.confirm('Are you sure you want to delete the selected?');
  //  alert(isAdmin);
  
  if (result)
{
  const arrayId = userBasket.map((elem) => {
      let vvv = { id: elem._id}
      return vvv;
    });

 arrayId.forEach(element => {
  UserBasketDataService.delete(element.id);
}); 

window.location.reload()

}

//    return '';

  };

  const style = {
    padding: 5,
    margin: 5,
    color: 'red',
    background: 'lightgray',
    fontsize: 'bold',
  };

  return (
    <div>

        <input
          style={style}
          type="button"
          onClick={onClick}
          value="Delete Selected"
        />
  
    </div>
  );
};


//  state={useData}
//    <Link to="/addorder" >