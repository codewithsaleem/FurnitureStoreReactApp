import React, { Component } from "react";
class RadioButton extends Component {
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let options = { ...this.props.options };
        options[input.name] = input.value;
        this.props.onOptionChange(options);
    }

    radioButton = (arr, name) => {
        return (
            <div className="row ms-2 mt-2">
                <label className="form-check-label border p-2"><b>Options</b></label>
                {arr.map((ele) => (
                    <div className="border p-2 ">
                        <input
                            type="radio"
                            name={name}
                            value={ele}
                            checked={this.props.options.category === ele}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label ms-2">{ele}</label>
                    </div>
                ))}
            </div>
        )
    }
    render() {
        let categories = ["Dining", "Drawing", "Bedroom", "Study"];

        return (
            <React.Fragment>
                {this.radioButton(categories, "category")}
            </React.Fragment>
        )
    }
}
export default RadioButton;