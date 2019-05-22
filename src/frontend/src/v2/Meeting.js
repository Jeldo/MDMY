import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import LoadingWindow from './LoadingWindow';
import Map from './Map';
import FindBox from './FindBox';
import PrivateRoom from './PrivateRoom';
import ResultRoom from './ResultRoom';
import { Redirect } from 'react-router-dom';

const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const axios = require('axios');

function clone(a) {
   return JSON.parse(JSON.stringify(a));
}

class MainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMarker: {
        location: {
          lat: 0,
          lng: 0
        },
        transportation: "public",
        name: ""
      },
      meeting: {},
      meetingUsers: [],
      userNum: 1,
      resultAreas: [],
      swiped: false,
      showLoadingWindow: false
    }

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._swipe = {};
    this.minDistance = 50;
    this.fmh = 50;
    this.ymp = 0;

  };

  componentDidMount() {
    //TODO : findmeeting
    axios({
      method: 'get',
      url: 'http://localhost/api/v2/meeting/findMeeting?token=' + this.props.match.params.token,
      data: {}
    }).then((res) => {
      this.setState({
        meeting : res.data.meeting,
        meetingUsers : res.data.meetingUsers,
        resultAreas: res.data.resultAreas
      });
    }).catch((err) => {
      console.log(err);
      alert("잘못된 경로입니다.");
      window.location = "/";
    });

  };

  showLoadingWindow() {
    let result = [];
    if (this.state.showLoadingWindow) {
    result.push(<LoadingWindow></LoadingWindow>);
    }
    else;
    return result;
  };

  //하단 메뉴 터치 슬라이드 부분
  _onTouchStart(e) {
    document.getElementById('side_area').style.height = document.getElementById('side_area').clientHeight+'px';
    document.getElementById('side_area').classList.remove('ani_up');
    document.getElementById('side_area').classList.remove('ani_down');
    const touch = e.touches[0];
    this._swipe = { x: touch.clientX, y: touch.clientY, fmh_n:document.getElementById('side_area').clientHeight };
  }

  _onTouchMove(e) {
    if (e.changedTouches && e.changedTouches.length) {
      const touch = e.changedTouches[0];
      var mh = this._swipe.fmh_n + (this._swipe.y - touch.clientY);
      mh = mh < 50 ? this.fmh : mh;
      this.ymp = this._swipe.y - touch.clientY;
      document.getElementById('side_area').style.height = mh+'px';
      this._swipe.swiping = true;
    }
  }

  _onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const absY = Math.abs(touch.clientY - this._swipe.y);
    if (this._swipe.swiping && absY > this.minDistance ) {
      this.props.onSwiped && this.props.onSwiped();
      this.setState({ swiped: true });
    }
    if(this.ymp < -40){
      document.getElementById('side_area').classList.add('ani_down');
    }else if(document.getElementById('side_area').clientHeight - this.fmh > 20){
      document.getElementById('side_area').classList.add('ani_up');
    }else{
      document.getElementById('side_area').classList.add('ani_down');
    }
    this._swipe = {};
  }

  setMyMarker = (direction) => {
    let newMyMarker = clone(this.state.myMarker);
    newMyMarker.location = {
      lat: direction.lat,
      lng: direction.lng
    };

    this.setState({
      myMarker: newMyMarker
    });
  };

  handleChange = (e) => {
    if (e.target.id == "user-name"){
      let newMyMarker = clone(this.state.myMarker);
      newMyMarker.name = e.target.value;
      this.setState({
        myMarker: newMyMarker
      });
    };
  };

  submit = () => {
    if (this.state.myMarker.location.lat == 0) {
      alert("위치를 입력해주세요.")
      return ;
    }

    let transportAPI = 'http://localhost/api/v2/meeting/enrolledUser?token=' + this.props.match.params.token;

    this.setState({
      showLoadingWindow : true
    });

    axios({
      method: 'post',
      url: transportAPI,
      data: {
        name: this.state.myMarker.name,
        location: [this.state.myMarker.location.lng, this.state.myMarker.location.lat],
        transportation: this.state.myMarker.transportation
      }
    }).then((res) => {
      this.setState({
        resultAreas : res.data.areas,
        showLoadingWindow : false
      });

      window.location = this.props.match.url;
    }).catch((err) => {
      console.log(err);
    });

    return ;
  };

  showResult = () => {
    let transportAPI = 'http://localhost/api/v2/findRoute/findLoc?token=' + this.props.match.params.token;

    this.setState({
      showLoadingWindow : true
    });

    axios({
      method: 'post',
      url: transportAPI
    }).then((res) => {
      this.setState({
        showLoadingWindow : false
      });
      window.location = this.props.match.url;
    }).catch((err) => {
      console.log(err);
    });

    return ;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
       {this.showLoadingWindow()}
        <Table className={classes.table}>
          <TableBody height = '100%'>
              <TableRow>
                <td component="th" scope="row" className={classes.info} id="side_area" onClick={this.footerMenuSlide} onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove} onTouchEnd={this._onTouchEnd}>
                <MenuIcon id="footer_menu_btn" />
                <div id="side_area_top">
                  <IconButton id="side_area_menu_btn" className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                </div>
                <div class="top-bar">
                    <div class="top-bar-title">
                        {this.state.meeting.name}
                    </div>
                </div>
                <div class="share-box">
                    <button id="kakaoShareBtn" class="btn btn-share">친구들에게 공유</button>
                </div>
                {
                  this.state.meeting.result ?
                  (<div id="resultroom">
                      <ResultRoom resultAreas={this.state.resultAreas} />
                  </div>)
                  : (<div id="privateroom">
                    <PrivateRoom meeting={this.state.meeting} meetingUsers={this.state.meetingUsers} myMarker={this.state.myMarker} submit={this.submit} findLoc={this.findLoc} deleteUser={this.deleteUser} handleChange={this.handleChange} showResult={this.showResult}/>
                  </div>)
                }
                </td>
                <div id="map_area"><Map myMarker={this.state.myMarker} meetingUsers={this.state.meetingUsers} setMyMarker={this.setMyMarker} setMarker={this.setMarker} resultAreas={this.state.resultAreas} /></div>
              </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
};

const AppStyles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    overflowX: 'auto',
    backgroundColor: '#FAFAFA',
  },
  table: {
    height: '100%',
  },
  info: {
    width: 380,
    verticalAlign: 'top',
  },
  map: {
    minWidth: 300,
    backgroundColor: '#CEF6D8',
  },
  displayInput: {
    display: 'block',
  },
});

MainTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(AppStyles)(MainTable);
