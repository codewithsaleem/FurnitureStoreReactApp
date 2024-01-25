import React, { Component } from "react";
class Thx extends Component {
    handleShopNow = () => {
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 text-center m-2">
                    <h3 className="text-secondary" style={{fontFamily: 'fantasy'}}>Thanks for shopping here.Have a nice day...<i className="fa-sharp fa-solid fa-face-smile"></i></h3>
                    <img src="https://i.ibb.co/NFHkG3n/d438a32e-765a-4d8b-b4a6-520b560971e8.png" alt="" style={{ width: '400px', height: '400px' }} />
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="form-group mt-3">
                                <button className="form-control btn btn-primary font-weight-bold" onClick={() => this.handleShopNow()}><i className="mr-2 fa-solid fa-cart-shopping"></i>SHOP NOW</button>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        )
    }
}
export default Thx;