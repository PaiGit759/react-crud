import React from 'react';
import { GroupCellRenderer, IStatusPanelParams } from 'ag-grid-community';

import { Link } from "react-router-dom";

export default (props: IStatusPanelParams) => {
  const onClick = () => {
    console.log('%%%%%', props.api.getSelectedRows())
    alert('Selected Row Count: ' + props.api.getSelectedRows().length);
  };

  const style = {
    padding: 5,
    margin: 5,
    color:'green',
    background: 'lightgray',
    fontsize : 'bold',
  };

  return (
    <div>
      <Link to={"/addorder"} >
        <input
          style={style}
          type="button"
          value="Click Me For checkout"
        />
      </Link>

    </div>
  );
};



/* 
<input
style={style}
type="button"
onClick={onClick}
value="Click Me For checkout"
/> 


      <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Add
                  </Link>
                </li>
              </div>



*/