import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import http from "./httpServiceFurnitureStore.js";
import auth from "./httpServiceFurnitureStoreAuth.js";

import Navbar from "./furnitureStoreNavbar";
import Products from "./furnitureStoreAllProducts";
import LoginForm from "./furnitureStoreLogin";
import Register from "./furnitureStoreRegister.jsx";
import Logout from "./furnitureStoreLogout.jsx";
import Cart from "./furnitureStoreCart.jsx";
import AddForm from "./furnitureStoreAddNewProd.jsx";
import PlaceOrder from "./furnitureStorePlaceOrder.jsx";
import Thx from "./furnitureStoreThxPage.jsx";
class MainComponent extends Component {

    async login(url, obj) {
        try {
            let response = await http.post(url, obj);
            let { data } = response;
            auth.login(data);
            window.location = "/";
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404) {
                alert(ex.response.data);
            }
        }
    }
    handleSubmit = (values) => {
        this.login("/login", values);
    }

    async register(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        window.location = "/login";
    }
    handleRegister = (values) => {
        this.register("/register", values);
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        window.location = "/";
    }
    async putData(url, obj) {
        let response = await http.put(url, obj);
        let { data } = response;
        window.location = "/";
    }
    handleSubmitAddForm = (product, index = "") => {
        index ? this.putData(`/products/${index}`, product)
            : this.postData("/allProducts", product);
    }

    render() {

        return (
            <React.Fragment>
                <Navbar />

                <Switch>
                    <Route
                        path="/thxdone"
                        render={(props) => (<Thx {...props} />)}
                    />
                    <Route
                        path="/placeOrder"
                        render={(props) => (<PlaceOrder {...props} />)}
                    />
                    <Route
                        path="/addNewProduct"
                        render={(props) => (<AddForm {...props} onSubmitAdd={this.handleSubmitAddForm} />)}
                    />
                    <Route
                        path="/product/:index/edit"
                        render={(props) => (<AddForm {...props} onSubmitAdd={this.handleSubmitAddForm} />)}
                    />
                    <Route
                        path="/cart"
                        render={(props) => (<Cart {...props} />)}
                    />
                    <Route
                        path="/register"
                        render={(props) => (<Register {...props} onSubmitt={this.handleRegister} />)}
                    />
                    <Route
                        path="/login"
                        render={(props) => (<LoginForm {...props} onSubmit={this.handleSubmit} />)}
                    />
                    <Route
                        path="/logout"
                        render={(props) => (<Logout {...props} />)}
                    />
                    <Route
                        path="/"
                        render={(props) => (<Products {...props} />)}
                    />
                </Switch>
            </React.Fragment>
        )
    }
}
export default MainComponent;