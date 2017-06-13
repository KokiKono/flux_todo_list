import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Card,
  CardItem,
  Left,
  Body
} from 'native-base';
import {
  NavigationActions
} from 'react-navigation';
import GlobalStyle from '../Styles/GlobalStyle';
import ToDoStore from '../Stores/ToDoStore';
import ScrollableImageView from './Common/ScrollableImageView';
import MapView from 'react-native-maps';
import {PROVIDER_DEFAULT} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

export default class ToDoDetail extends React.Component {

  static navigationOptions = ({navigation}) => {
    const {
      navigate
    } = navigation;
    return {
      title:  'ToDo Detail',
      headerRight: (
        <TouchableOpacity
          onPress={()=>{
            navigate('ToDoEdit',{item:navigation.state.params.item});
          }}>
          <Text style={[GlobalStyle.rightView,GlobalStyle.linkView]}>Edit</Text>
        </TouchableOpacity>
      )
    }
  }
  constructor(props){
    super(props);
    this.state={
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      ,markers:[]
    }
  }
  componentWillMount(){
    ToDoStore.on('ToDoStore.change',()=>{
      this.forceUpdate();
    })
  }
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: this.randomColor(),
        },
      ],
    });
  }
  _addMarker(latitude,longitude){
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: {
             latitude:latitude,
             longitude:longitude
          },
          key: id++,
          color: this.randomColor(),
        }
      ],
    })
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        console.log(position.coords.latitude,position.coords.longitude);
      },
      (error)=>{
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }
  render() {
    let todo= this.props.navigation.state.params.item;
    return (
      <Container>
        <Content >
          <ToDoItem
            title='ToDo Name'
            value={todo.name}/>
          <View style={{backgroundColor:'#dcdcdc',padding:5,paddingTop:10}}>
            <Text style={{fontSize:15,fontWeight:'300',textAlign:'left'}}>
              save images
            </Text>
          </View>
          <ScrollableImageView
            images={todo.images}
            detail={(image,index)=>{
              this._addMarker(image.latitude,image.longitude)
            }}
            />
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <MapView
              provider={PROVIDER_DEFAULT}
              style={{width:width-20,height:height/2.5}}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              followsUserLocation={true}
              showsUserLocation={true}
              onPress={(e) => this.onMapPress(e)}
            >
              {
                 this.state.markers.map(marker=>(
                   <MapView.Marker
                      key={marker.key}
                      title="This is a title"
                      description="This is a description"
                      coordinate={marker.coordinate}
                      pinColor={marker.color}
                    />
                ))
              }
            </MapView>
          </View>

        </Content>
      </Container>
    );
  }
  randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
}
class ToDoItem extends React.Component{
  render(){
    return(
      <View>
        <View style={{backgroundColor:'#dcdcdc',padding:5,paddingTop:10}}>
          <Text style={{fontSize:15,fontWeight:'300',textAlign:'left'}}>
            {this.props.title}
          </Text>
        </View>
        <View style={{padding:5,borderBottomWidth:1,borderColor:'#dcdcdc'}}>
          <Text style={{fontSize:20,fontWeight:'300',textAlign:'left'}}>{this.props.value}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todo_item:{
    fontSize:20,
    backgroundColor:'#dfd'
  },
});
