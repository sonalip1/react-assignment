import React from "react";
import "./styles.css";
import data from "../airports.json";
import AirportDataList from "./AirportDataList";

class AirportChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: data,
      showDataList: false,
    };
  }
  handleBtnClick = () => {
    this.setState({
      showDataList: !this.state.showDataList,
    });
  };
  onSelectUser = (id) => {
    console.log(id);
  };
  render() {
    const { rawData, showDataList } = this.state;
    const optionsList = rawData.map((item) => ({
      id: item.code,
      value: item.name + "," + item.city + "," + item.country,
      name: item.name,
      code: item.code,
      city: item.city,
      country: item.country,
    }));
    return (
      <div className="main-container">
        <button className="btn" onClick={this.handleBtnClick}>
          Airport Chooser
        </button>
        {showDataList && (
          <AirportDataList
            options={optionsList}
            onSelectUser={this.onSelectUser}
          />
        )}
      </div>
    );
  }
}

export default AirportChooser;
