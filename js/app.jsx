import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './components/appbar.jsx';
import Main from './components/main.jsx';
import Modal from './components/modal.jsx';
import {Button} from "react-materialize";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedText: "",
      isData: false,
      datas: null,
      page: 1,
      isMoreData: true,
      isModalOpen: false,
      ibuVal: null
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
  window.addEventListener('scroll', this.progressBarScroll);
  this.firstBeers();
  };

  componentWillUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
  window.removeEventListener('scroll', this.progressBarScroll);
  };

  changeHandler = (event) =>
    this.setState({ [event.target.name]: event.target.value })

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.searchBeers();
    }
  }

  handleScroll() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (Math.ceil(winScroll) >= Math.ceil(height)) {
        let page = this.state.page
        page = page + 1
        this.setState({
          page
        })
        this.moreBeers();
      }
  }

  progressBarScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
      scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
  }

  // Search method
  searchBeers = () => {
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${this.state.searchedText}&page=${this.state.page}&per_page=20`).then(response =>{
      if(response && response.ok){
        return response.json();
      }else{
        console.log('Błąd połączenia!');
      }
    }).then(data => {
      this.setState({
        isData: true,
        datas: data,
        page: 1
      })
      window.scrollTo(0, 0);
      window.addEventListener('scroll', this.handleScroll);
    })
  }

  moreBeers = () => {
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${this.state.searchedText}&page=${this.state.page}&per_page=20`).then(response =>{
      if(response && response.ok){
        return response.json();
      }else{
        console.log('Błąd połączenia!');
      }
    }).then(data => {
      if (data.length > 0) {
        let addedDatas = this.state.datas.concat(data);
        this.setState({
          datas: addedDatas
        })
      } else {
        this.setState({
          isMoreData: false
        })
        window.removeEventListener('scroll', this.handleScroll);
        return
      }
    })
  }

  firstBeers = () => {
    fetch(`https://api.punkapi.com/v2/beers?brewed_after=06-2015&page=${this.state.page}&per_page=20`).then(response =>{
      if(response && response.ok){
        return response.json();
      }else{
        console.log('Błąd połączenia!');
      }
    }).then(data => {
      this.setState({
        isData: true,
        datas: data
      })
      window.removeEventListener('scroll', this.handleScroll);
    })
  }

  sortingBeers = (event) => {
    event.preventDefault();
    if (this.state.datas) {
      let datas = this.state.datas.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;
        return 0;
      });
      this.setState({
        datas
      });
      window.scrollTo(0, 0);
    }
  }

  openModal = (name, tagline, img, desc, tips, ibu, abv) => {
    fetch(`https://api.punkapi.com/v2/beers?ibu_gt=${Math.ceil(ibu) - 5}&ibu_lt=${Math.ceil(ibu) + 5}&per_page=3`).then(response =>{
      if(response && response.ok){
        return response.json();
      }else{
        console.log('Błąd połączenia!');
      }
    }).then(data => {
      this.setState({
        ibuVal: data,
        isModalOpen: true
      }, () => {
        document.getElementById("name").innerHTML= name;
        document.getElementById("tag").innerHTML= tagline;
        document.getElementById("img").src= img;
        document.getElementById("desc").innerHTML= `Description: ${desc}`;
        document.getElementById("tips").innerHTML= `Brewer's tips: ${tips}`;
        document.getElementById("ibu").innerHTML= `ibu: ${ibu}`;
        if (ibu !== null) {
          document.getElementById("ibu-sim").innerHTML= `Beers with similar ibu: ${this.state.ibuVal[0].name}, ${this.state.ibuVal[1].name}, ${this.state.ibuVal[2].name}`;
        }
        document.getElementById("abv").innerHTML= `abv: ${abv}`;
          })
    });
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div>
        <div>
          <AppBar changeHandler = {this.changeHandler} searchedText = {this.state.searchedText} handleKeyPress = {this.handleKeyPress} searchBeers = {this.searchBeers} sortingBeers = {this.sortingBeers}/>
          <Main isData = {this.state.isData} datas = {this.state.datas} page = {this.state.page} openModal = {this.openModal} isMoreData = {this.state.isMoreData}/>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <h5 id="name"></h5>
            <p id="tag"></p>
            <p id="desc"></p>
            <p id="tips"></p>
            <strong><span id="ibu"></span></strong>
            <strong><p id="ibu-sim"></p></strong>
            <strong><p id="abv"></p></strong>
            <img id="img" className="modal-image" ></img>
            <p><Button waves="light" className="btn" onClick={() => this.closeModal()}><strong>Close</strong></Button></p>
          </Modal>
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
});
