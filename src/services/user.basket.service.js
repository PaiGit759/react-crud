import http from "../http-common";

class UserBasketDataService {


  getAll() {
//        console.log("/tutorials");
       //return http.get("/userbaskets");
       return http.get("/userbaskets");
 
      }



  get(id) {
          console.log("+++++");
    return http.get(`/userbaskets/${id}`);
   
  }

  create(data) {
      console.log("*****&&&&&");
   return http.post("/userbaskets", data);
  }


}

export default new UserBasketDataService();