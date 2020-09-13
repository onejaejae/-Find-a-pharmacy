
import React from 'react';
import Router from './Router';
import axios from 'axios';
import {Helmet} from "react-helmet";

class App extends React.Component {
  state = {
    loading : false,
    information : [
      {
        id : null,
        name : null
      }
    ]
  }
 
  getPharmacy = async (n) => {
    const {data : { AnimalPharmacy }}= await axios.get(`https://openapi.gg.go.kr/AnimalPharmacy?KEY=33619ed306864d7c891cd56461d49da4&Type=json&pIndex=${n}&pSize=95`);
    
    const pharmacy = AnimalPharmacy[1].row
    const { information } = this.state;
    
    pharmacy.forEach(element => { 
      for(var i=0; i<information.length; i++){
        if(information[i].name === element.SIGUN_NM){
          return false;
        }
      }

        this.setState({
          information : information.concat({id:element.SIGUN_CD, name : element.SIGUN_NM }) // state 객체 변경시 setState 사용법!!
        });

        if(n === 30){
          this.setState({
            loading : true
          })
        }
    });   
  
  }

  componentDidMount(){
   for(var i=1; i<=30; i++){
      this.getPharmacy(i);
   }
   
  }
  
  render(){
    const { information, loading } = this.state;
    return (
      loading ? <Router information={information} />
        : <div className="loading-container">
          <Helmet>
            <style>{'body { background-color: rgba(152, 194, 142, 0.7); }'}</style>
          </Helmet>
          <div className="loading"></div>
          <div id="loading-text">loading</div>
        </div>
    )
  }
}

export default App;