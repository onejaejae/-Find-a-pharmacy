import React from "react";
import './Modal.css'
import './MapCreate.css'
import {Dropdown, DropdownButton, Navbar} from "react-bootstrap";
class MapCreate extends React.Component {

  iwRemoveable;
  iwContent;

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

      
      if (element.tel != null && element.tel.length == 7) { //1231234
        if (element.adress != null) {
          if (element.adress.indexOf("부천") > 0) {
            element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3);
            element.tel = "032-" + element.tel;
          }
          else if (element.adress.indexOf("광명") > 0 || element.adress.indexOf("과천") > 0) {
            element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3);
            element.tel = "02-" + element.tel;
          }
          else {
            element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3);
            element.tel = "031-" + element.tel;
          }
        }
        else { }
      }
      else if (element.tel != null && (element.tel.length == 8 || element.tel.length == 9)) {//123-1234, 12341234, 1234-1234
        if (element.adress != null) {
          if (element.adress.indexOf("부천") > 0)
            element.tel = "032-" + element.tel;
          else if (element.adress.indexOf("광명") > 0 || element.roadAdress.indexOf("과천") > 0) {
            element.tel = "02-" + element.tel;
          }
          else {
            element.tel = "031-" + element.tel;
          }
        }
        else { }
      }
      else if (element.tel != null && element.tel.length == 10) { //0311231234
        if (element.adress != null) {
          element.tel = element.tel.slice(0, 3) + "-" + element.tel.slice(3, 6) + "-" + element.tel.slice(6);
        }
      }
      else { }
      console.log(element.tel);
      
      var pharmacy_wrap = document.createElement('div');
      pharmacy_wrap.className = "pharmacy_wrap";

      var modal_header = document.createElement('div');
      modal_header.className = "modal_header";
      
      pharmacy_wrap.appendChild(modal_header);

      var close_wrap = document.createElement('p');
      close_wrap.className = "close_wrap";
      close_wrap.style.margin = "0";

      modal_header.appendChild(close_wrap);
      close_wrap.innerHTML = `${element.title}`;

      var i = document.createElement('i');
      i.classList.add("fas", "fa-times");
      i.style.fontSize = "50px"
      i.style.color = "#64855C";
      modal_header.appendChild(i);


      var close = document.createElement('div');
      close.className = "close";
      modal_header.appendChild(close);
     

      var modal_body = document.createElement('div');
      modal_body.className = "modal_body";
      pharmacy_wrap.appendChild(modal_body);

      var modal_addr = document.createElement('div');
      modal_addr.className = "modal_addr";
      modal_addr.innerHTML = "주소";
      modal_body.appendChild(modal_addr);

      var modal_addr1 = document.createElement('div');
      modal_addr1.className = "modal_addr1";
      modal_addr1.innerHTML = "(도로명)";
      modal_body.appendChild(modal_addr1);

      var roadAdress = document.createElement('p');
      roadAdress.className = "roadAdress";
      modal_addr1.appendChild(roadAdress);
      roadAdress.innerHTML = `${element.roadAdress ? element.roadAdress : "도로명 주소 정보가 없습니다"}`;

      var br = document.createElement('br');
      modal_body.appendChild(br);

      var modal_addr2 = document.createElement('div');
      modal_addr2.className = "modal_addr2";
      modal_addr2.innerHTML = "(지번)";
      modal_body.appendChild(modal_addr2);

      var adress = document.createElement('p');
      adress.className = "adress";
      modal_addr2.appendChild(adress);
      adress.innerHTML = `${element.adress ? element.adress : "주소 정보가 없습니다."}`;


      var modal_ph = document.createElement('p');
      modal_ph.className = "modal_ph";
      modal_ph.innerHTML = "연락처";
      modal_body.appendChild(modal_ph);

      var num = document.createElement('span');
      num.className = "num";
      modal_ph.appendChild(num);
      num.innerHTML = `${element.tel ? element.tel : "전화번호 정보가 없습니다."}`;

      var modal_footer = document.createElement('div');
      modal_footer.className = "modal_footer";

      var modal_p = document.createElement('p');
      modal_footer.appendChild(modal_p);
      modal_p.innerHTML = "전화로 약국 별 취급 의약품을 확인 후 방문하시길 바랍니다."

      var i2 = document.createElement('i');
      i2.classList.add("fas", "fa-exclamation-triangle");



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
      bounds.extend(new window.kakao.maps.LatLng(AnimalPharmacyData[i].lat, AnimalPharmacyData[i].lng))

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
                <Dropdown.Item href={data.id}>
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