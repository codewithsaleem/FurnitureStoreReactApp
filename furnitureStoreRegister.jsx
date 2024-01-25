import React, { Component } from "react";
import http from "./httpServiceFlipkart.js";
class Register extends Component {
    state = {
        newCustomer: { name: "", email: "", password: "", role: "" },
        errors: {},
        errMsgs: ""
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.newCustomer[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    handleRegister = (e) => {
        e.preventDefault();
        let { newCustomer } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            this.props.onSubmitt(newCustomer);
        }
    }

    isValid = (error) => {
        let key = Object.keys(error);
        let count = key.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0);
        return count === 0;
    }

    validateAll = () => {
        let { name, email, password, role } = this.state.newCustomer;
        let errors = {};
        errors.name = this.handleName(name);
        errors.email = this.handleEmail(email);
        errors.password = this.handlePassword(password);
        errors.role = this.handleUser(role);
        return errors;
    }

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "name": s1.errors.name = this.handleName(input.value); break;
            case "email": s1.errors.email = this.handleEmail(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            case "role": s1.errors.role = this.handleUser(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    handleName = (name) => !name ? "Name is required" : "";
    handleEmail = (email) => !email ? "Email is required" : "";
    handlePassword = (password) => !password ? "Password is required" : "";
    handleUser = (role) => !role ? "Role is required" : "";

    render() {
        let { name, email, password, role } = this.state.newCustomer;
        let { errors } = this.state;

        return (
            <div className="row text-white" style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnm86ajTjoL4ZpppX94CloUoKlQ0ls4G26Gw&usqp=CAU")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>

                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <form>
                        <h2 className="text-center mt-3">Register</h2>
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
                            <label><b>Email</b></label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Enter Email"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.email && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label><b>Password</b></label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.password && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label><b>Role</b></label> <br />
                            {errors.role && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.role}</span>}
                            <input
                                className="form-check-input ml-1"
                                type="radio"
                                name="role"
                                value="user"
                                checked={role==="user"}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            <label className="ml-4">User</label> <br />
                            <input
                                className="form-check-input ml-1"
                                type="radio"
                                name="role"
                                value="admin"
                                checked={role==="admin"}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            <label className="ml-4">Admin</label>
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-primary mt-3" onClick={this.handleRegister}>Register</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-3"></div>

            </div>
        )
    }
}
export default Register;