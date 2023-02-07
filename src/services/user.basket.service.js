import http from "../http-common";

class UserBasketDataService {


  getAll() {
//        console.log("/tutorials");
       //return http.get("/userbaskets");
       return http.get("/userbaskets");
 
      }



  get(id) {
//          console.log(`+++++${id}`);
    return http.get(`/userbaskets/${id}`);
   
  }

  create(data) {
//      console.log("*****&&&&&");
   return http.post("/userbaskets", data);
  }

  delete(id) {
//         console.log("*****&&&&&",id);
    return http.delete(`/userbaskets/${id}`);
  }


}

export default new UserBasketDataService();