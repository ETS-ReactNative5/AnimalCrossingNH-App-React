import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';

export default class AmiiboPage extends Component {
  render(){
    return(
      <ListPage 
        tabs={false}
        disablePopup={[true, true, true, true, true, true, true]}
        title="Amiibo Cards"
        imageProperty={["image","image","image","image","image","image","image","image"]}
        textProperty={["NameLanguage","NameLanguage","NameLanguage","NameLanguage","NameLanguage","NameLanguage","NameLanguage","NameLanguage"]}
        textProperty2={["number","number","number","number","number","number","number","number"]}
        searchKey={[["NameLanguage","number"],["NameLanguage","number"],["NameLanguage","number"],["NameLanguage","number"],["NameLanguage","number"],["NameLanguage","number"],["NameLanguage","number"],["NameLanguage","number"]]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedAmiibo"}
        appBarColor={colors.amiiboAppBar[global.darkMode]}
        titleColor={colors.textBlack[global.darkMode]}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
        extraInfo={
          {
            type:"guideRedirect",
            title:"Guide + FAQ",
            content:"You can read more about Amiibo cards by visiting the guide page",
            linkText: "Tap here to read about Amiibo cards",
            redirectPassBack: "amiiboRedirect"
          }
        }
        setPage={this.props.setPage}
      />
    )
  }
}
