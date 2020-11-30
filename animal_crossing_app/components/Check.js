import React, { Component } from "react";
import { Animated, Text, View, Easing } from "react-native";
import LottieView from 'lottie-react-native';
//<FadeInOut fadeIn={true} fadeInOut={true} scaleInOut={true}>
//   <Text>Hi</Text>
//</FadeInOut>
class Check extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }
  componentDidMount(){
    if(this.props.play===true){
      this.animateIn();
    } else if(this.props.play===false){
      this.animateOut();
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.play!==this.props.play){
      this.animateIn();
      if(this.props.play===true){
        this.state.progress.setValue(0);
        this.animateIn();
      } else if(this.props.play===false){
        this.state.progress.setValue(0.4);
        this.animateOut();
      }
    }
  }
  animateIn = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };
  animateOut = () => {
    Animated.timing(this.state.progress, {
      toValue: 0,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  render() {
    return (
      <LottieView 
        loop={false}
        progress={this.state.progress}
        resizeMode="cover" 
        ref={animation => {
          this.animation = animation;
        }}
        style={[this.props.style,{
          width: this.props.width,
          height: this.props.height,
        }]} source={require('../assets/checkAnimation2.json')}
      />
    );
  }
}

export default Check ;