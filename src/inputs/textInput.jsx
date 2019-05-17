import React, { Component } from 'react';
import PropTypes from "prop-types";

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultStatus: props.status,
            status: props.status,
            errorText: "",
            inputValue: props.config.inputValue || "",
            inputLength: props.config.length || 999
        }

        this.textInputRef = React.createRef();
        this.handleValueChange = this.handleValueChange.bind(this);
        this.focus = this.focus.bind(this);
        this.getStatusText = this.getStatusText.bind(this);
    }

    componentDidMount() {
        const { parent } = this.props;
        parent.state.textInputs.push(this)
        parent.setState({
            textInputs: parent.state.textInputs
        });
    }

    componentDidUpdate() {
        const { status } = this.state;
        if ([1,2].includes(status)) {
            var component = this;
            setTimeout(() => {
                component.setState(state => ({ status: state.defaultStatus }));
            }, 3000);
        }
    }

    handleValueChange = e => {
        const { inputLength } = this.state;
        e.target ? this.setState({
            inputValue: e.target.value.substr(0, inputLength)
        }) : null;
    };

    focus = () => this.textInputRef.current.focus();

    setFloatingLabel = () => {
        const { config } = this.props;
        if (config.floatingLabel){
            return (
                <label htmlFor={config.label.replace(" ","")}>{config.label}</label>
            );
        }
    }

    getStatusText = () => {
        const { status } = this.state;
        switch (status) {
            case 1: return "fail";
            case 2: return "success";
            case 3: return "loading";
            case 4: return "warning";
            case 5: return "danger";
            default: return "normal"; 
        }
    }

    render() {
        const { inputValue, errorText } = this.state;
        const { config } = this.props;

        var errorClass = `f_comment_1 ${config.type}__error--`;
        var commentClass = `f_comment_1 ${config.type}__comment--`;

        var mainClass = `${config.type}--${this.getStatusText()}`;
        mainClass += config.floatingLabel ? " f_input_1 has-float-label" : "";

        return (    
            <div className={mainClass} >
                <div className={`${config.type}__label f_label_1` }>{config.label}</div>

                <input 
                    id={config.label.replace(" ","")}
                    ref={this.textInputRef}
                    type="text" 
                    className="f_input_1" 
                    value={inputValue} 
                    onChange={this.handleValueChange}
                    placeholder={config.placeholder || ""}
                    />
                
                {this.setFloatingLabel()}

                <div className={`${commentClass}${errorText ? "disabled" : "active"}`}>{config.comment}</div>
                <div className={`${errorClass}${errorText ? "active" : 'disabled'}`}>{errorText}</div>

            </div>
        );
    }
}

TextInput.propTypes = {
    config: PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string,
        floatingLabel: PropTypes.bool,
        comment: PropTypes.string,
        inputValue: PropTypes.string,
        length: PropTypes.number
    }).isRequired,
    status: PropTypes.number,
    parent: PropTypes.shape({
        state: PropTypes.instanceOf(Object).isRequired,
        setState: PropTypes.func.isRequired
    }).isRequired
}

TextInput.defaultProps = {
    status: 0
}

export default TextInput;
