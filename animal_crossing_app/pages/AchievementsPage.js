import React, {Component} from 'react';
import {FlatList, Dimensions, Linking, TextInput, Vibration,TouchableNativeFeedback,TouchableOpacity,StyleSheet, Text, View, Image} from 'react-native';
import TextFont from '../components/TextFont';
import {getCurrentDateObject, getMonth, getWeekDayShort} from '../components/DateFunctions';
import {getStorage, checkOff, capitalize, commas, removeBrackets} from "../LoadJsonData"
import {getPhoto} from "../components/GetPhoto"
import Check from '../components/Check';
import colors from '../Colors'
import PopupAddTask from "../components/PopupAddTask"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"
import DropDownPicker from 'react-native-dropdown-picker'
import FastImage from "../components/FastImage"
import {Header, SubHeader, Paragraph} from "../components/Formattings"
import {PopupBottomCustom} from "../components/Popup"
import DelayInput from "react-native-debounce-input";

export default class AchievementsPage extends Component {
  constructor(props){
    super(props);
    this.data = require("../assets/data/data.json")["Achievements"]
    this.state = {
      selectedAchievement:"",
      data:require("../assets/data/data.json")["Achievements"]
    }
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  openPopup = (achievement) =>{
    this.popup.openPopup(achievement);
  }

  handleSearch = (text) => {
    if(text===""){
      if(this.mounted){
        this.setState({data: this.data})
      }
    } else {
      var outputData = [];
      this.data.map( (achievement, index)=>{
        var achievementName = attemptToTranslate(achievement["Name"]);
        if(achievementName.toLowerCase().includes(text.toLowerCase())){
          outputData.push(achievement);
        } else if (attemptToTranslate(achievement["Internal Category"]).toLowerCase().includes(text.toLowerCase())){
          outputData.push(achievement);
        }
      })
      if(this.mounted){
        this.setState({data:outputData});
      }
    }
  }
  
  render(){
    return <>
      <View style={{height:40}}/>
      <Header>Achievements</Header>
      <View style={{height:10}}/>
      <View style={{paddingVertical: 8,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        opacity: 0.7,
        backgroundColor:colors.searchbarBG[global.darkMode]}}
      >
      <DelayInput
        allowFontScaling={false}
        placeholder={attemptToTranslate("Search")}
        style={{color: '#515151',
          fontSize: 17,
          lineHeight: 22,
          marginLeft: 8,
          width:'100%',
          paddingRight: 25,
          height: 30,
        }}
        onChangeText={(text)=>{this.handleSearch(text)}} 
        onFocus={() => {Vibration.vibrate(15);}}
        minLength={2}
        delayTimeout={400}
      />
      </View>
      <FlatList
        data={this.state.data}
        renderItem={({item}) => {
          return(<Achievement achievement={item} storageData={this.storageData} openPopup={this.openPopup}/>)
        }}
        keyExtractor={(item, index) => `list-item-${index}-${item.["Name"]}`}
        contentContainerStyle={{paddingBottom:Dimensions.get('window').height/3}}
      />
      <AchievementsPopup ref={(popup) => this.popup = popup}/>
    </>
  }
}

class AchievementsPopup extends Component {
  constructor(props){
    super(props);
    this.achievementNouns = [];
    this.state = {
      selectedAchievement:"",
    }
  }
  getNouns = ()=>{
    this.achievementNouns = [];
    for(var i = 0; i < this.state.selectedAchievement["Num of Tiers"]; i++){
      this.achievementNouns.push(
        <TextFont key={"Tier "+(i+1).toString()+" Noun"} style={{fontSize:20,
          color: colors.textWhite[0],
          marginLeft: 13,
          paddingLeft: 13,
          paddingRight: 13,
          paddingTop: 4,
          paddingBottom: 4,
          elevation: 3, 
          marginVertical: 5,
          alignSelf: 'flex-start', 
          backgroundColor: colors.achievementsNoun[global.darkMode], 
          borderRadius: 10}}
        >
          {this.state.selectedAchievement["Tier "+(i+1).toString()+" Noun"]}
        </TextFont>
      )
    }
  }
  
  openPopup = (achievement) =>{
    this.setState({selectedAchievement:achievement});
    this.popup.setPopupVisible(true);
  }
  
  render(){
    var name = this.state.selectedAchievement["Name"];
    if(this.state.selectedAchievement!="" && this.state.selectedAchievement["Name"].includes("(island name)")){
      name = this.state.selectedAchievement["Name"].replace("(island name)", global.islandName)
    }
    this.getNouns();
    return <>
      <PopupBottomCustom ref={(popup) => this.popup = popup}>
        <SubHeader marginLeft={false}>{name}</SubHeader>
        <TextFont bold={false} style={{marginTop:10, fontSize: 17, color: colors.textBlack[global.darkMode]}}>{this.state.selectedAchievement["Achievement Description"]}</TextFont>
        <TextFont bold={false} style={{marginTop:10, fontSize: 17, color: colors.textBlack[global.darkMode]}}>{this.state.selectedAchievement["Achievement Criteria"]}</TextFont>
        <View style={{paddingTop:30, justifyContent:"center", marginHorizontal: 5, flexDirection: 'row', flexWrap:"wrap"}}>
          {this.achievementNouns}
        </View>
      </PopupBottomCustom>
    </>
  }
}

class Achievement extends Component {
  constructor(props){
    super(props);
    this.achievementStamps = [];
  }
  componentDidMount(){
    for(var i = 0; i < this.props.achievement["Num of Tiers"]; i++){
      this.achievementStamps.push(<AchievementStamp
        key={this.props.achievement["Name"]+i.toString()}
        id={this.props.achievement["Name"]+i.toString()}
        checkOffItem={this.props.checkOffItem}
        number = {this.props.achievement["Tier "+(i+1).toString()]}
        reward = {this.props.achievement["Tier "+(i+1).toString() + " Reward"]}
        index = {i.toString()}
      />)
    }
  }
  render(){
    var name = this.props.achievement["Name"];
    if(this.props.achievement!="" && this.props.achievement["Name"].includes("(island name)")){
      name = this.props.achievement["Name"].replace("(island name)", global.islandName)
    }
    return <>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.openPopup(this.props.achievement)}>
      <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
        <SubHeader>{name}</SubHeader>
        <TextFont bold={false} style={{marginLeft:30, marginTop:10, fontSize: 17, color: colors.textBlack[global.darkMode]}}>{this.props.achievement["Achievement Criteria"]}</TextFont>
        <View style={{paddingTop:10, marginHorizontal: 5, flex: 1, flexDirection: 'row', justifyContent:'center',flexWrap:"wrap"}}>
          {this.achievementStamps.map((stamp, index) => {
            return(stamp)
          })}
        </View>
      </View>
      </TouchableOpacity>
    </>
  }
}

class AchievementStamp extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      checked: false,
    }
    this.random = Math.random();
  }

  componentDidMount(){
    this.id = this.props.id;
    this.loadChecked();
  }

  loadChecked = async() => {
    var storageData = JSON.parse(await getStorage("Achievements",JSON.stringify([])));
    if(storageData.includes(this.id)){
      this.setState({checked:true})
    }
  }

  checkOffItem = async(id) => {
    var oldList = JSON.parse(await getStorage("Achievements",JSON.stringify([])));
    
    if(oldList.includes(id)){
      oldList = oldList.filter(item => item !== id);
      this.saveList(oldList);
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
      this.setState({checked:false})
    } else {
      oldList.push(id);
      this.saveList(oldList);
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10,220,20]) : "";
      this.setState({checked:true})
    }
    console.log(oldList)
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("Achievements", JSON.stringify(data));
  }
  render(){
    return (
      <View style={{margin:3}}>
        <TouchableOpacity 
          background={TouchableNativeFeedback.Ripple(colors.todoColorAccent[global.darkMode], false)}
          onLongPress={() => {  
            this.checkOffItem(this.id); 
          }}
          onPress={()=>{
            this.checkOffItem(this.id); 
          }}
        >
          <View style={{width: 60,height: 60,borderRadius: 100,justifyContent: "center",alignItems: "center",borderWidth: 2, borderColor: this.state.checked ? colors.checkGreen[global.darkMode] : colors.lightDarkAccent[global.darkMode], backgroundColor:colors.lightDarkAccent[global.darkMode]}}>
            {this.state.checked?<Image style={{transform: [{ rotate: (-20 + Math.floor(this.random * 40)).toString()+'deg' }], opacity: 0.7, resizeMode:'contain',width:45, height:45}} source={require("../assets/icons/seal.png")}/>:<View/>}
          </View>
        </TouchableOpacity>
        <TextFont suffix={" "+attemptToTranslate("to get")} translate={false} numberOfLines={2} bold={false} style={{width: 60, marginTop: 3, color: colors.textBlack[global.darkMode], fontSize: 10, textAlign:"center"}}>{commas(this.props.number)}</TextFont>
        <View style={{alignItems: 'center', justifyContent:"center",flexDirection:"row"}}>
          <TextFont translate={false} bold={false} style={{color: colors.textBlack[global.darkMode], fontSize: 10, textAlign:"center"}}>{commas(this.props.reward)}</TextFont>
          <Image style={{marginLeft:5, resizeMode:'contain',width:20, height:20}} source={require("../assets/icons/miles.png")}/>
        </View>
      </View>
    )
  }
}