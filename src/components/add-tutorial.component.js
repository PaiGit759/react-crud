import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import axios from 'axios';


export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);

    this.onFileChange = this.onFileChange.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      img: "",
      discount: 0,
      price: 0,
      published: false,

      submitted: false,
    };
  }

  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });
    // console.log(result_base64); // aGV5IHRoZXJl...
    return result_base64;
  }

  onFileChange(e) {
    this.readFileAsDataURL(e.target.files[0]).then(dataURL => {
      this.setState({ img : dataURL })
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeDiscount(e) {
    this.setState({
      discount: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveTutorial(event) {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append('imgfile', this.state.imgfile)
  //  formData.append('filename', this.state.img)

  //   axios.post("/download", formData, {}).then(res => { console.log(res) })

   // console.log('*****',event);
    var data = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      discount: this.state.discount,
      img: this.state.img,
    };

    TutorialDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          price: response.data.price,
          discount: response.data.discount,
          img: response.data.img,

          submitted: true,
        });
        //console.log(response.data.id);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      img: "",
      discount: 0,
      price: 0,
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Discount</label>
              <input
                type="number"
                className="form-control"
                id="discount"
                required
                value={this.state.discount}
                onChange={this.onChangeDiscount}
                name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="file">file</label>
              <input
                type="file"
                className="form-control"
                id="file"
                name="file"
                onChange={this.onFileChange}
              />
            </div>


            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
