import http from "../http-common";

class TutorialDataService {
  getAll() {
//    console.log(http.get("/tutorials"));
   return http.get("/tutorials");
    // return http.get("https://practice-online-store-1-production.up.railway.app/api/tutorials");
    //https://practice-online-store-1-production.up.railway.app/api/tutorials?title=5
  }

  get(id) {
  //  console.log("&&&&&");
    return http.get(`/tutorials/${id}`);
   
  }

  create(data) {
//      console.log("&&&&&");
   return http.post("/tutorials", data);
  }

  update(id, data) {
  //  console.log(`/tutorials/${id}*****`);
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }


  createUB(data) {
//    console.log("&&&&&+++++");
 return http.post("/tutorials", data);
}

}

export default new TutorialDataService();