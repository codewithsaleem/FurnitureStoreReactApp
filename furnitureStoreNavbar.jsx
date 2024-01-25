import React, { Component } from "react";
import http from "./httpServiceFurnitureStore.js";
import auth from "./httpServiceFurnitureStoreAuth.js";
import { Link } from "react-router-dom";
class Navbar extends Component {
    state = {
        orders: []
    }
    async fetchData() {
        let response = await http.get("/cart");
        let { data } = response;
        this.setState({ orders: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
        }
    }
    render() {
        let user = auth.getUser();
        let { orders } = this.state;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
                <Link to="/" className="navbar-brand ms-3 text-dark">Furniture Store</Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-dark">Products</Link>
                    </li>
                    {user && user.role === "user" && (
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link text-dark">Cart {orders.length > 0 && <b className="bg-warning text-primary bg-white rounded-3 p-1">{orders.length}</b>}</Link>
                        </li>
                    )}
                    {user && user.role === "admin" && (
                        <li className="nav-item">
                            <Link to="/addNewProduct" className="nav-link text-dark">Add New Product</Link>
                        </li>
                    )}
                </ul>

                <ul className="navbar-nav ml-auto me-3">
                    {!user && <li className="nav-item">
                        <Link to="/login" className="nav-link text-dark">Login</Link>
                    </li>}
                    {!user && <li className="nav-item">
                        <Link to="/register" className="nav-link text-dark">Register</Link>
                    </li>}
                    {user && <li className="nav-item">
                        <Link to="/logout" className="nav-link text-dark">Logout</Link>
                    </li>}
                </ul>
            </nav>
        )
    }
}
export default Navbar;