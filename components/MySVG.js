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
import { Animated, 
  // Text, 
  View, StyleSheet, Dimensions } from 'react-native';

// Percentages work in plain react-native but aren't supported in Expo yet, workaround with this or onLayout
const { width, height } = Dimensions.get('window');

export default class MySVG extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        animValue: 0,
        value: '',
        selectedBar: -1
      };
    }  

    animatedValue = new Animated.Value(0);

  componentDidMount () {
    this.runAnimation();
  }

  componentDidUpdate() {
    this.animatedValue = new Animated.Value(this.state.animValue);
    // this.runAnimation();
  }

  runAnimation = () => {
    const { animValue } = this.state;
      Animated.sequence([
        Animated.timing(this.animatedValue, {
          toValue: animValue+1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedValue, {
          toValue: animValue+1,
          duration: 0,
          useNativeDriver: true
        })
      ]).start();
      this.setState({animValue : animValue === 3 ? 0 : animValue+1 });
  }
  getDegree() {
    switch (this.state.animValue) {
      case 0:
        return 0;
        break;
      case 1:
      return 270;
      break;
      case 2:
      return 180;
      break;
      case 3:
      return 90;
      break;
      default:
        break;
    }
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
                this.runAnimation();
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
  const interpolatedRotateAnimation = this.animatedValue.interpolate({
    inputRange: [ 0, 4 ],
    outputRange: ['0deg', '360deg']
  });
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}>
      {/* <Text style={{fontSize: 20}}>{this.state.value}</Text> */}
      <Animated.View 
      style={[
        { transform: [{rotate: interpolatedRotateAnimation}] },
          ]}>
      <Svg height={height * 0.5} width={width * 0.7} viewBox="-250 -65 500 300">
      <G id="quarter_pies" >
                  <Path onPress={this.runAnimation} 
                    d="M0,0 L0,-200 A200,200 0 0,1  200,000  z" 
                    strokeWidth="1" stroke="black" fill="#00ffff" />
                    
                    <Path d="M0,0 L-200,0  A200,200 0 0,1 0,-200 z" 
                    strokeWidth="1" stroke="black" fill="green"/>
                    <Path d="M0,0 L0,200 A200,200 0 0,1 -200,0 z" 
                    strokeWidth="1" stroke="black" fill="blue" />
                    <Path d="M0,0 L200,0 A200,200 0 0,1 0,200  z" 
                    strokeWidth="1" stroke="black" fill="pink" />
                </G>
                <Circle cx="0" cy="0" r="150" fill="yellow" />
                <Text
                  fill="black"
                  rotation = {this.getDegree()}
                  stroke="purple"
                  fontSize="80"
                  fontWeight="bold"
                  x="-20"
                  y="20"
                  textAnchor="middle"> {this.state.value}</Text>
      </Svg>
      </Animated.View>
      {/* <Text>{this.state.value}</Text> */}
      <Svg height={height * 0.5} width={width * 0.7} viewBox="-100 -70 500 300">
      <G id="quarter_pies" >
                    {this.renderBars()}
            </G>
      </Svg>
    </View>
  );
}
}