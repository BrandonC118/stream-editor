import React from 'react';
import './App.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import StreamDetails from './components/stream-details';
import { NavBar } from './components/nav-bar';
import './index.css';

// streamData: [
//   { "name": "stream1", "id": "1", "ip": "1.1.1.1" },
//   { "name": "stream2", "id": "2", "ip": "1.1.1.1", "stream_enabled": "true", "backend_ip": "1.1.1.1" },
//   { 'name': 'dev101', 'vendor': 'harmonic', 'stream_strategy': 'HarmonicSports50', 'stream_slot': 'slot001', 'adsmart_skip_processing': true, 'stream_enabled': false, 'pop_up': false, 'aes_enabled': false, 'channel_id': 1808, 'stream_source': 'srcuk', 'encrypted': true, 'stream_formats': { 'dash': { 'marlin': { 'paths': { 'publish_name': 'dash', 'manifest_name': 'manifest.mpd' }, 'resources': { '003_sd': { 'fixed_iv': '118292E423E15E4BB87C99063FA162A0', 'fixed_key': 'c944b08ef6acbea07bcb336526a81567', 'fixed_key_id': '08E4F9EBE73F380D8972D42F09E030C0' }, '003_hd': { 'fixed_iv': '118292E423E15E4BB87C99063FA162A0', 'fixed_key': 'a7a3f98766ac5037f935ede79f1c4f5a', 'fixed_key_id': 'DEFDF6F033332EA7F9DC4A7897EBAFF9' }, '003_sm': { 'fixed_iv': '118292E423E15E4BB87C99063FA162A0', 'fixed_key': 'c944b08ef6acbea07bcb336526a81567', 'fixed_key_id': '08E4F9EBE73F380D8972D42F09E030C0' }, '003_hm': { 'fixed_iv': '118292E423E15E4BB87C99063FA162A0', 'fixed_key': 'a7a3f98766ac5037f935ede79f1c4f5a', 'fixed_key_id': 'DEFDF6F033332EA7F9DC4A7897EBAFF9' } }, 'endpoints': { 'abre_metrics': 31031, 'ksm_metrics': 31032, 'origin': 30030 } } }, 'hls': { 'vge': { 'paths': { 'publish_name': 'hls1', 'manifest_name': 'desktop.m3u8' }, 'resources': { '001_sd': { 'resource_id': '1808' }, '001_hd': { 'resource_id': '4002' } }, 'endpoints': { 'abre_metrics': 31033, 'ksm_metrics': 31034, 'origin': 30031 } }, 'aes': { 'resources': { '005_sd': { 'resource_id': '005_sd' }, '005_hd': { 'resource_id': '005_hd' } } }, 'fairplay': { 'paths': { 'publish_name': 'fp1', 'manifest_name': 'test.m3u8' }, 'endpoints': { 'abre_metrics': 31035, 'ksm_metrics': 31036, 'origin': 30032 }, 'resources': { '004_sd': { 'resource_id': '1808' } } } }, 'ss': { 'playready': { 'paths': { 'publish_name': 'ss1', 'manifest_name': 'desktop.m3u8' }, 'resources': { '002_sd': { 'fixed_key': 'B31D0198F99D26D0CB8E80FB1E49F647', 'dsId': 'AH+03juKbUGbHl1V/QIwRA==', 'kid': 'yUSwjvasvqB7yzNlJqgVZw==' }, '002_hd': { 'fixed_key': '900DCB860E4FE3060E7D1E278B91E657', 'dsId': 'AH+03juKbUGbHl1V/QIwRA==', 'kid': '81JfsY9LsmNdV8MPnQC+rQ==' } }, 'endpoints': { 'abre_metrics': 31037, 'ksm_metrics': 31038, 'origin': 30033 } } } }, 'backend_origin_service_packager_port': 30034, 'packager_metrics_port': 31039, 'transcoder_metrics_port': 31040, 'mce_metrics_port': 31041, 'ra_metrics_port': 31042, 'so_metrics_port': 31043, 'broadcast_feed_port': 2077, 'zixi_username': 1808, 'id': 'defd6b29fe766e405f5e826a082f4fcc', 'value': '3a84c990618fc63c6b74e1d3bebd6bad', 'dog_image_name': 'logo.png', 'multicast_red_source': { 'multicast_ip': '239.199.0.36', 'multicast_source': '' }, 'multicast_blue_source': { 'multicast_ip': '239.199.0.102', 'multicast_source': '' }, 'rtmp_enabled': false, 'dvb_subtitle_grooming_skip': true, 'mmp_playlist_selection_enable': false }
// ],

class App extends React.Component {
  state = {
    directories: [],
    streamData: [],
    selectedStream: null,
    selectedDirectory: null
  }

  // export function fetchStatusHandler(response) {
  //   if (response.status === 200) {
  //     return response;
  //   }
  //   return response.json().then(result => Promise.reject(result));
  // }

  componentDidMount() {
    fetch(`http://localhost:8000/github/get-directories`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      // .then(fetchStatusHandler)
      .then(result => result.json())
      .then(result => this.setState({ directories: result }))
      .catch(error => console.log(error));
  };
  
  selectDirectory = (key) => {
    this.setState({ selectedDirectory: key });

    fetch(`http://localhost:8000/github/get-stream-files/?path=${key}`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      // .then(fetchStatusHandler)
      .then(result => result.json())
      .then(result => this.setState({ streamData: result }))
      .catch(error => console.log(error));
  }

  selectStream = (key) => {
    this.setState({ selectedStream: key })
  }

  render() {
    return (
      <div>
        <NavBar />
        <center>
        <h1>Stream Deets</h1>
        <DropdownButton id="dropdown-basic-button" title="Select Directory">
          {
            this.state.directories && this.state.directories.map(
              (data, index) => (<Dropdown.Item key={`${index}-button`} onClick={() => this.selectDirectory(data)}>{data}</Dropdown.Item>)
            )
          }
        </DropdownButton>

        {this.state.selectedDirectory &&
          <DropdownButton id="dropdown-basic-button" title="Select Stream">
            {
              this.state.streamData.map(
                (data, index) => (<Dropdown.Item key={`${index}-button`} onClick={() => this.selectStream(data.path)}>{data.path}</Dropdown.Item>)
              )
            }
          </DropdownButton>
          }
        </center>
        {/* This is a conditional - if selected stream exists render this component */}
        {this.state.selectedStream && <StreamDetails selectedStream={this.state.selectedStream} selectedDirectory={this.state.selectedDirectory}/>}
      </div>
    );
  }
}

export default App;


