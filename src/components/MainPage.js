import React from 'react';
import '../App.css';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";

class Main extends React.Component {

  render() {
    const { information } = this.props;
    return (
      <div className="__all">
        <div className="container">
          <div className="part1">
            <div>
              <div className = "logo_title">
              <img className="logo" alt="logo" src="/logo2.png"></img>
              <h1 className="title">동물약국 찾기</h1>
              </div>
              <p className="desc">경기도 28개 시군의 동물의약품 취급・판매 허가 약국을 찾아보세요.</p>
              <div className="check">
                <p className="province">경기도</p>
                <DropdownButton id="dropdown-basic-button" title="선택">
                  {information.map((data) => // a 태그를 쓰게 될 경우 a 태그의 기본적인 속성때문에 새로 렌더링이 되기 때문에, Link를 써주어서 새로 렌더링되는 것을 막아주어야 한다.
                    <Link to = {`maps/${data.id}`}> 
                      <Dropdown.Item key={data.id} href={data.id}>
                        {data.name}
                      </Dropdown.Item>
                    </Link>
                  )}
                </DropdownButton>
                
              </div>
            </div>
          </div>
          <div className="part2">
            <p className="text">동물약국 찾기 이용 가이드</p>
            <div className="info">
              <div className="explanation">
                <img className="explain_img hvr-grow" alt="explain_img" src="/단계2.png"></img>
                <div className="ko_ex">
                  <div className = "num">1</div>
                  <p>내 지역을 선택 후 검색 클릭</p>
                </div>
              </div>
              <div className="explanation">
                <img className="explain_img hvr-grow" alt="explain_img" src="/단계2.png"></img>
                <div className="ko_ex">
                  <div className = "num">2</div>
                  <p>지도를 움직여 세부 지역 찾기</p>
                </div>
              </div>
              <div className="explanation">
                <img className="explain_img hvr-grow" alt="explain_img" src="/단계3.png"></img>
                <div className="ko_ex">
                  <div className = "num">3</div>
                  <p>핀을 클릭하여 약국 정보 확인</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;
