import React, { Component } from 'react';
import './PrivateRoom.css';
import PropTypes from 'prop-types';

class PrivateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          tBool: false,
          transportation: "public",
          scrollHeight: window.innerHeight - 67
        }
    }

    transportationCheckBox = event => {
      if (event.target.checked) {
        this.setState({ tBool: event.target.checked, transportation: "car"});
      }
      else {
        this.setState({ tBool: event.target.checked, transportation: "public"});
      }

      this.props.handleChange(event);
    }

    selectingTransportation() {
      return(
        <div style={{textAlign:"center"}}>
          <input class='toggle' id='transportation' type='checkbox' checked={this.state.tBool} onChange={this.transportationCheckBox}/>
          <label class='toggle-button' for='transportation'></label>
          <label for='transportation'></label>
          <div className="TransfortationImageDiv">
              <a style= {{color:(this.state.tBool ? "#888888" : "white"), fill: (this.state.tBool ? "#888888" : "white"), marginRight: "5%", fontSize:"0.9em" }}>
                <svg className='public-transport-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.437 45.437" >
                  <path d="M41.403,11.11c-0.371-3.627-0.962-6.451-1.897-7.561c-3.855-4.564-30.859-4.898-33.925,0 c-0.75,1.2-1.276,4.014-1.629,7.567c-1.139,0.134-2.026,1.093-2.026,2.267v4.443c0,0.988,0.626,1.821,1.5,2.146 c-0.207,6.998-0.039,14.299,0.271,17.93c0,2.803,1.883,2.338,1.883,2.338h1.765v3.026c0,1.2,1.237,2.171,2.761,2.171 c1.526,0,2.763-0.971,2.763-2.171V40.24h20.534v3.026c0,1.2,1.236,2.171,2.762,2.171c1.524,0,2.761-0.971,2.761-2.171V40.24h0.58 c0,0,2.216,0.304,2.358-1.016c0-3.621,0.228-11.646,0.04-19.221c0.929-0.291,1.607-1.147,1.607-2.177v-4.443
                    C43.512,12.181,42.582,11.206,41.403,11.11z M12.176,4.2h20.735v3.137H12.176V4.2z M12.472,36.667c-1.628,0-2.947-1.32-2.947-2.948 c0-1.627,1.319-2.946,2.947-2.946s2.948,1.319,2.948,2.946C15.42,35.347,14.101,36.667,12.472,36.667z M32.8,36.667 c-1.627,0-2.949-1.32-2.949-2.948c0-1.627,1.321-2.946,2.949-2.946s2.947,1.319,2.947,2.946 C35.748,35.347,34.428,36.667,32.8,36.667z M36.547,23.767H8.54V9.077h28.007V23.767z"/>
                </svg> 대중교통
              </a>
              <a style= {{color:(this.state.tBool ? "white" : "#888888"), fill: (this.state.tBool ? "white" : "#888888"), fontSize:"0.9em"  }}>
                <svg className='public-transport-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 447.645 447.645">
                  <path d="M447.639,244.402c0-8.805-1.988-17.215-5.578-24.909c-0.37-1.956-0.793-3.909-1.322-5.89l-38.884-96.365l-0.263-0.867 c-13.605-40.509-32.963-78.001-82.049-78.001H131.868c-50.296,0-68.069,38.421-81.972,77.776l-40.673,96.6 C3.343,222.167,0,232.944,0,244.402v29.986c0,4.636,0.548,9.171,1.59,13.539C0.577,290.566,0,293.41,0,296.408v89.185 c0,13.078,10.602,23.682,23.68,23.682h49.14c13.071,0,23.673-10.604,23.673-23.682v-44.599h257.46v44.599 c0,13.078,10.604,23.682,23.683,23.682h46.326c13.083,0,23.683-10.604,23.683-23.682v-89.195c0-2.987-0.583-5.844-1.588-8.474 c1.038-4.375,1.588-8.905,1.588-13.54v-29.981H447.639z M78.754,125.821c15.483-43.683,27.934-57.018,53.114-57.018h187.664
                      c24.995,0,38.913,14.873,53.056,56.83l28.375,57.502c-9.265-3.431-19.461-5.335-30.173-5.335H76.849 c-9.645,0-18.862,1.551-27.366,4.358L78.754,125.821z M103.129,285.776H51.281c-9.335,0-16.906-7.578-16.906-16.912 c0-9.337,7.571-16.91,16.906-16.91h51.848c9.339,0,16.91,7.573,16.91,16.91C120.039,278.198,112.463,285.776,103.129,285.776z M286.284,282.389h-120.6c-5.913,0-10.704-4.794-10.704-10.704c0-5.921,4.791-10.713,10.704-10.713h120.6 c5.92,0,10.71,4.792,10.71,10.713C296.994,277.595,292.204,282.389,286.284,282.389z M395.051,285.776h-51.846 c-9.343,0-16.91-7.578-16.91-16.912c0-9.337,7.573-16.91,16.91-16.91h51.846c9.343,0,16.916,7.573,16.916,16.91 C411.967,278.198,404.394,285.776,395.051,285.776z"/>
                </svg> 자동차
              </a>
          </div>
        </div>
      );
    }

    showNumInputUser() {
      return(
        <td>
          <div style={{textAlign: "center"}}><p>제출현황 : {this.props.meetingUsers.length} / {this.props.meeting.number}</p></div>
          <hr className="area-spec-hr"></hr>
        </td>
      )
    }

    showOtherUsers() {
      let usersBox = [];
      for (let i=0; i < this.props.meetingUsers.length; i++) {
        usersBox.push(
          <tr>
            <td>
              {this.props.meetingUsers[i].name}
            </td>
            <td>
            <div class="vertical-hr"></div>
            </td>
            <td>
              {this.props.meetingUsers[i].locationName}
            </td>
            <td>
              <button class="btn-del" id={i} onClick={this.props.deleteUser}>X</button>
            </td>
          </tr>
        )
      }
      return usersBox;
    };

    componentDidMount(){

    }

    getScrollHeight() {
      return {
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: this.state.scrollHeight
      }
    }

    showResult() {
      if (this.props.meetingUsers.length >= this.props.meeting.number/2) {
        this.props.showResult();
      } else {
        alert("모임인원의 과반수가 위치를 입력하여야 합니다!");
      }
    }

    render() {
        const { classes } = this.props;

        window.onresize = () => {
          this.setState({ scrollHeight: window.innerHeight -67 });
        }

        return (
            <div style={this.getScrollHeight()}>
                <table class="location-input-table">
                    <tr>
                      <td>
                        <div class="Wrapper">
                            <input type="text" id="user-name" name="name" class="Input-text" placeholder="이름을 알려주세요!"  onChange={this.props.handleChange}/>
                            <label for="room-name" class="Input-label">이름</label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                          <div class="Wrapper">
                              <div id="start-position" class="Start-position">
                                  {this.props.myMarker.location.name}
                              </div>
                              <label for="start-position" class="Input-label">출발 위치</label>
                          </div>
                      </td>
                    </tr>
                    <tr>
                        {this.selectingTransportation()}
                    </tr>
                    <tr>
                <div class="search-table">
                    <button  class="btn btn-submit" onClick={() => {
                          if((this.props.meetingUsers.length) < (this.props.meeting.number)) {
                          {this.props.submit()}
                          }
                          if((this.props.meetingUsers.length) >= (this.props.meeting.number)) {
                          alert("제출인원 초과!");
                          }
                        }
                        }>이름과 출발위치 제출</button>
                </div>

                    </tr>
                </table>
                        
                <div id="submit-list">
                    <table class="location-input-table">
                      <tr>
                      {this.showNumInputUser()}
                      </tr>
                      <tr>
                      <table class="show-other-people">
                        <tr>
                          <td style= {{textAlign: "center", fontSize: "14px"}}>이름</td>
                          <td></td>
                          <td style= {{textAlign: "center", fontSize: "14px"}}>출발 장소</td>
                        </tr>
                        {this.showOtherUsers()}
                      </table>
                      </tr>
                    </table>
                    <div width="100%" style={{textAlign: "center", marginTop: "25px"}}>
                    <button class="btn btn-result" onClick={() => {this.showResult()}}>결과 보기</button></div>
                    <div id="empty_Space"></div>
                </div>
            </div>
        )
    }
};

PrivateRoom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default PrivateRoom;
