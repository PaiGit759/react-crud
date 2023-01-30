import React, { useState } from 'react';
import { GroupCellRenderer, IStatusPanelParams } from 'ag-grid-community';

import { useParams, Link } from "react-router-dom";

export default (props: IStatusPanelParams) => {

  const [useData, setUseData] = useState('');

  //let data = '';

  const onClick = () => {
    //console.log('%%%%%', pr ops.api.getSelectedRows()) useParams
  //  setUseData('ooooo');




//console.log('vvvvv99');

//console.log('vvvvv',prstr);
//alert(prstr);

 //const obj = JSON.parse(prstr);
//     console.log('vvvvv',obj);
    


    //{useParams} = props.api.getSelectedRows();
//    alert(props.api.getSelectedRows()[0].goods.id);
    //let prstr = '';
    // console.log('///___', JSON.stringify(props.api.getSelectedRows())); 
    //   localStorage.setItem('useData', props.api.getSelectedRows()[0].goods.id);

   // prstr = '{"user" : ' + JSON.stringify(props.api.getSelectedRows()[0].user) + '}, "goods" : {[';

    /*     props.api.getSelectedRows().map((userBasket, prstr) => (
    
          console.log('vvvvv',userBasket)
    
            )); */

    let userBasket = props.api.getSelectedRows().map((userBasket) => userBasket  )  ;

/*      userBasket = userBasket.reduce((result, el, index) => {
     // console.log('vvvvv888',el.goods.img);
      //el.goods.img = '';
      result[el.goods.img] = '';
      
      return result;
    }, {});
  */

    userBasket.forEach((userBasket)=>userBasket.goods.img = '');
  //   console.log('vvvvv55',userBasket);

  let prstr = JSON.stringify(userBasket);

  localStorage.setItem('useData',prstr);

  //  prstr = prstr + useGoods + ']}';
   // console.log('vvvvv', prstr);


   //prstr = '{"user" : "63c6e25716e67d5f2896d589"}';//, 
  //  prstr = JSON.stringify(useGoods);
  //  console.log(',,,,,', prstr);

  // prstr =' "goods" :  {[{"id" : "63bc36185dbd081dfdfb1707"},{"id" : "63bac5a9271420b981105df2"}]}';
   
  //  "goods" : {
  //    [{ "id" : "63bc36185dbd081dfdfb1707"}, "qu" : "1"},
  //  { "id" : "63bac5a9271420b981105df2"}, "qu" : "3"}]

    // const obj = JSON.parse(prstr);
    // console.log('vvvvv', obj);
    
    
    return '=====';//props.api.getSelectedRows().toString;
  };

  const style = {
    padding: 5,
    margin: 5,
    color: 'green',
    background: 'lightgray',
    fontsize: 'bold',
  };
  //   const data = onClick;//'YYYYY';
  // console.log('%%%%%9', data)



  return (

    <div>
      <Link to="/addorder" state={useData} >
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



/* 

 <div>
      <Link to="/addorder" state = { UseData } > 
        <input
          style={style}
          type="button"
          onClick={onClick}
          value="Click Me For checkout"
        />
      </Link>

    </div>



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




props.api.getSelectedRows().map((userBaskets, index) => (
console.log('vvvvv',userBaskets)
  ))}


vvvvv {"user" : "63c6e25716e67d5f2896d589"}, 
"goods" : {
  [{ "id" : "63bc36185dbd081dfdfb1707"}, "qu" : "1"},
{ "id" : "63bac5a9271420b981105df2"}, "qu" : "3"}]
}

              */