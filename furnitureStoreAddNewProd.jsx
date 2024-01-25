import React, { Component } from "react";
import http from "./httpServiceFurnitureStore.js";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";

const validationProductItems = yup.object().shape({
    prodCode: yup.string().required("Prodcode is required"),
    title: yup.string().required("Title is required"),
    img: yup.string().required("Image URL is required"),
    category: yup.string().required("Category is required"),
    desc: yup.array().required("Description is required"),
    ingredients: yup.array().of(
        yup.object().shape({
            ingName: yup.string().required("Item Name is required"),
            qty: yup.number().required("Quantity is required")
        })
    )
})

class AddForm extends Component {
    state = {
        cart: []
    }
    async fetchData1() {
        let response = await http.get("/products");
        let { data } = response;
        this.setState({ cart: data });
    }
    componentDidMount() {
        this.fetchData1();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData1();
        }
    }
    render() {
        let { index } = this.props.match.params;
        console.log(this.state.cart)
        let cart1 = index ? this.state.cart[+index] : {}

        if (!cart1) {
            return <div>Loading...</div>; // or display an error message
        }
        let uniqueCategory = ["Dining", "Bedroom", "Drawing", "Study"];

        return (
            <Formik initialValues={{
                prodCode: cart1.prodCode || "",
                title: cart1.title || "",
                img: cart1.img || "",
                category: cart1.category || "",
                desc: cart1.desc || [],
                ingredients: cart1.ingredients || [],
            }}
                validationSchema={validationProductItems}
                onSubmit={(values) => {
                    this.props.onSubmitAdd(values, index);
                    // alert("Please ensure that all the values have been entered properly");
                    this.props.history.push("/");
                }}
            >
                {({ values, errors }) => (
                    <Form>
                        <div className="container mt-3">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="form-group">
                                        <label>Product Code</label>
                                        <Field name="prodCode" type="text" className="form-control" />
                                        <div className="text-danger"><ErrorMessage name="prodCode" /></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <Field name="title" type="text" className="form-control" />
                                        <div className="text-danger"><ErrorMessage name="title" /></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <Field name="img" type="text" className="form-control" />
                                        <div className="text-danger"><ErrorMessage name="img" /></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <Field name="category" as="select" className="form-control">
                                            <option value="">Select Category</option>
                                            {uniqueCategory.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Field>
                                        <div className="text-danger"><ErrorMessage name="category" /></div>
                                    </div>
                                    <FieldArray
                                        name="desc"
                                        render={(arrayHelpers) => (
                                            <div>
                                                {values.desc.map((ele, index) => (
                                                    <div className="row mb-2" key={index}>
                                                        <div className="col-sm-8">
                                                            <Field name={`desc[${index}]`} type="text" placeholder={`Line${index + 1}`} className="form-control" />
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <button type="button" className="btn btn-danger" onClick={() => arrayHelpers.remove(index)}>X</button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" className="btn btn-secondary mb-2" onClick={() => arrayHelpers.push("")}>Add Description</button>
                                                <div className="text-danger">
                                                    {typeof errors.desc === "string" ? errors.desc : errors.desc ? errors.desc.reduce((acc, curr) => (acc ? acc : curr ? curr : acc), "") : ""}
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <FieldArray
                                        name="ingredients"
                                        render={(arrayHelpers) => (
                                            <div>
                                                {values.ingredients.map((ele, index) => (
                                                    <div className="row mb-2" key={index}>
                                                        <div className="col-sm-6">
                                                            <Field name={`ingredients[${index}].ingName`} type="text" placeholder="Item Name" className="form-control" />
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <Field name={`ingredients[${index}].qty`} type="number" placeholder="Qty" className="form-control" />
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <button type="button" className="btn btn-danger" onClick={() => arrayHelpers.remove(index)}>X</button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" className="btn btn-secondary mb-2" onClick={() => arrayHelpers.push("")}>Add Items shipped with product</button>
                                                <div className="text-danger">
                                                    {typeof errors.ingredients === "string" ? errors.ingredients : errors.ingredients ? errors.ingredients.reduce((acc, curr) => (acc ? acc : curr ? curr.ingName || curr.qty : acc), "") : ""}
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <div className="form-group">
                                        <button className="btn btn-success mr-2" type="submit">Save</button>
                                    </div>
                                </div>

                                <div className="col-sm-4 mt-4">
                                    {values.img && <img className="card-img-top" src={values.img} alt="Card image cap" style={{ width: "100%", height: "400px" }} />}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }
}
export default AddForm;