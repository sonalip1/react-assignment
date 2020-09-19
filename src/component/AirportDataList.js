import React from "react";

class AirportDataList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredOptions: props.options,
      textValue: "",
      expanded: false,
      displayList: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.showList = this.showList.bind(this);
    this.hideList = this.hideList.bind(this);
  }

  componentDidMount = () => {
    if (!this.state.displayList.length) {
      this.fetchDisplayList();
    }
  };

  updateFilter = (evt) => {
    let value = "";

    if (evt) {
      value = evt.target.value;
    }

    let filteredOptions = [];

    for (let i = 0; i < this.props.options.length; i++) {
      const item = this.props.options[i];
      const searchString = item.value.toLowerCase();
      if (searchString.indexOf(value.toLowerCase()) != -1) {
        filteredOptions.push({
          id: item.id,
          value: item.value,
          name: item.name,
          city: item.city,
          country: item.country,
          code: item.code,
        });
      }
    }

    this.setState(
      {
        filteredOptions: filteredOptions,
        textValue: value,
      },
      () => {
        this.fetchDisplayList();
      }
    );
  };

  handleClick = (option) => {
    console.log(option);
    this.props.onSelectUser(option.id);
    this.setState({ textValue: option.value });
    this.hideList();
  };

  showList = () => {
    this.setState({
      expanded: true,
    });
  };

  hideList = () => {
    this.setState({
      expanded: false,
    });
  };

  fetchDisplayList() {
    let displayList = this.state.filteredOptions.map((option) => {
      return (
        <div
          className="row-item"
          data-id={option.id}
          onClick={() => this.handleClick(option)}
        >
          <div className="cell-item">
            <span>
              <span className="city">{option.city},</span>
              <span className="country">{option.country}</span>
            </span>
            <span className="name">{option.name}</span>
          </div>
          <div className="cell-item right">
            <span>{option.code}</span>
          </div>
        </div>
      );
    });
    this.setState({
      displayList: displayList,
    });
  }

  render() {
    const { displayList, textValue, expanded } = this.state;
    return (
      <div className="container">
        <input
          className="search"
          type="text"
          value={textValue}
          onChange={this.updateFilter}
          onFocus={this.showList}
          onBlur={this.hideList}
          placeholder="Choose/Search Airport"
        />
        <span className="icon" onClick={this.showList}>
          <i class="fa fa-caret-down"></i>
        </span>
        <div className="list-container">{expanded && displayList}</div>
      </div>
    );
  }
}

export default AirportDataList;
