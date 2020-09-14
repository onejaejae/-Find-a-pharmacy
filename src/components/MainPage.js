import React from 'react';
import '../App.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Main extends React.Component {

  render() {
    const { information } = this.props;
    return (
      <div className="__all">
        <div className="part1">
          <div>
            <div className="logo_title">
              <img className="logo" alt="logo" src="/logo2.png"></img>
              <h1 className="title">동물약국 찾기</h1>
            </div>
            <p className="desc">경기도 28개 시군의 동물의약품 취급・판매 허가 약국을 찾아보세요</p>
            <div className="check">
              <p className="province">경기도</p>
              <DropdownButton id="dropdown-basic-button" title="선택">
                {information.map((data) => // a 태그를 쓰게 될 경우 a 태그의 기본적인 속성때문에 새로 렌더링이 되기 때문에, Link를 써주어서 새로 렌더링되는 것을 막아주어야 한다.
                  <Link to={`maps/${data.id}`}>
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
          <div className="guideI">
            <FontAwesomeIcon icon = {faSearch} size = "2x"></FontAwesomeIcon>
            <div className="guide">동물약국 찾기 이용 가이드</div>
          </div>
          <div className="part2_1">
            <div className="guide_step_text">
              <div className="guide_step">STEP 1</div>
              <div className="guide_text">선택 창을 눌러 지역을 선택하세요</div><br></br>
            </div>
            <img src="/process_1.png" className="guide_img"></img>
          </div>
          <div className="part2_2">
            <div className="guide_step_text">
              <div className="guide_step">STEP 2</div>
              <div className="guide_text">지도 확대/축소와 드래그를 이용해 세부 지역을 찾으세요</div><br></br>
            </div>
            <img src="/process_2.png" className="guide_img"></img>
          </div>
          <div className="part2_3">
            <div className="guide_step_text">
              <div className="guide_step">STEP 3</div>
              <div className="guide_text">핀을 클릭해 약국의 정보를 확인하세요</div><br></br>
            </div>
            <img src="/process_3.png" className="guide_img"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;
