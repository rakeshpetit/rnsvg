import Svg,{
    Circle,
    Ellipse,
    G,
    Text,
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
import { View, StyleSheet, Dimensions } from 'react-native';

// Percentages work in plain react-native but aren't supported in Expo yet, workaround with this or onLayout
const { width, height } = Dimensions.get('window');

export default class SvgBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          lineColor: 'red',
          rectColor: 'yellow',
          circleColor: 'green'
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
            key={i}
            x={i*15+10}
            y="25"
            onPress = {(i) => {
                console.log('ha ha', i.target);
                console.log('ha ha', i.nativeEvent);
            }}
            rotation="0"
            width="7"
            height={item*maxData}
            fill="yellow"
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
        <Svg height={height * 0.5} width={width * 0.5} viewBox="0 0 300 300">
        <G id="quarter_pies" >
        {this.renderBars()}
        </G>
        </Svg>
      </View>
    );
  }
}