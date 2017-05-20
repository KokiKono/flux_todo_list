import React from 'react';
import {
  Text
}from 'react-native';
import {
  Container,
  Content,
  InputGroup,
  Input,
  Button
} from 'native-base';
import {NavigationActions} from 'react-navigation';
import * as ToDoAction from '../Actions/ToDoAction';

export default class ToDoInput extends React.Component{
  static navigationOptions = ({navigation}) => {
    return{
      title:'ToDoInput'
    }
  }
  constructor(props){
    super(props);
    this.state={
      text:''
    }
  }
  render(){
    return(
      <Container>
        <Content>
          <InputGroup regular>
            <Input placeholder='ToDo Name'
              onChangeText={(text)=>this.setState({text})}
              value={this.state.text}/>
          </InputGroup>
          <Button full
            onPress={()=>this.addToDo()}>
            <Text>保存</Text>
         </Button>
        </Content>
      </Container>
    )
  }
  addToDo(){
    const item = {
      name:this.state.text
    }
    ToDoAction.addToDo(item);
  }
}
