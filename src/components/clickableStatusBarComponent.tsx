import React, { useState } from 'react';
import { GroupCellRenderer, IStatusPanelParams } from 'ag-grid-community';

import { useParams, Link } from "react-router-dom";


export default (props: IStatusPanelParams) => {

  const [useData] = useState('');

  const onClick = () => {

    let userBasket = props.api.getSelectedRows().map((userBasket) => userBasket  )  ;

    userBasket.forEach((userBasket)=>userBasket.goods.img = '');
  
  let prstr = JSON.stringify(userBasket);

  localStorage.setItem('useData',prstr);    
    return '';
  };

  const style = {
    padding: 5,
    margin: 5,
    color: 'green',
    background: 'lightgray',
    fontsize: 'bold',
  };

  return (
    <div>
      <Link to="/addorder" >
        <input
          style={style}
          type="button"
          onClick={onClick}
          value="Click Me For checkout"
        />
      </Link>
    </div>
  );
};

