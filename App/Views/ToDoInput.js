import React from 'react';
import {
  Text,
  TouchableOpacity
}from 'react-native';
import {
  Container,
  Content,
  InputGroup,
  Input,
  Button
} from 'native-base';
import {NavigationActions} from 'react-navigation';
import GlobalStyle from '../Styles/GlobalStyle';
import * as ToDoAction from '../Actions/ToDoAction';

export default class ToDoInput extends React.Component{
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    const link = params?params.saveMode?GlobalStyle.linkView:null:null;
    return{
      title:'ToDoInput',
      headerRight:(
        <TouchableOpacity onPress = {
          () => {
            let {params} = navigation.state;
            params.saveFunction();
            navigation.goBack();
          }
        }>
          <Text style={[GlobalStyle.rightView,link]}>
            Save
          </Text>
        </TouchableOpacity>
      )
    }
  }
  constructor(props){
    super(props);
    this.state={
      text:''
    }
    props.navigation.setParams({
      saveFunction:this.addToDo.bind(this)
    });
  }
  render(){
    return(
      <Container>
        <Content>
          <InputGroup regular>
            <Input placeholder='ToDo Name'
              onChangeText={(text)=>this.onChangeText(text)}
              value={this.state.text}/>
          </InputGroup>
        </Content>
      </Container>
    )
  }
  onChangeText(text){
    this.setState({text:text});
    this.props.navigation.setParams({
      saveMode:text.length==0?false:true
    });
  }
  addToDo(){
    const item = {
      name:this.state.text
    }
    ToDoAction.addToDo(item);
  }
}
