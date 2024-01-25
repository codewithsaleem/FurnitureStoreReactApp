import React, { Component } from "react";
import http from "./httpServiceFurnitureStore.js";
import auth from "./httpServiceFurnitureStoreAuth.js"
import { Link } from "react-router-dom";
class Cart extends Component {
    state = {
        orders: [],
    }

    handlePlaceOrder = () => {
        this.props.history.push("/placeOrder")
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
    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/cart");
    }
    handleAddToCart = (prodCode) => {
        let { orders } = this.state;
        let fnd = orders.find((ele) => ele.prodCode === prodCode);
        this.postData("/cart", fnd)
    };

    async deleteData(url) {
        let response = await http.deleteApi(url);
        let { data } = response;
        this.props.history.push("/cart");
    }

    handleRemoveFromCart = (prodCode) => {
        let { orders } = this.state;
        let fnd = orders.find((ele) => ele.prodCode === prodCode);
        this.deleteData(`/cart/${prodCode}`, fnd)
    };

    render() {
        let { orders } = this.state;

        let totalChairQty = orders.reduce((acc, item) => (
            acc + item.ingredients.reduce((qty, curr) => (
                curr.ingName === "Chair" ? curr.qty + qty : qty
            ), 0)
        ), 0);
        let totalDiningTableQty = orders.reduce((acc, item) => (
            acc + item.ingredients.reduce((qty, curr) => (
                curr.ingName === "Dining	Table" ? curr.qty + qty : qty
            ), 0)
        ), 0);
        let totalBenchQty = orders.reduce((acc, item) => (
            acc + item.ingredients.reduce((qty, curr) => (
                curr.ingName === "Bench" ? curr.qty + qty : qty
            ), 0)
        ), 0);
        let totalSofaQty = orders.reduce((acc, item) => (
            acc + item.ingredients.reduce((qty, curr) => (
                curr.ingName === "Sofa" ? curr.qty + qty : qty
            ), 0)
        ), 0);

        return (
            <div className="container">
                <div className="row">
                    {orders.length > 0 ? <h2 className="text-center mt-3" style={{ fontFamily: 'cursive' }}>Products in the Shoppig Cart</h2> :
                        <React.Fragment>
                            <div className="row text-center">
                                <h2 className="mt-3" style={{ fontFamily: 'fantasy' }}>No products in the Shoppig Cart</h2>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwK2M0BuIqDfnC7DZofpHg7obg_gODtNbuCA&usqp=CAU" alt="" style={{ height: '300px', width: '500px', marginLeft: '300px' }} />
                            </div>
                        </React.Fragment>
                    }
                    <React.Fragment>
                        {orders.map((ele, index) => (
                            <div className="row border bg-white mt-2" key={ele.index}>
                                <div className="col-sm-3">
                                    <img className="h-100 w-50 rounded-2 p-2" src={ele.img} alt="Card image cap" />
                                </div>
                                <div className="col-sm-6"> <b>{ele.title}</b> </div>
                                <div className="col-sm-3 mt-2">
                                    <button className="btn btn-success btn-sm m-2" onClick={() => this.handleAddToCart(ele.prodCode)}><i className="fa-solid fa-plus"></i></button>
                                    <button className="btn btn-secondary btn-sm m-2">{ele.qty}</button>
                                    <button className="btn btn-warning btn-sm m-2" onClick={() => this.handleRemoveFromCart(ele.prodCode)}><i className="fa-solid fa-minus"></i></button>
                                </div>
                            </div>
                        ))}
                        {orders.length > 0 &&
                            <React.Fragment>
                                <table class="table text-center mt-3">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Item Name</th>
                                            <th scope="col">Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {totalDiningTableQty > 0 && (
                                            <tr>
                                                <th scope="row">Dining Table</th>
                                                <td>{totalDiningTableQty}</td>
                                            </tr>
                                        )}
                                        {totalChairQty > 0 && (
                                            <tr>
                                                <th scope="row">Chair</th>
                                                <td>{totalChairQty}</td>
                                            </tr>
                                        )}
                                        {totalSofaQty > 0 && (
                                            <tr>
                                                <th scope="row">Sofa</th>
                                                <td>{totalSofaQty}</td>
                                            </tr>
                                        )}
                                        {totalBenchQty > 0 && (
                                            <tr>
                                                <th scope="row">Bench</th>
                                                <td>{totalBenchQty}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div className="row">
                                    <div className="col-10"></div>
                                    <div className="col-2">
                                        <div className="row">
                                            <button className="btn btn-warning font-weight-bold" onClick={() => this.handlePlaceOrder()}><i className="fa-sharp fa-solid text-primary fa-location-dot mr-2"></i>PLACE ORDER</button>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        }

                    </React.Fragment>
                </div>
            </div>

        )
    }
}
export default Cart;