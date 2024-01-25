import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
class LoginForm extends Component {
    render() {
        return (
            <Formik initialValues={{
                email: "",
                password: ""
            }}
                onSubmit={(values) => {
                    this.props.onSubmit(values);
                    // this.props.history.push("/");
                }}
            >
                {() => (
                    <Form>
                        <div className="row" style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/93/29/50/360_F_593295067_2SvEv1yO5R5JZPtnE4AHAun5js3MrTnp.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
                            <React.Fragment>
                                <div className="container mt-4">
                                    <div className="row">
                                        <div className="col-3"></div>
                                        <div className="col-6 text-white">
                                            <h2 className="text-center">Login</h2>

                                            <div className="form-group">
                                                <label>Email</label>
                                                <Field name="email" type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <Field name="password" type="text" className="form-control" />
                                            </div>
                                            <div className="row">
                                                <p className="text-white">If you have not register, then plz <Link to="/register" className="text-info font-weight-bold">Register here</Link></p>
                                            </div>
                                            <div className="form-group text-center">
                                                <button className="btn btn-primary" type="submit">Submit</button>
                                            </div>
                                        </div>
                                        <div className="col-3"></div>
                                    </div>
                                </div>
                            </React.Fragment>
                        </div>
                    </Form>
                )}

            </Formik>
        )
    }
}
export default LoginForm;