import React, {Component} from 'react';
import {Image, ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';
import TextFont from '../components/TextFont'
import {MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"
import {AccordionContainerCustom} from "../components/AccordionContainer"
import {InfoLineBeside, InfoLine} from "../components/BottomSheetComponents"

class MysteryIslandsPage extends Component {
  render(){
    return(
      <ScrollView style={{backgroundColor:colors.background[global.darkMode]}}>
        <View style={{marginTop: 100}}/>
        <Header>Mystery Islands</Header>
        <View style={{marginTop: 10}}/>
        {
          mysteryIslandsData.map((island, index) => (
            <MysteryIslandsComponent key={island.name} island={island}/>
          ))
        }
        <View style={{marginTop: 30}}/>
      </ScrollView>
    )
  }
}
export default MysteryIslandsPage;

class MysteryIslandsComponent extends Component {
  render(){
    var sections = [
      {
        title: 'View info',
      }
    ]
    return(
      <View style={{borderRadius:9, backgroundColor:colors.white[global.darkMode], padding:30, marginVertical: 6, marginHorizontal:"4%", justifyContent:"center", alignItems:"center",}}>
        <Image style={{resizeMode:'contain', width:"100%", borderRadius:2}} source={this.props.island.picture}/>
        <View style={{height:5}}/>
        <TextFont bold={true} style={{marginTop:10, fontSize: 25, color: colors.textBlack[global.darkMode]}}>{this.props.island.name}</TextFont>
        <View style={{height:5}}/>
        <InfoLineBeside
          image1={require("../assets/icons/dice.png")} 
          item1={this.props.island}
          textProperty1={["chance"]}
          image2={require("../assets/icons/clockIcon.png")} 
          item2={this.props.island}
          textProperty2={["maxDailyVisit"]}
        />
        <InfoLine
          image={require("../assets/icons/lock.png")} 
          item={this.props.island}
          textProperty={["requires"]}
        />
        <TextFont bold={false} style={{marginTop:4, fontSize: 20, color: colors.textBlack[global.darkMode]}}>{this.props.island.description}</TextFont>
      </View>
    )
  }
}

const mysteryIslandsData = [
  {
    "id" : "0",
    "picture" : require("../assets/icons/islands/0.png"),
    "name" : "Island #0",
    "chance" : "9%",
    "description" : "A fairly normal island which you can get on your first tour, with one cliff, native fruit, coconuts, a river and a pond.",
  },
  {
    "id" : "1",
    "picture" : require("../assets/icons/islands/1.png"),
    "chance" : "9%",
    "name" : "Island #1",
    "description" : "Practically the same as Island #0, but without the pond, and with a slightly bigger cliff.",
  },
  {
    "id" : "2",
    "picture" : require("../assets/icons/islands/2.png"),
    "chance" : "9%",
    "name" : "Spiral Island",
    "description" : "Somewhat more interesting in layout but it has nothing special about the resources you can get.",
  },
  {
    "id" : "4",
    "picture" : require("../assets/icons/islands/4.png"),
    "chance" : "9%",
    "name" : "Fidget Spinner Island",
    "description" : "The last of the four starter islands. No river, just a pond and the sea.",
  },
  {
    "id" : "6",
    "picture" : require("../assets/icons/islands/6.png"),
    "chance" : "9%",
    "name" : "Mountain Island",
    "description" : "Multiple levels, no river. The base level has regular trees, the middle level has your native fruit, and the top level has five rocks with materials. \nInsects: pill bug, centipede.",
    "requires" : "Ladder",
  },
  {
    "id" : "7",
    "picture" : require("../assets/icons/islands/7.png"),
    "chance" : "5%",
    "name" : "Bells Island",
    "description" : "Breaking the rock at the far north will let you vault over into the island with five money rocks on it. \nInsects: pill bug, centipede.",
    "requires" : "Town Hall, Vaulting Pole",
  },
  {
    "id" : "8",
    "picture" : require("../assets/icons/islands/8.png"),
    "chance" : "5%",
    "name" : "Bamboo Island",
    "description" : "Every tree on this island is bamboo and you can get to it at any time of year. The most common island you can get out of the 20, statistically.",
  },
  {
    "id" : "10",
    "picture" : require("../assets/icons/islands/10.png"),
    "chance" : "9%",
    "name" : "Fruit Island",
    "description" : "There are 19 fruit trees on this island and all will be your 'sister fruit'. This will be different from your native fruit - but every time you come here, it will be the same one.",
  },
  // {
  //   "id" : "11",
  //   "picture" : require("../assets/icons/islands/11.png"),
  //   "chance" : "2%",
  //   "name" : "Flower Island",
  //   "description" : "This island has a pond surrounded by rare flowers and the only insects that will spawn are those that hang around flowers.",
  // },
  {
    "id" : "12",
    "picture" : require("../assets/icons/islands/12.png"),
    "chance" : "2%",
    "name" : "Money Rock Island 2",
    "description" : "There are four small triangular cliffs, one in each corner, and the ground level is full of flowers and 7 money rocks. \nInsects: scorpion.",
    "requires" : "Town Hall",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "13",
    "picture" : require("../assets/icons/islands/13.png"),
    "chance" : "2%",
    "name" : "Tarantula Island",
    "description" : "Yes, the infamous one. The only insects that spawn here are tarantulas (as long as it is night time in a Tarantula month), and the 7 rocks have crafting materials if you can get to them. The river is thin enough that you can jump over it without a vaulting pole.",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "14",
    "picture" : require("../assets/icons/islands/14.png"),
    "chance" : "2%",
    "name" : "Tree Island",
    "description" : "This island has no river or pond and has tons of hardwood and coconut trees, and the only insects that spawn are those that are associated with trees. \nInsects: Atlas moth, walking stick, earth-boring dung beetle, scarab beetle, miyama stag, saw stag, giant stag, rainbow stag, cyclommatus stag, golden stag, horned dynastid, horned atlas, horned elephant, horned hercules, goliath beetle, drone beetle, giraffe stag, blue weevil beetle.",
    "requires" : "Town Hall, Ladder",
    "maxDailyVisit" : "1 visit/day",
  },
  // {
  //   "id" : "16",
  //   "picture" : require("../assets/icons/islands/16.png"),
  //   "chance" : "3%",
  //   "name" : "Big Fish Island",
  //   "description" : "This island has rare hybrid flowers and the only fish available are larger ones, including some of the more rare ones.",
  //   "requires" : "Town Hall, Ladder",
  // },
  {
    "id" : "17",
    "picture" : require("../assets/icons/islands/17.png"),
    "chance" : "1%",
    "name" : "Tree Island 2",
    "description" : "This island is exactly the same as Bamboo Island but the trees are all just regular hardwood trees. \nInsects: Atlas moth, walking stick, earth-boring dung beetle, scarab beetle, miyama stag, saw stag, giant stag, rainbow stag, cyclommatus stag, golden stag, horned dynastid, horned atlas, horned elephant, horned hercules, goliath beetle, drone beetle, giraffe stag, blue weevil beetle.",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "18",
    "picture" : require("../assets/icons/islands/18.png"),
    "chance" : "5%",
    "name" : "Curly River Island",
    "description" : "There is one square cliff at the north east, a few flowers and rocks and a small amount of fruit trees. Only insects associated with water spawn here. \nInsects: red dragonfly, darner dragonfly, banded dragonfly, pondskater, diving beetle, giant water bug, damselfly",
  },
  {
    "id" : "19",
    "picture" : require("../assets/icons/islands/19.png"),
    "chance" : "2%",
    "name" : "Big Fish Island 2",
    "description" : "This rare island only spawns big fish. Otherwise it is quite normal, with less flowers and a lower chance of appearing than the other big fish island. \nFish: L (arowana, saddled bichir, snapping turtle, soft-shelled turtle, black bass, carp, catfish, koi, giant snakehead, salmon, red snapper, football fish), LL (dorado, pike, stringfish, gar, king salmon, ray, mahi-mahi, sea bass, olive flounder, giant trevally), LLL (arapaima, sturgeon, blue marlin, coelacanth, Napoleonfish, tuna, oarfish).",
    "requires" : "Vaulting Pole",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "20",
    "picture" : require("../assets/icons/islands/20.png"),
    "chance" : "5%",
    "name" : "Trash Island",
    "description" : "Everything you can fish here is trash. Only water-related insects spawn. \nInsects: red dragonfly, darner dragonfly, banded dragonfly, pondskater, diving beetle, giant water bug, damselfly. \nFish: Trash.",
    "requires" : "Ladder",
  },
  {
    "id" : "21",
    "picture" : require("../assets/icons/islands/21.png"),
    "chance" : "1%",
    "name" : "Fins Island",
    "description" : "EA rectangular pond with rectangular cliffs inside, the tallest one being too tall to climb up to. The only fish that spawn here are the largest finned fish. \nFish: J (great white shark, hammerhead shark, whale shark, saw shark, ocean sunfish), K (suckerfish).",
    "requires" : "Town Hall, Vaulting Pole, Ladder",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "23",
    "picture" : require("../assets/icons/islands/23.png"),
    "chance" : "5%",
    "name" : "Falls Island",
    "description" : "Lots of cliffs, waterfalls and river forks. Normal resource spawns.",
    "requires" : "Ladder",
  },
  {
    "id" : "24",
    "picture" : require("../assets/icons/islands/24.png"),
    "chance" : "1%",
    "name" : "Gold Island",
    "description" : "A very rare island with flowers, scorpions and a rectangular pond. If you climb up onto the cliff and climb down from the back, you can vault over to a tiny island in the middle and get 8 gold nuggets from a single rock. \nInsects: scorpion.",
    "requires" : "Town Hall, Vaulting Pole, Ladder",
    "maxDailyVisit" : "1 visit/day",
  },

]