import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData"
import {ClothingRouteClass} from "./ItemsPage"
import {InfoLineBeside, InfoLine} from '../components/BottomSheetComponents';

export default class VillagerPresentsPage extends Component {
  constructor() {
    super();
  }
  render(){
    if(this.props.villager!==undefined){
      return(
        <ClothingRouteClass 
          title={this.props.villager["NameLanguage"]}
          villagerGiftsFilters={[this.props.villager["Color 1"],this.props.villager["Color 2"],this.props.villager["Style 1"],this.props.villager["Style 2"]]}
          customHeader={<>
            <InfoLine
              center={false}
              image={require("../assets/icons/styleEmoji.png")} 
              item={this.props.villager}
              textProperty={["Style 1"]}
              textProperty2={["Style 2"]}
            />
            <InfoLine
              center={false}
              image={require("../assets/icons/colorPalette.png")} 
              item={this.props.villager}
              textProperty={["Color 1"]}
              textProperty2={["Color 2"]}
            />
          </>}
        />
      )
    } else {
      return(<View/>)
    }
    
  }
}