import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import debounce from 'debounce';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import Loading from 'theme-claire/src/atoms/Loading';
import Button from 'theme-claire/src/atoms/Button';
import FaRefresh from 'react-icons/lib/fa/refresh';

import {
  // VictoryChart,
  VictoryLine,
  VictoryArea,
  // VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory';

import {
  chart,
} from './DashboardChart.scss';

import { convertToMinutes } from '../utilities';
import { getWaitTimes } from '../actions';

class DashboardChart extends Component {
  state = {
    chats: [
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
    chatsCeiling: 5,
    data: [
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
    ceiling: 5,
  }

  componentDidMount() {
    this.calculate(this.props);
    this.getWaitTimesDebounce = debounce(this.getWaitTimes, 3000, true);
  }

  componentWillReceiveProps(nextProps) {
    this.calculate(nextProps);
  }

  calculate = (props) => {
    if (props.data) {
      let max = 0;
      let chatsMax = 0;
      const chats = [];
      const size = props.data.buckets.length - 1;
      const data = props.data.buckets
        .map((b, i) => {
          if (b && b.avgTime) {
            max = convertToMinutes(b.avgTime) > max ? convertToMinutes(b.avgTime) : max;
            chatsMax = b.totalRooms > chatsMax ? b.totalRooms : chatsMax;
          }

          chats.push({
            x: size - i,
            y: b.totalRooms,
          });

          return {
            x: size - i,
            y: convertToMinutes(b ? b.avgTime : 0),
          };
        }).reverse();

      this.setState({
        chats: chats.reverse(),
        chatsCeiling: Math.max(Math.ceil(chatsMax / 5) * 5 + 1, 5),
        data,
        ceiling: Math.max(Math.ceil(max / 5) * 5 + 10, 5),
      });
    }
  }

  getWaitTimes = () => {
    this.props.getWaitTimes();
  }

  onRefresh = (e) => {
    e && e.preventDefault();

    this.getWaitTimesDebounce();
  }

  render() {
    const { data } = this.props;
    const {
      data: victoryData,
      chats,
      ceiling,
      chatsCeiling,
    } = this.state;
    return (
      <div>
        <div className={chart}>
          <h2>
            <span>Pending Chats</span>
            <Button small alt="Refresh" onClick={this.onRefresh}><FaRefresh /> Refresh</Button>
          </h2>
          <svg style={{
            boxSizing: 'border-box',
            display: 'inline',
            padding: 0,
            margin: 0,
            width: '100%',
            height: 'auto',
          }} viewBox="0 0 465 300">
            {/* Shared independent axis */}
            <VictoryAxis
              tickValues={[0, 1, 2, 3, 4]}
              /* tickFormat={['Now', '1 Hour Ago', '2 Hours Ago', '3 Hours Ago', '4 Hours ago']} */
              /* tickValues={[4, 3, 2, 1, 0]} */
              tickFormat={['4 Hours ago', '3 Hours Ago', '2 Hours Ago', '1 Hour Ago', 'Now']}
              orientation="bottom"
              style={{
                grid: {
                  fill: 'transparent',
                  stroke: 'transparent',
                },
              }}
              standalone={false}
              scale="time"
            />

            {/* Data set 1 */}
            <VictoryAxis
              axisLabelComponent={
                <VictoryLabel
                  // y={210}
                  dy={15}
                />
              }
              crossAxis
              dependentAxis
              domain={[0, ceiling]}
              label="Wait Time (minutes)"
              orientation="right"
              standalone={false}
              style={{
                grid: {
                  fill: 'transparent',
                  stroke: 'transparent',
                },
                axisLabel: {
                  fill: '#FF6A5C',
                  position: 'relative',
                  top: '5px',
                },
                tickLabels: {
                  fill: '#FF6A5C',
                },
              }}
              tickFormat={(t) => Math.round(t)}
            />
            {
              victoryData.every(d => d.y === 0)
                ? null
                : <VictoryArea
                  data={victoryData}
                  scale={{ x: 'time', y: 'linear' }}
                  standalone={false}
                  style={{
                    data: {
                      stroke: '#FF6A5C',
                      fill: 'rgba(255, 106, 92, 0.3)',
                    },
                    parent: { border: '1px solid #FF6A5C' },
                  }}
                />
            }

            {/* Data Set 2 */}
            <VictoryAxis
              crossAxis
              dependentAxis
              domain={[0, chatsCeiling]}
              label="Total Chats"
              orientation="left"
              standalone={false}
              style={{
                grid: {
                  fill: 'transparent',
                  stroke: 'rgba(0, 0, 0, 0.1)',
                  strokeDasharray: '10, 5',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                },
                axisLabel: {
                  position: 'relative',
                  top: '5px',
                },
              }}
              tickFormat={(t) => Math.round(t)}
            />

            {
              chats.every(d => d.y === 0)
                ? null
                : <VictoryLine
                  style={{
                    data: { stroke: '#222' },
                    parent: { border: '1px solid #ccc' },
                  }}
                  interpolation="monotoneX"
                  standalone={false}
                  domain={{
                    x: [0, 4],
                    y: [0, chatsCeiling],
                  }}
                  data={chats}
                  scale={{ x: 'time', y: 'linear' }}
                />
            }
          </svg>
        </div>
        <div className={chart}>
          <p>Rooms waiting in queue: {data.unjoined.totalRooms}</p>
          <p>Average wait time: {convertToMinutes(data.unjoined.avgTime)} minutes</p>
        </div>
      </div>
    );
  }
}

const enhance = branch(
  props => props.state === FETCHING,
  renderComponent(Loading)
);

export default bind(
  loader(getWaitTimes)(),
  connect(
    // map state to props
    (state) => ({
      data: state.dashboard.waitTimes,
      state: state.dashboard.state,
    }),
    {
      getWaitTimes,
    }
  )
)(enhance(DashboardChart));
