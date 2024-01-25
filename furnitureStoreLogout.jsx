import React, { Component } from "react";
import http from "./httpServiceFurnitureStore.js";
import auth from "./httpServiceFurnitureStoreAuth.js";

class Logout extends Component {
    async componentDidMount() {
        auth.logout();
        window.location = "/login";
    }
    render() {
        return ""
    }
}
export default Logout;