import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Label,
  Item,
  Input
} from 'native-base';
import {
  NavigationActions
} from 'react-navigation';
import GlobalStyle from '../Styles/GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRollPicker from 'react-native-camera-roll-picker';
import ImagePicker from 'react-native-image-picker';
import * as DraftToDoAction from '../Actions/DraftToDoAction';
import DraftToDoStore from '../Stores/DraftToDoStore';
import * as ToDoAction from '../Actions/ToDoAction';
import ToDoStore from '../Stores/ToDoStore'
import ScrollableImageView from './Common/ScrollableImageView';

export default class ToDoEdit extends React.Component {

  static navigationOptions = ({navigation}) => {
    const {
      navigate
    } = navigation;
    console.log(navigation);
    return {
      title:  'ToDo Edit',
      headerRight: (<SaveIcon
        {...navigation}/>)
    }
  }
  constructor(props){
    super(props);
    this.state={
      avatarSource:[],
      draftToDo:null
    }
    //copy todo objects
    let realmToDo = props.navigation.state.params.item;
    let copyToDo = new CopyToDo(realmToDo);
    DraftToDoStore.updateDraft(copyToDo);
  }

  componentWillMount() {
    DraftToDoStore.on('DraftToDoStore.change',()=>{
      this.updateState();
    })
    this.updateState();
  }

  updateState(){
    this.setState({
      draftToDo:DraftToDoStore.getDraft()
    })
  }

  render() {
    return (
      <Container>
        <Content >
          <Form>
            <Item>
              <Input
                placeholder='ToDo名'
                value={this.state.draftToDo.name}
                onChangeText={(text)=>{
                  DraftToDoAction.changeToDoName(text);
                }}/>
            </Item>
            <Item>
              <ScrollableImageView
                images={this.state.draftToDo.images}
                onPressCamera={ this.onWillSelectCamera.bind(this) }/>
            </Item>
          </Form>

        </Content>
      </Container>
    );
  }
  onWillSelectCamera(){
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
      skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }else {
        let source = { uri: response.uri };
        DraftToDoAction.addDraftImage(source);
      }
    });
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
class SaveIcon extends React.Component{
  render(){
    return(
      <TouchableOpacity onPress = {
        () => {
          ToDoAction.updateToDo(DraftToDoStore.getDraft());
          this.props.goBack(null);
        }
      }>
        <Text style={[GlobalStyle.linkView,GlobalStyle.rightView]}>
          Save
        </Text>
      </TouchableOpacity>
    );
  }
}

const CopyToDo = function(item){
  this.id=item.id;
  this.name=item.name;
  this.images=item.images.map((image,index)=>{
    return new CopyToDoImage(image);
  });
}
const CopyToDoImage=function(image){
  this.id=image.id;
  this.title=image.title;
  this.source=image.source;
  this.uri=image.uri;
}
const styles = StyleSheet.create({
  todo_item:{
    fontSize:20,
    backgroundColor:'#dfd'
  },
});
