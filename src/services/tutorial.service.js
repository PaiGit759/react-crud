import http from "../http-common";

class TutorialDataService {
  getAll() {
//    console.log(http.get("/tutorials"));
   // return http.get("/tutorials");
    return http.get("https://practice-online-store-1-production.up.railway.app/api/tutorials");
    //https://practice-online-store-1-production.up.railway.app/api/tutorials?title=5
  }

  get(id) {
  //  console.log(`/tutorials/${id}*****`)
    return http.get(`/tutorials/${id}`);
   
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
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
}

export default new TutorialDataService();