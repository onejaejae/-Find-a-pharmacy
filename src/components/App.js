
import React from 'react';
import Router from './Routers';

class App extends React.Component {
 
  render(){
  
    const information = [
    {id: "41820", name: "가평군"},
    {id: "41280", name: "고양시"},
    {id: "41290", name: "과천시"},
    {id: "41210", name: "광명시"},
    {id: "41610", name: "광주시"},
    {id: "41310", name: "구리시"},
    {id: "41410", name: "군포시"},
    {id: "41570", name: "김포시"},
    {id: "41360", name: "남양주시"},
    {id: "41250", name: "동두천시"},
    {id: "41190", name: "부천시"},
    {id: "41130", name: "성남시"},
    {id: "41110", name: "수원시"},
    {id: "41390", name: "시흥시"},
    {id: "41270", name: "안산시"},
    {id: "41550", name: "안성시"},
    {id: "41170", name: "안양시"},
    {id: "41630", name: "양주시"},
    {id: "41830", name: "양평군"},
    {id: "41670", name: "여주시"},
    {id: "41800", name: "연천군"},
    {id: "41370", name: "오산시"},
    {id: "41460", name: "용인시"},
    {id: "41430", name: "의왕시"},
    {id: "41150", name: "의정부시"},
    {id: "41500", name: "이천시"},
    {id: "41480", name: "파주시"},
    {id: "41220", name: "평택시"},
    {id: "41650", name: "포천시"},
    {id: "41450", name: "하남시"},
    {id: "41590", name: "화성시"}
  ]
    return (
    <Router information={information} />

    )
  }
}

export default App;


