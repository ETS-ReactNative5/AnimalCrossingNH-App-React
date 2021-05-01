import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Vibration, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doWeSwapDate, isActive2} from "./components/DateFunctions";
import * as Localization from 'expo-localization';
import * as FileSystem from 'expo-file-system'

export async function getStorage(storageKey, defaultValue){
  const valueReturned = await AsyncStorage.getItem(storageKey);
  if(valueReturned === null || valueReturned === undefined) {
    await AsyncStorage.setItem(storageKey, defaultValue);
    return defaultValue;
  }
  return valueReturned;
}

export function inWishlist(checkListKeyString){
  if(global.collectionList.includes("wishlist"+checkListKeyString)){
    return true;
  } else {
    return false
  }
}

export function inChecklist(checkListKeyString){
  if(global.collectionList.includes(checkListKeyString)){
    return true;
  } else {
    return false
  }
}

const database = require("./assets/data/data.json");

export async function getStorageData(data, checkListKey, defaultValue){
  var dataLoadingTotal = [];
  //Loop through all datasets
  for(var dataSet = 0; dataSet <data.length; dataSet++){
    var dataLoading = database[data[dataSet]];
    var totalIndex = -1;
    //Loop through that specific dataset
    for(var i = 0; i < dataLoading.length; i++){
      //Remove no name K.K. songs
      if(dataLoading[i]["Name"].includes("Hazure")){
        dataLoading.splice(i,1);
        continue;
      }
      totalIndex++;
      var checkListKeyString = checkListKey[dataSet][0];
      //Loop through specific checklistKey property for that dataset
      for(var x = 1; x < checkListKey[dataSet].length; x++){
        checkListKeyString += dataLoading[i].[checkListKey[dataSet][x]];
      }
      //Get value from storage
      // var value=defaultValue;
      // var wishlist = "false";
      // if(global.collectionList.includes("wishlist"+checkListKeyString)){
      //   wishlist="true";
      // } 
      // if(global.collectionList.includes(checkListKeyString)){
      //   value="true";
      // }
      // dataLoading[i].collected=value;
      // dataLoading[i].wishlist=wishlist;
      dataLoading[i].checkListKey=checkListKeyString;

      if(checkListKey[dataSet][0] === "fishCheckList" || checkListKey[dataSet][0] === "seaCheckList" || checkListKey[dataSet][0] === "bugCheckList"){
        var hemispherePre = ["NH ", "SH "];
        var monthShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        for(var hemispherePreIndex=0; hemispherePreIndex<hemispherePre.length; hemispherePreIndex++){
          for(var monthShortIndex=0; monthShortIndex<monthShort.length; monthShortIndex++){
            dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]+" Active"]] = dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]]]!=="NA"?"true":"false";
            if(dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]]]!=="NA" && dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]]]!=="All day")
              dataLoading[i][hemispherePre[hemispherePreIndex]+"time"] = dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]]];
          }
          if(!dataLoading[i].hasOwnProperty(hemispherePre[hemispherePreIndex]+"time"))
            dataLoading[i][hemispherePre[hemispherePreIndex]+"time"] = "All day"
        }
      }
      if(global.language!=="English"){
        dataLoading[i]["NameLanguage"]=attemptToTranslateItem(dataLoading[i]["Name"]);
      } else {
        dataLoading[i]["NameLanguage"]=dataLoading[i]["Name"];
      }
      dataLoading[i]["Data Category"]=data[dataSet];
    }
    dataLoadingTotal.push(dataLoading);
  }
  return dataLoadingTotal;
}

export function countCollection(checkListKeyStart){
  var count = 0;
  for(var i = 0; i<global.collectionList.length; i++){
    if(global.collectionList[i].includes(checkListKeyStart) && !global.collectionList[i].includes("wishlist")){
      if(checkListKeyStart.includes("artCheckList") && (global.collectionList[i].includes("No") || (global.collectionList[i].includes("0") && global.collectionList[i].includes("Yes")))){
        continue;
      } else {
        count++
      }
    }
  }
  return count;
}

export function determineDataGlobal(datakeyName){
  if(datakeyName==="dataLoadedReactions")
    return global.dataLoadedReactions;
  else if(datakeyName==="dataLoadedArt")
    return global.dataLoadedArt;
  else if(datakeyName==="dataLoadedMusic")
    return global.dataLoadedMusic;
  else if(datakeyName==="dataLoadedConstruction")
    return global.dataLoadedConstruction;
  else if(datakeyName==="dataLoadedFish")
    return global.dataLoadedFish;
  else if(datakeyName==="dataLoadedBugs")
    return global.dataLoadedBugs;
  else if(datakeyName==="dataLoadedSea")
    return global.dataLoadedSea;
  else if(datakeyName==="dataLoadedFossils")
    return global.dataLoadedFossils;
  else if(datakeyName==="dataLoadedArt")
    return global.dataLoadedArt;
  else if(datakeyName==="dataLoadedVillagers")
    return global.dataLoadedVillagers;
  else if(datakeyName==="dataLoadedFurniture")
    return global.dataLoadedFurniture;
  else if(datakeyName==="dataLoadedClothing")
    return global.dataLoadedClothing;
  else if(datakeyName==="dataLoadedFloorWalls")
    return global.dataLoadedFloorWalls;
  else if(datakeyName==="dataLoadedRecipes")
    return global.dataLoadedRecipes;
  else if(datakeyName==="dataLoadedTools")
    return global.dataLoadedTools;
  else if(datakeyName==="dataLoadedAll")
    return global.dataLoadedAll;
  else if(datakeyName==="dataLoadedCreatures")
    return global.dataLoadedCreatures;
  else if(datakeyName==="dataLoadedCards")
    return global.dataLoadedCards;
  else if(datakeyName==="dataLoadedMaterials")
    return global.dataLoadedMaterials;
}

export function resetFilters(){
  var filterKeys = ["Active CreaturesFilters","FishFilters","BugsFilters","Sea CreaturesFilters","FossilsFilters","ArtFilters","FurnitureFilters","ClothingFilters","Floor & WallsFilters","MusicFilters","EmoticonsFilters","RecipesFilters","ToolsFilters","VillagersFilters","ConstructionFilters","EverythingFilters"]
  for(var i =0; i < filterKeys.length; i++){
    AsyncStorage.setItem(filterKeys[i], "");
  }
}

export function getSpecificFilters(searchFor){
  if(searchFor===undefined){
    return [];
  }
  const filterDefinitionsAll = require("./assets/data/Generated/filterDefinitions.json")["All Items"];
  var foundFilters = [];
  for(var i=0; i<filterDefinitionsAll.length; i++){
    for(var j=0; j<filterDefinitionsAll[i]["children"].length; j++){
      if(filterDefinitionsAll[i]["children"][j]["id"].split(":")[1].toLowerCase().includes(searchFor.toLowerCase())){
        foundFilters.push(filterDefinitionsAll[i]["children"][j]["id"])
      }
    }
  }
  console.log(foundFilters)
  return foundFilters;
}

export async function deleteSavedPhotos(){
  const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
  const sizeMB = ((await FileSystem.getInfoAsync(FileSystem.documentDirectory)).size)/1000000;
  for(var i=0; i<files.length; i++){
    await FileSystem.deleteAsync(FileSystem.documentDirectory+files[i]);
  }
  return [files.length, sizeMB];
}

export function checkOff(checkListKey, collected, vibrate=getSettingsString("settingsEnableVibrations")==="true", wishlist=false, indexSpecial=""){
  if(wishlist){
    console.log("wishlist"+checkListKey);
    if(collected===false){
      vibrate ? Vibration.vibrate([0,10,100,20]) : "";
      global.collectionList.push("wishlist"+checkListKey+indexSpecial)
    } else {
      vibrate ? Vibration.vibrate(10) : "";
      collectionListRemove("wishlist"+checkListKey+indexSpecial)
    }
    collectionListSave();
    //console.log(global.collectionList)
  } else {
    console.log(checkListKey+indexSpecial);
    if(collected==="false" || collected===false){
      vibrate ? Vibration.vibrate([0,10,220,20]) : "";
      global.collectionList.push(checkListKey+indexSpecial)
    } else {
      vibrate ? Vibration.vibrate(10) : "";
      collectionListRemove(checkListKey+indexSpecial)
    }
    collectionListSave();
    //console.log(global.collectionList)
  }
}

function collectionListRemove(checkListKey){
  if(global.collectionList.includes(checkListKey)){
    global.collectionList = global.collectionList.filter(e => e !== checkListKey)
    global.collectionList = global.collectionList.filter(e => e !== "")
  }
}

export function collectionListSave(){
  var outputString = "";
  for(var i = 0; i<global.collectionList.length; i++){
    outputString += global.collectionList[i];
    outputString += "\n";
  }
  console.log(outputString)
  AsyncStorage.setItem("collectedString"+global.profile, outputString);
}

export function removeAccents(text){
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function capitalize(name) {
  if(name.includes("(") && name.includes(")")){
    var withinBrackets = name.match(/\((.*?)\)/);
    name = name.replace(withinBrackets[0], "("+capitalize(withinBrackets[1])+")")
    return name;
  }
  if(name!==undefined){
    var name = name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    return name.charAt(0).toUpperCase() + name.slice(1);
  } else {
    return "null";
  }
}

export function capitalizeFirst(name) {
  if(name!==undefined){
    return name.charAt(0).toUpperCase() + name.slice(1);
  } else {
    return "null";
  }
}

export function commas(number) {
  if(number!==undefined){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } else {
    return "null"
  }
}

export function removeBrackets(string){
  if(string!==undefined){
    return string.replace(/ *\([^)]*\) */g, "");
  } else {
    return "null"
  }
}

export async function loadGlobalData(){
  global.dataLoadedReactions = await getStorageData(["Reactions"],[["emojiCheckList","Name"]],"false");
  global.dataLoadedMusic = await getStorageData(["Music"],[["songCheckList","Name"]],"false");
  global.dataLoadedConstruction = await getStorageData(["Construction","Fencing"],[["constructionCheckList","Name"],["fenceCheckList","Name"]],"false");
  global.dataLoadedFish = await getStorageData(["Fish"],[["fishCheckList","Name"]],"false");
  global.dataLoadedBugs = await getStorageData(["Insects"],[["bugCheckList","Name"]],"false");
  global.dataLoadedSea = await getStorageData(["Sea Creatures"],[["seaCheckList","Name"]],"false");
  global.dataLoadedCreatures = await getStorageData([
    "Fish",
    "Sea Creatures",
    "Insects",
  ],[
    ["fishCheckList","Name"],
    ["seaCheckList","Name"],
    ["bugCheckList","Name"]
  ],"false");
  global.dataLoadedFossils = await getStorageData(["Fossils"],[["fossilCheckList","Name"]],"false");
  global.dataLoadedArt = await getStorageData(["Art"],[["artCheckList","Name","Genuine"]],"false");
  global.dataLoadedVillagers = await getStorageData(["Villagers"],[["villagerCheckList","Name"]],"false");
  global.dataLoadedFurniture = await getStorageData([
    "Housewares",
    "Miscellaneous",
    "Wall-mounted",
    "Photos",
    "Posters",
  ],
  [
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name"],
  ],"false");
  global.dataLoadedClothing = await getStorageData([
    "Headwear",
    "Equipment",
    "Tops",
    "Dress-Up",
    "Clothing Other",
    "Bottoms",
    "Socks",
    "Shoes",
    "Bags",
    "Umbrellas",
  ],
  [
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name"],
  ],"false");
  global.dataLoadedFloorWalls = await getStorageData(
  [
    "Floors",
    "Rugs",
    "Wallpaper"
  ],
  [
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
  ],"false");
  global.dataLoadedTools = await getStorageData(["Tools"],[["toolsCheckList","Name","Variation"]],"false");
  global.dataLoadedRecipes = await getStorageData(["Recipes"],[["recipesCheckList","Name"]],"false");
  global.dataLoadedCards = await getStorageData(["Message Cards"],[["cardsCheckList","Name"]],"false");
  global.dataLoadedMaterials = await getStorageData(["Other"],[["materialsCheckList","Name"]],"false");
  global.dataLoadedAll = await getStorageData(
  [
    "Housewares",
    "Miscellaneous",
    "Wall-mounted",
    "Photos",
    "Posters",
    "Headwear",
    "Equipment",
    "Tops",
    "Dress-Up",
    "Clothing Other",
    "Bottoms",
    "Socks",
    "Shoes",
    "Bags",
    "Umbrellas",
    "Floors",
    "Rugs",
    "Wallpaper",
    "Recipes",
    "Tools",
    "Fish",
    "Insects",
    "Sea Creatures",
    "Fossils",
    "Art",
    "Villagers",
    "Music",
    "Reactions",
    "Construction",
    "Fencing",
    "Other",
  ],
  [
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name"],
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
    ["recipesCheckList","Name"],
    ["toolsCheckList","Name","Variation"],
    ["fishCheckList","Name"],
    ["bugCheckList","Name"],
    ["seaCheckList","Name"],
    ["fossilCheckList","Name"],
    ["artCheckList","Name","Genuine"],
    ["villagerCheckList","Name"],
    ["songCheckList","Name"],
    ["emojiCheckList","Name"],
    ["constructionCheckList","Name"],
    ["fenceCheckList","Name"],
    ["materialsCheckList","Name"]
  ],"false");
}

const artIdentification = require("./assets/data/artIdentification.json")
export function getArtIdentification(name){
  for(var i = 0; i<artIdentification.length; i++){
    if(artIdentification[i]["Name"]===name){
      if(artIdentification[i]["Identification"]==="This is always real"){
        return "";
      } else {
        return artIdentification[i]["Identification"];
      }
    }
  }
  return "";
}

export function getSettingsString(key){
  if(settings!==undefined||global.settingsCurrent!==undefined){
    for(var i = 0; i<settings.length; i++){
      if(global.settingsCurrent[i]["keyName"]===key){
        return global.settingsCurrent[i]["currentValue"];
      }
    }
  }
  return 0;
}

export function setSettingsString(key, value){
  if(settings!==undefined||global.settingsCurrent!==undefined){
    for(var i = 0; i<settings.length; i++){
      if(global.settingsCurrent[i]["keyName"]===key){
        global.settingsCurrent[i]["currentValue"]=value;
        AsyncStorage.setItem(key, value);
        break;
      }
    }
  }
  return 0;
}
// import {getSettingsString} from "../LoadJsonData"
// getSettingsString("settingsEnableVibrations")
export const settings = [
  {
    "keyName" : "breaker",
    "text" : "General",
  },
  {
    "keyName" : "settingsNorthernHemisphere",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/earth.png"),
    "displayName" : "Northern Hemisphere",
    "description" : "Set your hemisphere, north or south. This will change the data displayed for creatures and events.",
  },
  {
    "keyName" : "settingsSortAlphabetically",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/alphabet.png"),
    "displayName" : "Sort lists in alphabetical order",
    "description" : "Sort any list into alphabetical order.",
  },{
    "keyName" : "settingsHighlightNotCraftableVariations",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/dice.png"),
    "displayName" : "Highlight furniture with non-craftable variations",
    "description" : "Highlight furniture with variations that can't be crafted by the player in blue. This will help complete your catalog with all the furniture variations!",
  },
  {
    "keyName" : "breaker",
    "text" : "Notifications",
  },
  {
    "keyName" : "settingsNotifications",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/bell.png"),
    "displayName" : "App notifications",
    "description" : "This will enable/disable notifications. You can select event notifications under the [Edit Events] of the [Events] section on the homepage.",
  },
  // {
  //   "keyName" : "settingsShowVariation",
  //   "defaultValue" : "false",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/dice.png"),
  //   "displayName" : "Show variations in lists",
  //   "description" : "Show the different colours/patterns of furniture and clothing items in the list.",
  // },
  // {
  //   "keyName" : "settingsRemoveCraftVariations",
  //   "defaultValue" : "false",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/diyKit.png"),
  //   "displayName" : "Remove customizable variations in lists",
  //   "description" : "Remove variations that you can obtain through customization. Useful to keep track of furniture types that has not been purchased.",
  // },

  {
    "keyName" : "breaker",
    "text" : "Creatures",
  },
  // {
  //   "keyName" : "settingsListOnlyActiveCreatures",
  //   "defaultValue" : "false",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/clockIcon.png"),
  //   "displayName" : "List only active creatures",
  //   "description" : "Only creatures that can be caught in the current month will be displayed.",
  // },
  // {
  //   "keyName" : "settingsCreaturesLeavingWarning",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/alarmClock.png"),
  //   "displayName" : "Last month to catch warning",
  //   "description" : "Display a red warning background colour around creatures that won't be able to be caught in the next month.",
  // },
  {
    "keyName" : "settingsSortCritterpedia",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/filter.png"),
    "displayName" : "Sort creatures based on Critterpedia",
    "description" : "Sort creatures the same way they are sorted in the Critterpedia. This applies to the Creatures + Museum page.",
  },
  {
    "keyName" : "breaker",
    "text" : "User interface",
  },
  {
    "keyName" : "settingsAutoDarkMode",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/bulb.png"),
    "displayName" : "Dark mode - follow system",
    "description" : "Dark mode will follow system default, if your Android version does not support system dark mode, disable this and use the setting below.",
  },
  {
    "keyName" : "settingsDarkMode",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/autoMode.png"),
    "displayName" : "Dark mode",
    "description" : "Toggle dark mode, ensure auto dark mode is off to use this",
  },
  {
    "keyName" : "settingsColorLists",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/colorPalette.png"),
    "displayName" : "Colored lists",
    "description" : "Change the background of the list based on the color of the item",
  },
  {
    "keyName" : "settingsShowBlankCheckMarks",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/checkEmpty.png"),
    "displayName" : "Show empty check marks",
    "description" : "Show an empty check mark in lists. Can be tapped to quickly check off the item. Disabling this can increase performance as less animations need to be rendered.",
  },
  {
    "keyName" : "settingsCompressVariations",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/variations.png"),
    "displayName" : "Compress variations into a scrollable list",
    "description" : "The way gestures work, it may not allow scrolling inside a popup container. Disable this to be able to see all variations without the need for a nested scroll.",
  },
  {
    "keyName" : "settingsLargerItemPreviews",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/magnifyingGlass.png"),
    "displayName" : "Use larger images in popup",
    "description" : "Use a larger image when previewing items in their popup",
  },

  {
    "keyName" : "breaker",
    "text" : "System",
  },
  {
    "keyName" : "settingsBackButtonChangePages",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/backButton.png"),
    "displayName" : "Back button to previous page",
    "description" : "Use the back button to switch pages quickly. If this is off, the back button will just open the side panel.",
  },
  {
    "keyName" : "settingsShowStatusBar",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/bell.png"),
    "displayName" : "Show notification status bar",
    "description" : "A restart may be required to see changes.",
  },
  {
    "keyName" : "settingsUse24HourClock",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/fancyClock.png"),
    "displayName" : "Use 24 hour clock",
    "description" : "Enable a 24 hour clock instead of the standard 12 hour format.",
  },
  {
    "keyName" : "settingsEnableVibrations",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/vibration.png"),
    "displayName" : "Enable haptic feedback",
    "description" : "Enable/Disable the vibrations with certain actions.",
  },
  {
    "keyName" : "settingsDownloadImages",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/photo.png"),
    "displayName" : "Download images",
    "description" : "Save images locally for offline use once viewed. If disabled, can save storage space, but always requires an internet connection to view images.",
  },
  {
    "keyName" : "breaker",
    "text" : "Interface layout",
  },
  {
    "keyName" : "settingsShowFAB",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/buttonIcon.png"),
    "displayName" : "Show floating menu button",
    "description" : "Choose to display the menu button in the bottom right corner. The menu can be opened by dragging from the left of the screen.",
  },
  {
    "keyName" : "settingsTabBarPosition",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/scroll.png"),
    "displayName" : "Category labels on bottom",
    "description" : "Show the category tabs on the bottom, or top of the screen in list pages with multiple categories.",
  },
  // {
  //   "keyName" : "settingsUseFilters",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/filter.png"),
  //   "displayName" : "Enable filters in lists",
  //   "description" : "Turning this off can increase performance of loading, for basic needs",
  // },
  {
    "keyName" : "breaker",
    "text" : "Custom dates",
  },
  {
    "keyName" : "settingsUseCustomDate",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/customTime.png"),
    "displayName" : "Use a custom date",
    "description" : "Use any date you want, in case you are one of those time travellers",
  },
]

//How translations are handled


//attemptToTranslate()
//Original entry is split by ';' and each part is translated
//translates from Main, NPCs, Sources

//attemptToTranslate(force=true)
//Original entry is split by ';' and each part is translated
//also tries attemptToTranslateItem() (because this may have event names) and attemptToTranslateSpecial(type="variants")
//translates from (Main, NPCs, Sources) + Event Names

//attemptToTranslateItem()
//gets translation from original item translation spreadsheet json converted Items
//then tried to get translations from Missing Items, Cards

//attemptToTranslateSpecial(type="variants")
//gets translation from original item translation spreadsheet json converted Variants

//attemptToTranslateSpecial(type="catchphrase")
//gets translation from original item translation spreadsheet json converted Catchphrases

//attemptToTranslateAchievement()
//translates from Achievements only

//attemptToTranslateSourceNotes()
//translated from Source Notes only

//attemptToTranslateMysteryIslands()
//translates from Mystery Islands only

//attemptToTranslateCreatureCatchPhrase()
//translates creatures catch phrases from Catch Phrases

//attemptToTranslateMuseumDescription()
//translates museum descriptions from Museum Descriptions


const variantTranslations = require("./assets/data/Generated/translatedVariants.json");
const catchphraseTranslations = require("./assets/data/Generated/translatedVillagerCatchPhrases.json");
const appTranslations = require("./assets/data/translationsApp.json")["Main"];
const achievementTranslations = require("./assets/data/translationsApp.json")["Achievements"];
const itemTranslations = require("./assets/data/Generated/translatedItems.json")
const itemTranslationsMissing = require("./assets/data/translationsApp.json")["Missing Items"];
const eventTranslationsMissing = require("./assets/data/translationsApp.json")["Event Names"];
const sourcesTranslations = require("./assets/data/translationsApp.json")["Sources"];
const sourceNotesTranslations = require("./assets/data/translationsApp.json")["Source Notes"];
const cardsTranslations = require("./assets/data/translationsApp.json")["Cards"];
const NPCTranslations = require("./assets/data/translationsApp.json")["NPCs"];
const mysteryIslandsTranslations = require("./assets/data/translationsApp.json")["Mystery Islands"];
const creatureCatchPhraseTranslations = require("./assets/data/translationsApp.json")["Catch Phrases"];
const museumDescriptionTranslations = require("./assets/data/translationsApp.json")["Museum Descriptions"];

export function attemptToTranslateFromDatabases(text, databases){
  if(text===undefined){
    return "";
  } else if(global.language==="English"){
    return text;
  }
  for(var i=0; i<databases.length; i++){
    for(var j=0; j<databases[i].length; j++){
      if(databases[i][j].hasOwnProperty("English") && databases[i][j]["English"].toLowerCase()===text.toString().toLowerCase()){
        var translatedText = databases[i][j][global.language];
        if(translatedText!==undefined&&translatedText!==null&&translatedText!==""){
          return translatedText;
        }
      }
    }
  }
  return text;
}

export function attemptToTranslateItem(text){
  if(global.language!=="English"){
    if(itemTranslations.hasOwnProperty(text)){
      return(itemTranslations[text][global.language])
    }
  }
  var newText = attemptToTranslateFromDatabases(text,[itemTranslationsMissing]);
  if(text === newText){
    newText = attemptToTranslateFromDatabases(text,[cardsTranslations]);
  }
  return newText;
}

export function attemptToTranslateSpecial(text, type){
  if(global.language!=="English"){
    var translated;
    if(type==="variants"){
      translated = variantTranslations;
    } else if (type==="catchphrase"){
      translated = catchphraseTranslations;
    } else {
      return text
    }
    if(translated.hasOwnProperty(text)){
      return(translated[text][global.language])
    }
  }
  return text;
}
export function attemptToTranslateAchievement(text){
  return attemptToTranslateFromDatabases(text, [achievementTranslations])
}

export function attemptToTranslateMysteryIslands(text){
  return attemptToTranslateFromDatabases(text, [mysteryIslandsTranslations])
}

export function attemptToTranslateSourceNotes(text){
  return attemptToTranslateFromDatabases(text, [sourceNotesTranslations])
}

export function attemptToTranslateCreatureCatchPhrase(text){
  return attemptToTranslateFromDatabases(text, [creatureCatchPhraseTranslations])
}

export function attemptToTranslateMuseumDescription(text){
  return attemptToTranslateFromDatabases(text, [museumDescriptionTranslations])
}

export function attemptToTranslate(text, forcedTranslation=false){
  if(text===undefined){
    return "";
  } else if(global.language==="English"){
    return text;
  }

  

  var textArray = [];
  if(text.toString().includes(";")){
    textArray = text.toString().split(";");
    for(var x=0; x<textArray.length; x++){
      textArray[x] = textArray[x].trim();
    }
  } else {
    textArray.push(text);
  }
  var translatedTextOut = "";
  var success = false;
  for(var j=0; j<textArray.length; j++){
    success = false;

    if(forcedTranslation){
      var forcedTranslationText = attemptToTranslateSpecial(textArray[j], "variants");
      if(forcedTranslationText===textArray[j]){
        forcedTranslationText = attemptToTranslateItem(textArray[j])
      }
      if(forcedTranslationText===textArray[j]){
        forcedTranslationText = attemptToTranslateFromDatabases(textArray[j],[eventTranslationsMissing]);
      }

      if(forcedTranslationText !== textArray[j]){
        if(j>0){
          translatedTextOut+="; " + forcedTranslationText;
        } else {
          translatedTextOut+=forcedTranslationText;
        }
        success = true;
        continue;
      }
    }

    for(var i=0; i<appTranslations.length; i++){
      if(appTranslations[i].hasOwnProperty("English") && appTranslations[i]["English"].toLowerCase()===textArray[j].toString().toLowerCase()){
        var translatedText = appTranslations[i][global.language];
        if(translatedText===undefined||translatedText===null||translatedText===""){
          translatedTextOut+=textArray[j];
          success = true;
          break;
        } else {
          if(j>0){
            translatedTextOut+="; " + translatedText;
          } else {
            translatedTextOut+=translatedText;
          }
          success = true;
          break;
        }
      }
    }
    if(success===false){
      var extraTranslation = attemptToTranslateFromDatabases(textArray[j], [NPCTranslations, sourcesTranslations])
      if(extraTranslation!==textArray[j]){
        if(j>0){
          translatedTextOut+="; " + extraTranslation;
        } else {
          translatedTextOut+=extraTranslation;
        }
        success = true;
        continue;
      } else {
        if(j>0){
          translatedTextOut+="; " + textArray[j];
        } else {
          translatedTextOut+=textArray[j];
        }
      }
    }
  }
  return translatedTextOut;
}

export function checkTranslationEntry(textCheck, fallback){
  if(textCheck===null||textCheck===undefined){
    return fallback;
  } else {
    return textCheck;
  }
}

export function translateDreamAddressBeginning(villager){
  if(global.language==="French" || global.language==="French (US)"){
    return ("DA")
  } else {
    return ("DW")
  }
}

export function translateBirthday(villager){
  if(global.language==="French" || global.language==="French (US)"){
    return ("Anniversaire de " + villager)
  } else if(global.language==="Spanish" || global.language==="Spanish (US)"){
    return ("Cumpleaños de " + villager)
  } else {
    return (villager + "'s Birthday")
  }
}

export function translateIslandNameInputLabel1(){
  if (global.language==="French" || global.language==="French (US)"){
    return "de l'île";
  } else {
    return "of";
  }
}

export function translateIslandNameInputLabel2(){
  if (global.language==="French" || global.language==="French (US)"){
    return "";
  } else {
    return "Island";
  }
}

export function getDefaultLanguage(){
  //var languages = ["English", "English (Europe)","German","Spanish","Spanish (US)","French","French (US)","Italian","Dutch","Chinese","Chinese (Traditional)","Japanese","Korean","Russian"]

  var defaultLanguage = "English";
  if(Localization.locale.includes("en")){
    defaultLanguage = "English";
  } else if(Localization.locale.includes("fr")){
    defaultLanguage = "French";
  } else if(Localization.locale.includes("es")){
    defaultLanguage = "Spanish";
  } else if(Localization.locale.includes("it")){
    defaultLanguage = "Italian";
  } else if(Localization.locale.includes("zh")){
    defaultLanguage = "Chinese";
  } else if(Localization.locale.includes("ja")){
    defaultLanguage = "Japanese";
  } else if(Localization.locale.includes("ko")){
    defaultLanguage = "Korean";
  } else if(Localization.locale.includes("ru")){
    defaultLanguage = "Russian";
  }
  return defaultLanguage;
}

export function translateFilters(filters){
  var label = [];
  if(filters===undefined){
    return filters;
  }
  for(var i = 0; i<filters.length; i++){
    filters[i]["name"] = capitalizeFirst(attemptToTranslate(filters[i]["name"], true));
    for(var x = 0; x<filters[i]["children"].length; x++){
      filters[i]["children"][x]["name"] = capitalizeFirst(attemptToTranslate(filters[i]["children"][x]["name"], true));
    }
  }
  return filters;
}

export function translateDateRange(dateRange){
  if(dateRange.includes("-")){
    var dateRanges = dateRange.split(";");
    var dateOut = "";
    for(var i = 0; i<dateRanges.length; i++){
      var dateRangeSplit = dateRanges[i].split(" ")
      
      dateOut += doWeSwapDate()===true ? dateRangeSplit[1] + " " + attemptToTranslate(dateRangeSplit[0]) : attemptToTranslate(dateRangeSplit[0]) + " " + dateRangeSplit[1]
      dateOut += " - ";
      dateOut += doWeSwapDate()===true ? dateRangeSplit[4] + " " + attemptToTranslate(dateRangeSplit[3]) : attemptToTranslate(dateRangeSplit[3]) + " " + dateRangeSplit[4]
    }
    return dateOut;
  } else {
    var dateRanges = dateRange.split(/;| /);
    var dateOut = "";
    for(var i = 0; i<dateRanges.length; i++){
      dateOut += attemptToTranslate(dateRanges[i]) + " "
    }
    return dateOut;
  }
} 

export function getCurrentVillagerObjects(){
  const data = require("./assets/data/data.json");
  var currentVillagers = [];
  for(var i=0; i<global.collectionList.length; i++){
    if(global.collectionList[i].includes("villagerCheckList")){
      var villagerName = global.collectionList[i].replace("villagerCheckList","");
      for(var z=0; z<data["Villagers"].length; z++){
        if(data["Villagers"][z]["Name"]===villagerName){
          currentVillagers.push(data["Villagers"][z]);
        }
      }
    }
  }
  return currentVillagers;
}

function getAllVillagerPersonalities(){
  const data = require("./assets/data/data.json");
  var villagerPersonalities = [];
  var currentPersonality = "";
  for(var z=0; z<data["Villagers"].length; z++){
    currentPersonality = data["Villagers"][z]["Personality"];
    if(!villagerPersonalities.includes(currentPersonality)){
      villagerPersonalities.push(currentPersonality);
    }
  }
  return villagerPersonalities;
}

function getCurrentVillagerPersonalities(){
  var currentVillagers = getCurrentVillagerObjects();
  var villagerPersonalities = [];
  for(var z=0; z<currentVillagers.length; z++){
    villagerPersonalities.push(currentVillagers[z]["Personality"])
  }
  return villagerPersonalities;
}

export function getCurrentVillagerNamesString(){
  var currentVillagers = getCurrentVillagerObjects();
  var villagerNames = "";
  for(var z=0; z<currentVillagers.length; z++){
    villagerNames+=(currentVillagers[z]["NameLanguage"]) + ", ";
  }
  if(villagerNames===""){
    return "You have no favorite villagers."
  }
  return villagerNames.slice(0, -2);
}

export function getCurrentVillagerFilters(){
  var currentVillagers = getCurrentVillagerObjects();
  var allFilters = [];
  for(var i=0; i<currentVillagers.length; i++){
    allFilters.push("Source:" + currentVillagers[i]["Personality"] + " villagers");
    allFilters.push("Source:" + currentVillagers[i]["Personality"] + " villagers" + "; Tom Nook");
  }
  allFilters.push("Source:All villagers (while stung)");
  allFilters.push("Source:All villagers; Balloons");
  allFilters.push("Source:All villagers");
  allFilters = Array.from(new Set(allFilters));
  return allFilters;
}

export function getInverseVillagerFilters(string=false){
  var inversePersonalities = getAllVillagerPersonalities().filter(n => !getCurrentVillagerPersonalities().includes(n))
  var allFilters = [];
  var allFiltersString = "";
  for(var i=0; i<inversePersonalities.length; i++){
    allFilters.push("Source:" + inversePersonalities[i] + " villagers");
    allFilters.push("Source:" + inversePersonalities[i] + " villagers" + "; Tom Nook");
    if(string){
      allFiltersString+=attemptToTranslate(inversePersonalities[i])+", "
    }
  }
  if(string){
    return allFiltersString.slice(0, -2);
  } else {
    return allFilters
  }
}

export function findItemIDName(id, name){
  for(var dataSet = 0; dataSet < global.dataLoadedAll.length; dataSet++){
    for(var i = 0; i < global.dataLoadedAll[dataSet].length; i++){
      if(global.dataLoadedAll[dataSet][i].hasOwnProperty("Internal ID") && global.dataLoadedAll[dataSet][i]["Internal ID"]===id  && global.dataLoadedAll[dataSet][i]["Name"]===name){
        return global.dataLoadedAll[dataSet][i];
      }
    }
  }
}

// itemIDs={[
//   {
//     list:[...this.props.villager["Furniture List"].split(";"), ...this.props.villager["Kitchen Equipment"].split(',')[0], ...this.props.villager["DIY Workbench"].split(',')[0],],
//     key:"furnitureCheckList"
//   },
// ]}
export function compareItemID(itemIDs, currentItem){
  if(!currentItem.hasOwnProperty("Internal ID") || !currentItem.hasOwnProperty("checkListKey")){
    return false;
  }
  for(var i=0; i<itemIDs.length; i++){
    for(var x=0; x<itemIDs[i]["list"].length; x++){
      if((itemIDs[i]["list"][x]===currentItem["Name"]||itemIDs[i]["list"][x]===currentItem["Internal ID"]) && currentItem["checkListKey"].includes(itemIDs[i]["key"])){
        return true;
      }
    }
  }
  return false;
}

export function getEventName(eventNameInput){
  // var eventName = "";
  // if(eventNameInput.includes("(ready days)")){
    // eventName = attemptToTranslate(attemptToTranslateItem(eventNameInput.replace(" (ready days)",""))) + " " + attemptToTranslate("Ready Days")
  // } else if (eventNameInput.includes("(") && eventNameInput.includes(")")){
  //   var withinBrackets = eventNameInput.match(/\((.*?)\)/);
  //   eventName = attemptToTranslate(attemptToTranslateItem(eventNameInput.replace(" "+withinBrackets[0],""))) + " (" + attemptToTranslate(withinBrackets[1]) + ")"
  // } else {
  //   eventName = attemptToTranslate(attemptToTranslateItem(eventNameInput))
  // }
  var eventName = attemptToTranslate(eventNameInput, true);
  return eventName
}