import http from "../http-common";

class UserOrderDataService {


//  getAll() {
//        console.log("/tutorials");
       //return http.get("/userbaskets");
 //      return http.get("/userorders");
//       }



  get(id) {
//          console.log(`+++++${id}`);
   return http.get(`/userorders/${id}`);
  }

  create(data) {
//      console.log("*****&&&&&", data);
   return http.post("/userorders", data);
  }


}

export default new UserOrderDataService();