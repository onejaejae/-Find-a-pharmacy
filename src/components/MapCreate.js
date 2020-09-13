import React from "react";
import './Modal.css'
import './MapCreate.css'
import {Dropdown, DropdownButton, Navbar} from "react-bootstrap";
class MapCreate extends React.Component {
  mapTypeControl = (map) => {
    var MapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(MapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    var zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  }

  displayMaker = (map) => {
    const { AnimalPharmacyData } = this.props;

    AnimalPharmacyData.forEach((element) => {
      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(element.lat, element.lng),
      });

      
      if (element.tel != null && element.tel.length == 7 && !(element.title == "백제약국") && (element.tel.indexOf("-") < 0))  { //1231234
        try {
          if(element.adress != null){
            if((element.adress.indexOf("부천") > 0)){
              element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3);
              element.tel = "032-" + element.tel;
            }
            else if((element.adress.indexOf("광명") > 0) ||(element.adress.indexOf("과천") > 0)){
              element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3);
              element.tel = "032-" + element.tel;
            }
            else{
              element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3);
            element.tel = "031-" + element.tel;
            }
          }
        }
        catch (err) {
          alert(err);
        }
      }
      else if(element.tel != null && element.tel.length == 7 && element.title == "백제약국"){ //api 오류(031-533)
        element.tel = null;
      }
      else if(element.tel != null && element.title == "열린온누리약국" && element.adress != null && element.adress.indexOf("화성")){ //api 오류
        element.tel = null;
      }
      else if(element.tel != null && element.tel.length ==7 && (element.tel.indexOf("-") > 0)){
        try {
          if(element.adress != null){
            if((element.adress.indexOf("부천") > 0)){
              element.tel = "032-" + element.tel;
            }
            else if((element.adress.indexOf("광명") > 0) ||(element.adress.indexOf("과천") > 0)){
              element.tel = "032-" + element.tel;
            }
            else{
              element.tel = "031-" + element.tel;
            }
          }
        }
        catch (err) {
          alert(err);
        }
      }
      else if (element.tel != null && (element.tel.length == 8 || element.tel.length == 9) && !element.tel.startsWith("02")) {//123-1234, 12341234, 1234-1234
        try {
          if(element.adress != null){
            if((element.adress.indexOf("부천") > 0)){
              element.tel = "032-" + element.tel;
            }
            else if((element.adress.indexOf("광명") > 0) || (element.adress.indexOf("과천") > 0))
            {
              element.tel = "02-" + element.tel;
            }
            else{
              element.tel = "031-" + element.tel;
            }
          }
        }
        catch (err) {
          alert(err);
        }
      }
      else if (element.tel != null && element.tel.length == 9 && element.tel.startsWith("02")) {
        try {
          if (element.adress != null) {
            element.tel = element.tel.slice(0, 2) + "-" + element.tel.slice(2, 5) + "-" + element.tel.slice(5);
          }
        }
        catch (err) {
          alert(element.tel);
        }
      }
      else if (element.tel != null && element.tel.length == 10 && !element.tel.startsWith("02")) {
        try {
          if (element.adress != null) {
            element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3, 6) + "-" + element.tel.slice(6);
          }
        }
        catch (err) {
          alert(element.tel);
        }
      }
      else if (element.tel != null && element.tel.length == 10 && element.tel.startsWith("02")) {
        try {
          if (element.adress != null) {
            element.tel = element.tel.slice(0, 2) + "-" + element.tel.slice(2, 6) + "-" + element.tel.slice(6);
          }
        }
        catch (err) {
          alert(element.tel);
        }
      }else if(element.tel != null && element.tel == "031-863-696"){}
      else if (element.tel != null && element.tel.length == 11 && element.tel.startsWith("031") && (element.tel.indexOf("-") > 0)) {
        try {   //031123-1234
          if (element.adress != null) {
            element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3);
          }
        }
        catch (err) {
          alert(element.tel);
        }
      }else if (element.tel != null && element.tel.length == 12 && element.tel.startsWith("031-")) {
        //031-123-1234 (12)
      }
      else if (element.tel != null && element.tel.length == 12 && element.tel.startsWith("031")) {
        try {   //0311234-1234
          if (element.adress != null) {
            element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3);
          }
        }
        catch (err) {
          alert(element.tel);
        }
      }
      else if(element.tel!= null && (element.tel.indexOf("-") < 0) && element.tel.length == 11){ //03112341234
        element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3, 7) + "-" + element.tel.slice(7);
      }
      
      
      console.log(element.tel +"  "+ element.title);

      


     var pharmacy_wrap = document.createElement('div');
      pharmacy_wrap.className = "pharmacy-wrap";

      var modal_header = document.createElement('div');
      modal_header.className = "modal_header";
      pharmacy_wrap.appendChild(modal_header);

      var close_wrap = document.createElement('p');
      close_wrap.className = "close_wrap";
      close_wrap.style.margin = "0";
      modal_header.appendChild(close_wrap);

      close_wrap.innerHTML = `${element.title}`;

      var close = document.createElement('div');
      close.className = "close";
      modal_header.appendChild(close);

      var i = document.createElement('i');
      i.classList.add("fas", "fa-times");
      i.style.fontSize = "50px";
      i.style.color = "#64855C";
      close.appendChild(i);

      var modal_body = document.createElement('div');
      modal_body.className = "modal_body";
      pharmacy_wrap.appendChild(modal_body);

      var modal_addrs_container = document.createElement('div');
      modal_addrs_container.className = "modal_addrs_container";
      modal_body.appendChild(modal_addrs_container);

      var modal_addr = document.createElement('div');
      modal_addr.className = "modal_addr";
      modal_addrs_container.appendChild(modal_addr);

      modal_addr.innerHTML = "주소";

      var modal_addrs_contents = document.createElement('div');
      modal_addrs_contents.className = "modal_addrs_contents";
      modal_addrs_container.appendChild(modal_addrs_contents);

      var doro_container = document.createElement('div');
      doro_container.className = "doro_container";
      modal_addrs_contents.appendChild(doro_container);

      var modal_addr_doro = document.createElement('p');
      modal_addr_doro.className = "modal_addr_doro";
      doro_container.appendChild(modal_addr_doro);

      modal_addr_doro.innerHTML = "(도로명)";

      var modal_addr1 = document.createElement('p');
      modal_addr1.className = "modal_addr1";
      doro_container.appendChild(modal_addr1);

      modal_addr1.innerHTML = `${element.roadAdress ? element.roadAdress : "-"}`;

      var jibeon_container = document.createElement('div');
      jibeon_container.className = "jibeon_container";
      modal_addrs_contents.appendChild(jibeon_container);

      var modal_addr_jibeon = document.createElement('p');
      modal_addr_jibeon.className = "modal_addr_jibeon";
      jibeon_container.appendChild(modal_addr_jibeon);

      modal_addr_jibeon.innerHTML = "(지번)";

      var modal_addr2 = document.createElement('p');
      modal_addr2.className = "modal_addr2";
      jibeon_container.appendChild(modal_addr2);

      modal_addr2.innerHTML = `${element.adress ? element.adress : "-"}`;

      var modal_ph_container = document.createElement('div');
      modal_ph_container.className = 'modal_ph_container';
      modal_body.appendChild(modal_ph_container);

      var modal_ph = document.createElement('div');
      modal_ph.className = "modal_ph";
      modal_ph_container.appendChild(modal_ph);

      modal_ph.innerHTML = "연락처";

      var num1 = document.createElement('div');
      num1.className = "num1";
      modal_ph_container.appendChild(num1);

      num1.innerHTML = `${element.tel ? element.tel : "-"}`;

      var modal_footer = document.createElement('div');
      modal_footer.className = "modal_footer";
      pharmacy_wrap.appendChild(modal_footer);

      var modal_p = document.createElement('div');
      modal_p.className = "modal_p";
      modal_footer.appendChild(modal_p);

      var i2 = document.createElement('i');
      i2.classList.add("fas", "fa-exclamation-triangle");
      i2.style.fontSize = "18px";
      i2.style.color = "gray";
      modal_p.appendChild(i2);

      var modal_p_inner = document.createElement('span');
      modal_p_inner.className = "modal_p_inner";
      modal_p.appendChild(modal_p_inner);
      modal_p_inner.innerHTML = "전화로 약국 별 취급 의약품을 확인 후 방문하시길 바랍니다.";




      var overlay = new window.kakao.maps.CustomOverlay({
        content: pharmacy_wrap,
        map: map,
        position: marker.getPosition()
      });

      overlay.setMap(null)

      window.kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
      });

      close.addEventListener('click', function(){
        overlay.setMap(null);
    })

    });

  }

  mapScript = () => {
    const { AnimalPharmacyData } = this.props;
    console.log(AnimalPharmacyData[1].lat, AnimalPharmacyData[1].lng);

    let container = document.getElementById("Mymap");

    let option = {
      center: new window.kakao.maps.LatLng(AnimalPharmacyData[1].lat, AnimalPharmacyData[1].lng),
      level: 3,
    };

    var map = new window.kakao.maps.Map(container, option);
    this.displayMaker(map);
    this.setBound(map);
    this.mapTypeControl(map);
  }

  setBound = (map) => {
    const { AnimalPharmacyData } = this.props;

    let bounds = new window.kakao.maps.LatLngBounds();
    

    for (var i = 1; i < AnimalPharmacyData.length; i++) {
      if(AnimalPharmacyData[i].lat && AnimalPharmacyData[i].lng){ // 위도, 경도가 없는 데이터가 존재하여 조건식으로 처리해주어야함
      bounds.extend(new window.kakao.maps.LatLng(AnimalPharmacyData[i].lat, AnimalPharmacyData[i].lng))
      }

    }
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정

    map.setBounds(bounds);
  }

  componentDidMount() {
    this.mapScript();
  }

  render() {
    const {information} = this.props;
    return (
      <div className = "all">
        <Navbar className = "navbar">
          <Navbar.Brand href="/" className = "navbarBrand">
            <img alt="logo" src="/logo2.png"
              className="d-inline-block"/>
            <p href = "/" className = "name">동물약국 찾기</p>
          </Navbar.Brand>
          <div className="navbar_find">
            <p className="province">경기도</p>
            <DropdownButton id="dropdown-basic-button" title="선택">
              {information.map((data) =>
                <Dropdown.Item key={data.id}  href={data.id}>
                  {data.name}
                </Dropdown.Item>
              )}
            </DropdownButton>
            
          </div>
        </Navbar>
        <div id="Mymap"></div>
      </div>
    )
  }
}

export default MapCreate;