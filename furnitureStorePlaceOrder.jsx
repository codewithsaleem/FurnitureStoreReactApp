import React, { Component } from "react";
import http from "./httpServiceEcommerce.js";
import auth from "./httpServiceEcommerceAuth.js";
class PlaceOrder extends Component {
    state = {
        newCustomer: { name: "", address: "", mobile: "" },
        errors: {},
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.newCustomer[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { newCustomer } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            // this.postData("/placeOrder", newCustomer);
            this.props.history.push("/thxdone");
        } else {
            let s1 = { ...this.state };
            s1.errors = error;
            this.setState(s1);
        }
    }

    isValid = (error) => {
        let key = Object.keys(error);
        let count = key.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0);
        return count === 0;
    }

    validateAll = () => {
        let { name, address, mobile } = this.state.newCustomer;
        let errors = {};
        errors.name = this.handleName(name);
        errors.address = this.handleAddress(address);
        errors.mobile = this.handleMobile(mobile);
        return errors;
    }

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "name": s1.errors.name = this.handleName(input.value); break;
            case "address": s1.errors.address = this.handleAddress(input.value); break;
            case "mobile": s1.errors.mobile = this.handleMobile(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    handleName = (name) => !name ? "Name is required" : "";
    handleAddress = (address) => !address ? "Address is required" : "";
    handleMobile = (mobile) => !mobile ? "Mobile is required" : "";

    render() {
        let { name, address, mobile } = this.state.newCustomer;
        let { errors } = this.state;

        return (
            <div className="row text-white" style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWTT1w03AE0u4pM4V_WIg8As4dzdiVzr74dQ&usqp=CAU")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>

                <div className="col-sm-3"></div>
                <div className="col-sm-6 text-white">
                    <form>
                        <h2 className="text-center mt-3">Place Order</h2>
                        <div className="form-group">
                            <label><b>Name</b></label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Enter Name"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.name && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label><b>Address</b></label>
                            <input
                                className="form-control"
                                type="text"
                                name="address"
                                value={address}
                                placeholder="Enter Address"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.address && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.address}</span>}
                        </div>
                        <div className="form-group">
                            <label><b>Mobile Number</b></label>
                            <input
                                className="form-control"
                                type="text"
                                name="mobile"
                                value={mobile}
                                placeholder="Enter Mobile"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.mobile && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.mobile}</span>}
                        </div>
                        <div className="form-group mt-2">
                            <button className="form-control btn btn-primary mt-3" onClick={this.handleSubmit}>Submit Details</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-3"></div>

            </div>
        )
    }
}
export default PlaceOrder;