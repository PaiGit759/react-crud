import React, { useState } from 'react';
import { GroupCellRenderer, IStatusPanelParams } from 'ag-grid-community';

//import { useParams, Link } from "react-router-dom";

import UserBasketDataService from "../services/user.basket.service";
import { withRouter } from "../common/with-router";

export default (props: IStatusPanelParams) => {

  const [useData] = useState('');

  const onClick = () => {
    let userBasket = props.api.getSelectedRows();
    alert('BBBBB');
    
    const arrayId = userBasket.map((elem) => {
      let vvv = { id: elem._id}
      return vvv;
    });

  //  console.log('BBBBB',arrayId);

  UserBasketDataService.delete(arrayId[0].id);

    return '';
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