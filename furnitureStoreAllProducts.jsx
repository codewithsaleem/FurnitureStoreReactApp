import React, { Component } from "react";
import http from "./httpServiceFurnitureStore.js";
import auth from "./httpServiceFurnitureStoreAuth.js";

import RadioButton from "./furnitureStoreLeftPanel.jsx";
import queryString from "query-string";
class Products extends Component {
    state = {
        products: [],
        newProd: [],
        selectedImageIndex: null, // Track the index of the selected image
    }
    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchStr = this.makeSearchString(queryParams);
        let response = await http.get(`/allProducts?${searchStr}`);
        let { data } = response;
        this.setState({ products: data })
    }
    async fetchData1() {
        let response = await http.get("/products");
        let { data } = response;
        data = data.map((ele) => ({ ...ele, qty: 1 }))
        this.setState({ newProd: data })
    }
    componentDidMount() {
        this.fetchData();
        this.fetchData1();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
            this.fetchData1();
        }
    }

    handleOptionChange = (options) => {
        this.callURL("/allProducts", options);
    }

    callURL = (url, option) => {
        let searchStr = this.makeSearchString(option);
        this.props.history.push({
            pathname: url,
            search: searchStr
        })
    }

    makeSearchString = (option) => {
        console.log("option", option)

        let { category } = option;
        let searchStr = "";
        searchStr = this.addToQuery(searchStr, "category", category);
        return searchStr;
    }

    addToQuery = (str, paramName, paramValue) =>
        paramValue ? str ? `${str}${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;


    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        // this.props.history.push("/");
        this.callURL("/allProducts", obj);
    }

    handleClickImage = (prodCode, index, category) => {
        let fndImage = this.state.products.find((ele) => ele.prodCode === prodCode);

        let options = { category: category };
        this.handleOptionChange(options);

        this.postData("/products", fndImage);
        this.setState({ selectedImageIndex: index });
    }


    handleAddtoCart = (prodCode) => {
        let fndImage = this.state.newProd.find((ele) => ele.prodCode === prodCode);
        this.postData("/cart", fndImage);
    }
    handleEditProduct = (index) => {
        console.log(index)
        this.props.history.push(`/product/${index}/edit`);
    }

    async deleteProd(url, obj) {
        let response = await http.deleteApi(url, obj);
        let { data } = response;
        // window.location = "/";
        this.callURL("/allProducts", obj);

    }
    handleDeleteProduct = (prodCode) => {
        let prod = this.state.newProd.find((ele) => ele.prodCode === prodCode)
        this.deleteProd(`/product/${prodCode}`, prod);
    }

    render() {
        let { products, newProd, selectedImageIndex } = this.state;
        let queryParams = queryString.parse(this.props.location.search);
        let user = auth.getUser();

        return (
            <div className="row" style={{backgroundColor: 'lightgoldenrodyellow'}}>
                <div className="col-2 bg-light">
                    <RadioButton options={queryParams} onOptionChange={this.handleOptionChange} />
                </div>

                <div className="col-6">
                    <div className="row  mt-2">
                        {products.map((ele, index) => (
                            <div className={`col-6 ${index === selectedImageIndex ? 'border rounded-3 border-3 border-primary' : ''}`}>
                                <div className="card mt-2 mb-2" onClick={() => this.handleClickImage(ele.prodCode, index, ele.category)}>
                                    <img className="card-img-top" src={ele.img} alt="Card image cap" style={{ width: "100%", height: "200px" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-4">
                    {newProd.length > 0 ? "" : <h5 className="text-center mt-4">Choose a product!</h5>}
                    <div className="row me-2">
                        {newProd.length > 0 && newProd.map((ele, index) => (
                            <React.Fragment>
                                <div className="row mt-4">
                                    <div className="col-sm-12">
                                        {user && user.role === "admin" && <button className="btn btn-secondary ms-3" onClick={() => this.handleEditProduct(index)}>Edit Product</button>}
                                        {user && user.role === "admin" && <button className="btn btn-secondary ms-3" onClick={() => this.handleDeleteProduct(ele.prodCode)}>Delete Product</button>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mt-4 mb-2">
                                        <img className="card-img-top" src={ele.img} alt="Card image cap" style={{ width: "75%", height: "200px" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{ele.title}</h5>
                                            <p className="card-text">{ele.desc}</p>
                                            <h5 className="card-title mb-2">Items in Product</h5>
                                            {ele.ingredients.map((l1) => (
                                                <React.Fragment>
                                                    <p className="card-text">-{l1.ingName} : {l1.qty}</p>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        {user && user.role === "user" && <button className="btn btn-success" onClick={() => this.handleAddtoCart(ele.prodCode)}>Add to Cart</button>}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default Products;