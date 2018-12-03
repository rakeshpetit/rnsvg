import Svg,{
    Circle,
    Ellipse,
    G,
    // Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

/* Use this if you are using Expo
import { Svg } from 'expo';
const { Circle, Rect } = Svg;
*/

import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

// Percentages work in plain react-native but aren't supported in Expo yet, workaround with this or onLayout
const { width, height } = Dimensions.get('window');

export default class SvgBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          selectedBar: -1
        };
      }  

  renderBars() {
    const data = [ 465, 155, 540, 265, 875, 124, 196, 486, 575, 125, 300, 1150, 1450, 120, 154, 235, 423];
    const maxData = 400/Math.max.apply(Math, data);
    console.log('maxData', maxData);
    return data.map((item, i) => {
        console.log(item);
        console.log(i);
        return <Rect
            ref={i}
            key={i}
            x={i*15}
            y={-item*maxData}
            onPress = {(j) => {
                console.log('i', j);
                console.log('ha ha', j.target);
                console.log('ha ha', j.nativeEvent);
                this.setState({selectedBar: i, value: item});
            }}
            rotation="0"
            width="10"
            height={item*maxData}
            fill={this.state.selectedBar === i ? 'red' : 'yellow'}
            stroke="green"
        />
    });
    // return null;
  }  
  render() {
    // this.renderBars();
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Text style={{fontSize: 20}}>{this.state.value}</Text>
        <Svg height={height * 0.5} width={width * 0.7} viewBox="-100 -70 500 300">
        <G id="quarter_pies" >
        {this.renderBars()}
        </G>
        </Svg>
      </View>
    );
  }
}