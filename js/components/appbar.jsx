import React from 'react';
import {Navbar, NavItem, Input, Button, Icon} from "react-materialize";

const AppBar = (props) => (
  <div>
    <Navbar fixed className="brown navbar-fixed">
      <div className="search-box">
        <input className="search" name="searchedText" value={props.searchedText} onChange={props.changeHandler}
        placeholder="Search Beer..." onKeyPress={props.handleKeyPress} id="search"/>
        <Button onClick={props.searchBeers} className="amber darken-2">Search</Button>
        <Button waves="light" className="btn sortBtn" onClick={props.sortingBeers}>Sort Beers A - Z</Button>
      </div>
    </Navbar>
    <div className = "progress-container">
      <div className = "progress-bar" id = "progressBar"></div>
    </div>
  </div>
);

export default AppBar;
