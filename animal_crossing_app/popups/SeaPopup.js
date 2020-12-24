import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"


class SeaPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <InfoLine
        image={require("../assets/icons/coin.png")} 
        item={this.props.item}
        textProperty={["Sell"]}
        ending={" bells"}
      />
      <InfoLine
        image={require("../assets/icons/magnifyingGlass.png")} 
        item={this.props.item}
        textProperty={["Shadow"]}
      />
      <InfoLine
        image={require("../assets/icons/speed.png")} 
        item={this.props.item}
        textProperty={["Movement Speed"]}
      />
    </View>
  }
}
export default SeaPopup;