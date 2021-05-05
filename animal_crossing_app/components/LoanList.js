import React, {Component} from 'react';
import {Linking, TextInput, Vibration,TouchableNativeFeedback,TouchableOpacity,StyleSheet, Text, View, Image} from 'react-native';
import TextFont from './TextFont';
import {getCurrentDateObject, getMonth, getWeekDayShort} from './DateFunctions';
import {getStorage, checkOff, capitalize, commas, removeBrackets} from "../LoadJsonData"
import {getPhoto} from "./GetPhoto"
import Check from './Check';
import colors from '../Colors'
import PopupAddLoan from "./PopupAddLoan"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"
import DropDownPicker from 'react-native-dropdown-picker'
import FastImage from "./FastImage"
import {PopupInfoCustom} from "./Popup"
import ButtonComponent from "./ButtonComponent";
import {PopupAmountEntry} from "./PopupAddLoan";

export default class LoanList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      showEdit: false,
    }
  }

  componentDidMount(){
    this.mounted=true;
    this.loadList();
  }

  componentWillUnmount(){
    this.mounted=false;
  }

  loadList = async() => {
    var defaultList = [
      {title: attemptToTranslate('Bridge'), total: 250000, current:0},
      {title: attemptToTranslate('House'), total: 1000000, current:250000},
    ]
    var storageData = JSON.parse(await getStorage("LoanList"+global.profile,JSON.stringify(defaultList)));
    if(this.mounted){
      this.setState({data:storageData,});
    }
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("LoanList"+global.profile, JSON.stringify(data));
  }

  editAmount = (index, amount) => {
    const newLoanList=this.state.data;
    newLoanList[index].current = amount;
    this.setState({data:newLoanList})
    this.saveList(newLoanList);
  }

  deleteItem = (index) => {
    const newLoanList = this.state.data.filter((item,i) => i!=index);
    this.setState({data:newLoanList});
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.saveList(newLoanList);
  }

  reorderItem = (index, direction) => {
    //-1 moves the item down
    //1 moves the item up
    const items = this.state.data
    const position = index
    if (
      (direction === -1 && position === 0) ||
      (direction === 1 && position === items.length - 1)
    ) {
      return;
    }

    const item = items[position]; // save item for later
    
    items.splice(index, 1);
    items.splice(position + direction, 0, item);

    this.setState({data: items});
    this.saveList(items);
  };

  componentWillUnmount(){
  }

  addItemPopup = (open) => {
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.popupAddLoan.setPopupVisible(true);
  }

  addItem = (item) => {
    var addedLoan = this.state.data;
    addedLoan.push(item);
    this.setState({data: addedLoan});
    this.saveList(addedLoan);
  }


  render(){
    return <>
      <View style={{alignItems:"center",flexDirection:"row", right:0, top:0,position:'absolute',zIndex:10}}>
        <TouchableOpacity style={{padding:10}} 
          onPress={()=>{
            this.setState({showEdit:!this.state.showEdit});
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
        }}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{this.state.showEdit ? "Disable Edit List" : "Edit List"}</TextFont>
        </TouchableOpacity>
        <TouchableOpacity style={{padding:10}} 
          onPress={()=>{
            this.addItemPopup(true); 
        }}>
          <Image source={require("../assets/icons/addIcon.png")} style={{width:25, height:25, borderRadius:100,}}/>
        </TouchableOpacity>
      </View>
      <View style={{height:10}}/>
      <View style={{alignItems: 'center'}}>
        <View style={{paddingTop:0, marginHorizontal: 0, flex: 1, flexDirection: 'row', justifyContent:'center',flexWrap:"wrap"}}>
          {this.state.data.map( (item, index)=>{
            return(
              <LoanItem
                key={item+index.toString()}
                item={item}
                index={index}
                editAmount={this.editAmount}
                deleteItem={this.deleteItem}
                reorderItem={this.reorderItem}
                showEdit={this.state.showEdit}
              />
            )
          })}
        </View>
      </View>
      <PopupAddLoan ref={(popupAddLoan) => this.popupAddLoan = popupAddLoan} addItem={this.addItem}/>
    </>
  }
}


class LoanItem extends Component {
  constructor() {
    super();
    this.state = {
      showRemove:false
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      this.setState({showRemove:false})
    }
  }
  removeButton = (props)=>{
    if(props.showEdit || this.state.showRemove)
      return(<>
        <View style={{flexDirection:"row",left:-10, top:-10,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.deleteItem(props.index); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",right:-5, top:-5,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:5}} 
            onPress={()=>{
              props.reorderItem(props.index, -1); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/upArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:5}} 
            onPress={()=>{
              props.reorderItem(props.index, 1); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/downArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
      </>)
    else
      return(
        <View/>
      )
  }
  render(){
    var percent = (this.props.item.current/this.props.item.total)*100
    if(percent>100){
      percent = 100
    } else if (percent < 0){
      percent = 0
    }
    return (
      <View style={{width: "90%", margin:10}}>
        <View style={{width: "100%", position:"absolute", backgroundColor:colors.eventBackground[global.darkMode], height:"100%", borderRadius:10, bottom:0 }}/>
        <View style={{width: "100%", position:"absolute", backgroundColor:colors.loanProgress[global.darkMode], height:percent.toString()+"%", borderRadius:10, bottom:0}}/>
        {this.removeButton(this.props)}
        <TouchableNativeFeedback onLongPress={() => {  
            this.setState({showRemove:!this.state.showRemove})
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(8) : "";
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"1A", false)}
        >
          <View style={{alignItems: 'center'}}>
            <View style={{height:13}}/>
            <TextFont bold={true} numberOfLines={2} style={{textAlign:"center", fontSize:22, color:colors.textBlack[global.darkMode]}}>{capitalize(this.props.item.title)}</TextFont>
            <View style={{height:4}}/>
            <View style={{alignItems: 'center',flexDirection:"row",}}>
              <TextFont translate={false} style={{fontSize:19, color:colors.textBlack[global.darkMode]}}>{commas(this.props.item.current)}</TextFont>
              <View style={{width:10}}/>
              <TextFont style={{fontSize:25, color:colors.textBlack[global.darkMode]}}>/</TextFont>
              <View style={{width:10}}/>
              <TextFont translate={false} style={{fontSize:19, color:colors.textBlack[global.darkMode]}}>{commas(this.props.item.total) + " " + attemptToTranslate("bells")}</TextFont>
            </View>
            <TextFont translate={false} style={{fontSize:19, color:colors.textBlack[global.darkMode]}}>{commas(this.props.item.total-this.props.item.current<0?0:this.props.item.total-this.props.item.current) + " " + attemptToTranslate("bells remaining")}</TextFont>
            <View style={{alignItems: 'center',flexDirection:"row",}}>
              <ButtonComponent
                text={"Edit"}
                color={colors.okButton[global.darkMode]}
                vibrate={15}
                onPress={() => {
                  this.popupEditAmount?.setPopupVisible(true);
                }}
              />
              <PopupAmountEntry editItem={(amount)=>this.props.editAmount(this.props.index,amount)} ref={(popupEditAmount) => this.popupEditAmount = popupEditAmount} title="Edit Amount"/>
              <ButtonComponent
                text={"Pay"}
                color={colors.okButton[global.darkMode]}
                vibrate={15}
                onPress={() => {
                  this.popupAddAmount?.setPopupVisible(true);
                }}
              />
              <PopupAmountEntry editItem={(amount)=>this.props.editAmount(this.props.index,this.props.item.current+amount)} ref={(popupAddAmount) => this.popupAddAmount = popupAddAmount} title="Pay Amount"/>
            </View>
            <View style={{height:13}}/>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}