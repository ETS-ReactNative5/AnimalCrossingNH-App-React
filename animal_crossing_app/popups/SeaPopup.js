import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import ActiveTime from "../components/ActiveTime";
import CachedImage from 'react-native-expo-cached-image';


class SeaPopup extends Component {
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
      <ActiveTime item={this.props.item}/>
      <View style={{marginTop: 30, flexDirection:"row", justifyContent:"space-around",width: Dimensions.get('window').width}}>
        <CachedImage
          style={{width: Dimensions.get('window').width*0.35,height:Dimensions.get('window').width*0.35, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["Critterpedia Image"],
          }}
        />
        <CachedImage
          style={{width: Dimensions.get('window').width*0.35,height:Dimensions.get('window').width*0.35, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["Furniture Image"],
          }}
        />
      </View>
    </View>
  }
}
export default SeaPopup;