import Svg,{
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    // Text,
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
import { Text, Animated, View, StyleSheet, Dimensions } from 'react-native';

// Percentages work in plain react-native but aren't supported in Expo yet, workaround with this or onLayout
const { width, height } = Dimensions.get('window');

export default class SvgBoth extends React.Component {
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
          duration: 1000,
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
    constructor(props) {
        super(props);
        this.state = {
          animValue: 0,
          lineColor: 'red',
          rectColor: 'yellow',
          circleColor: 'green'
        };
      }  

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
      
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        };
      }
      
    describeArc(x, y, radius, startAngle, endAngle){
      
          var start = this.polarToCartesian(x, y, radius, endAngle);
          var end = this.polarToCartesian(x, y, radius, startAngle);
      
          var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
          var d = [
              "M", start.x, start.y, 
              "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
          ].join(" ");
      
          return d;       
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
    const { animValue } = this.state;
    const interpolatedRotateAnimation = this.animatedValue.interpolate({
      inputRange: [ 0, 4 ],
      outputRange: ['0deg', '360deg']
    });

    const value = this.describeArc(100, 100, 200, 0, 90);
    console.log(value);
    return (
      <View>
         <Animated.View
                style={[
                    { transform: [{rotate: interpolatedRotateAnimation}] },
                  StyleSheet.absoluteFill,
                  { alignItems: 'center', justifyContent: 'center' }
                ]}>
          <Svg height={height * 0.4} width={width * 0.4} viewBox="-200 -90 400 400">
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
               
                </Svg>
                </Animated.View>
              <View>
              <Svg height={height * 0.4} width={width * 0.4} viewBox="-100 -20 400 200">
              <G id="quarter_pies" >
                    {this.renderBars()}
                    </G>
                    </Svg>
                    <Text style={{ fontSize: 20, alignItems: 'center', justifyContent: 'center' }}>1023</Text>
              </View>
      </View>
      
    );
  }
}