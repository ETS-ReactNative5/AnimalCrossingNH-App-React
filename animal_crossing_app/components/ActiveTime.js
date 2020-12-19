import React, { Component } from "react";
import {Text, View, StyleSheet} from "react-native";

class ActiveTime extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    
  }

  render() {
    console.log(this.props);
    var displayText;
    if(this.props.displayText==="hello"){
      displayText = "yes";
    } else {
      displayText = "no";
    }
    return <Text style={styles.text}>{this.props.displayText2}</Text>
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize:26,
    backgroundColor: "white",
    borderRadius: 100,
    marginLeft: 13,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 4,
    paddingBottom: 4,
    elevation: 5,
    marginTop: 100
  },
})

export default ActiveTime;