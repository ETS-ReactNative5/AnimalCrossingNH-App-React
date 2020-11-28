import React, {Component} from 'react';
import {Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';

const art = require("../assets/data/art.json");
const fencing = require("../assets/data/fencing.json");
const reactions = require("../assets/data/reactions.json");

const width = { width: Dimensions.get('window').width };

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white', height:'100%', opacity: 0.3, borderRadius: 10 }}
    style={{ backgroundColor: 'black'}}
    getLabelText={({ route }) => route.title}
  />
);

const FirstRoute = () => (
  <ListPage 
    data={[reactions]}
    showVariations={false}
    title="Reactions"
    imageProperty={["Image"]}
    textProperty={["Name"]}
    checkListKey={[["emojiCheckList","Name"]]}
    searchKey={[["Name"]]}
  />
  
);

const SecondRoute = () => (
  <ListPage 
    data={[art,fencing]}
    showVariations={false}
    title="Art"
    imageProperty={["Image","Image"]}
    textProperty={["Name","Name"]}
    checkListKey={[["artCheckList","Name","Genuine"],["fenceCheckList","Name"]]}
    searchKey={[["Name","Genuine"],["Name"]]}
  />
);

class TabsPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Reactions' },
        { key: 'second', title: 'Art' },
      ],
    }
  }
  handleIndexChange = index => this.setState({index});
  render(){
    return(
      <TabView
        lazy
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={this.handleIndexChange}
        initialLayout={width}
        renderTabBar={renderTabBar}
      />
    )
  }
}
export default TabsPage;