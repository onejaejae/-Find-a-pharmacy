import React from "react";
import axios from "axios";
import MapCreate from "./MapCreate";
import './Loading.css';
import {Helmet} from "react-helmet";

class Map extends React.Component {
  constructor(props){  // MainPage 함수 (파라미터) , 클래스 (생성자) 에서 params를 받을 수 있다!!
    super(props);
    const { params } = props.match;
    
    var id = params.id;
  
    this.state = {
      id : id,
      loading : false,
      AnimalPharmacyData: [
        {
          title: null,
          lat: null,
          lng: null,
          tel : null,
          adress : null,
          roadAdress : null
        }
      ]
    };
  
  }
  
  getData = (location) => {
    for(var i=0; i<location.length; i++){
    
      const {AnimalPharmacyData} = this.state; // for문안에 넣어서 해결
      if(location[i].BSN_STATE_NM !== '폐업'){
        this.setState({
          AnimalPharmacyData : AnimalPharmacyData.concat({
            title : location[i].BIZPLC_NM,
            lat : location[i].REFINE_WGS84_LAT,
            lng : location[i].REFINE_WGS84_LOGT,
            tel : location[i].LOCPLC_FACLT_TELNO,
            adress : location[i].REFINE_LOTNO_ADDR,
            roadAdress : location[i].REFINE_ROADNM_ADDR
          })
        })
      }
      if(i === location.length-1){
       
        this.setState({
          loading : true
        })
      }
    }
  }
 
  getLocation = async (id) => {
    const {data : { AnimalPharmacy }} = await axios.get(`https://openapi.gg.go.kr/AnimalPharmacy?KEY=33619ed306864d7c891cd56461d49da4&Type=json&pIndex=1&pSize=400&SIGUN_CD=${id}`); 
    const location = AnimalPharmacy[1].row
  
   
    this.getData(location);
  
     
};

  componentDidMount() {
    const { id } = this.state;
   
      this.getLocation(id);
    
  }

  render() {
    const { AnimalPharmacyData, loading } = this.state;
    const {information} = this.props;
   
   
    return (
      loading ? <MapCreate AnimalPharmacyData={AnimalPharmacyData} information={information} />
        :
        <div className="loading-container">
          <Helmet>
            <style>{'body { background-color: rgba(152, 194, 142, 0.7); }'}</style>
          </Helmet>
          <div className="loading"></div>
          <div id="loading-text">loading</div>
        </div> //비동기이므로 loading을 써야함

    )
  }
}

export default Map;
