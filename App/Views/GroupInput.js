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
import * as GroupAction from '../Actions/GroupAction';

export default class GroupInput extends React.Component{
  static navigationOptions = ({navigation}) => {
    return{
      title:'GroupInput'
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
            <Input placeholder='Group Name'
              onChangeText={(text)=>this.setState({text})}
              value={this.state.text}/>
          </InputGroup>
          <Button full
            onPress={()=>this.addGroup()}>
            <Text>保存</Text>
         </Button>
        </Content>
      </Container>
    )
  }
  addGroup(){
    const item = {
      name:this.state.text
    }
    GroupAction.createGroup(item);
  }
}
