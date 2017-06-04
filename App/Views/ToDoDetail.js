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

export default class ToDoDetail extends React.Component {

  static navigationOptions = ({navigation}) => {
    const {
      navigate
    } = navigation;
    return {
      title:  'ToDo Edit',
      headerRight: (
        <TouchableOpacity
          onPress={()=>{
            console.log('ToDo Edit',navigation.state.params.item);
            navigate('ToDoEdit',{item:navigation.state.params.item});
          }}>
          <Text style={[GlobalStyle.rightView,GlobalStyle.linkView]}>Edit</Text>
        </TouchableOpacity>
      )
    }
  }
  componentWillMount(){
    ToDoStore.on('ToDoStore.change',()=>{
      this.forceUpdate();
    })
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
          <ScrollableImageView images={todo.images}/>
        </Content>
      </Container>
    );
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
class ToDoItemImages extends React.Component{
  render(){
    return(
      <View>
        <View style={{backgroundColor:'#dcdcdc',padding:5,paddingTop:10}}>
          <Text style={{fontSize:15,fontWeight:'300',textAlign:'left'}}>
            save images
          </Text>
        </View>
        <View style={{padding:5,borderBottomWidth:1,borderColor:'#dcdcdc'}}>
          <ScrollView
            horizontal={true}>
          { this.renderScrollImageView() }
          </ScrollView>
        </View>
      </View>
    );
  }
  renderScrollImageView(){
    let todo = this.props.navigation.state.params.item;
    return todo.images.map((images,index)=>{
      return(
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>Title</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem caedBody>
            <Image
              source={images}
              style={{width:150,height:150}}/>
          </CardItem>
        </Card>
      );
    });
  }
}

const styles = StyleSheet.create({
  todo_item:{
    fontSize:20,
    backgroundColor:'#dfd'
  },
});
