import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import ActiveTime from "../components/ActiveTime";
import FastImage from '../components/FastImage';
import {attemptToTranslate} from "../LoadJsonData"

//   200
//     image: "Critterpedia Image",
// 150
//     image: "Furniture Image",

class FishPopup extends Component {
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 15, margin: 20}}><Image style={{width:150,height:35,resizeMode:'contain'}} source={getPhotoShadow(this.props.item,true)}/></View>
      <InfoLineBeside
        image1={require("../assets/icons/magnifyingGlass.png")} 
        item1={this.props.item}
        textProperty1={["Shadow"]}
        image2={require("../assets/icons/coin.png")} 
        item2={this.props.item}
        textProperty2={["Sell"]}
        ending2={" " + attemptToTranslate("bells")}
      />
      <ActiveTime item={this.props.item}/>
      <View style={{marginTop: 30, flexDirection:"row", justifyContent:"space-around",width: Dimensions.get('window').width}}>
        <FastImage
          style={{width: Dimensions.get('window').width*0.35,height:Dimensions.get('window').width*0.35, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["Critterpedia Image"],
          }}
          cacheKey={this.props.item["Critterpedia Image"]}
        />
        <FastImage
          style={{width: Dimensions.get('window').width*0.35,height:Dimensions.get('window').width*0.35, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["Furniture Image"],
          }}
          cacheKey={this.props.item["Furniture Image"]}
        />
      </View>
    </View>
  }
}
export default FishPopup;