import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Tag from "./tagInput/tag";
import * as TagActions from '../../redux/actions/tagActions';

class TagInput extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: "",
			activeInput:false,
			lastTyped: Date.now()
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.toggleInput = this.toggleInput.bind(this);
		this.addTag = this.addTag.bind(this);
		this.selectTag = this.selectTag.bind(this);
	}

	toggleInput(){
		this.setState({ activeInput: !this.state.activeInput, name: ""});
		this.props.actions.tag.resetTags();
	}

	handleNameChange(e){
		var thisComponent = this;
		thisComponent.setState({name: e.target.value, lastTyped: Date.now()});

		setTimeout(()=>{
			var last = thisComponent.state.lastTyped;

			if ((Date.now() - last)>=1000) {
				thisComponent.getTagSuggestions();
			}
		},1000);
	}

	addTag(){
		if(this.state.name == ""){  return; }
		this.props.actions.tag.addNewTag(this.state.name);
	}

	selectTag(item){
		this.props.actions.tag.toggleSelectTag(item);
	}

	getTagSuggestions(){
		if(this.state.name == ""){  return; }
		this.props.actions.tag.getTagSuggestions(this.state.name);
	}

	render() {
		const { tags } = this.props;

		return (
			<div className="tagInput">
				{
					tags.selectedTags.map((item, i) => {
						return (<Tag tag={item} key={i} index={i}/>);
					})
				}

				<div className={`tagInput__input--${this.state.activeInput ? "active": "disabled"}`}>
					<div className="tagInput__input__name">
						<input
							type="text"
							className="text_input_2 f_input_1"
							value={this.state.name}
							onChange={this.handleNameChange} 
						/>
					</div>

					<div className="tagInput__input__buttons">

						<div className="tagInput__input__add">
							<div className="iconBtn--normal" onClick={this.toggleInput}>
								<svg className="icon">
									<use xlinkHref="#add" />
								</svg>
							</div>
						</div>
                        
                       
						<div className="tagInput__input__cancel">
							<div className="iconBtn--normal" onClick={this.toggleInput}>
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>

						<div className="tagInput__input__confirm">
							<div className="iconBtn--normal" onClick={this.addTag}>
								<svg className="icon">
									<use xlinkHref="#check" />
								</svg>
							</div>
						</div>

					</div>

				</div>

				<div className="tagInput__suggestions">
					{
						tags.suggestedTags.map((item, i) => {
							return (
								<div
									className="tagS f_normal"
									key={i}
									onClick={()=>{this.selectTag(item);}}
								>
								{"#" + item.name}
								</div>);
						})
					}
				</div>
			</div>
		);
	}
}

TagInput.propTypes = {
	actions: PropTypes.object.isRequired,
	tags: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	tags: state.tagReducer
});

const mapDispatchToProps = (dispatch) => ({
	actions: {
		tag: bindActionCreators(TagActions, dispatch)
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(TagInput);
