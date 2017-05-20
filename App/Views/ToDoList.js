'use strict';

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  List,
  ListItem
} from 'native-base'
import {ListView} from 'realm/react-native';
import ToDoStore from '../Stores/ToDoStore';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalStyle from '../Styles/GlobalStyle';
import {NavigationActions} from 'react-navigation';

export default class ToDoList extends React.Component{
  static navigationOptions = ({navigation})=>{
    const {navigate} = navigation;
    return{
      title:'ToDoList',
      headerRight:(
        <TouchableOpacity
          onPress={()=>{
            navigate('ToDoInput');
          }}>
          <Icon name='plus' style={[GlobalStyle.iconView,GlobalStyle.rightView]}/>
        </TouchableOpacity>
      ),
      headerLeft:(
        <TouchableOpacity
          style={GlobalStyle.leftView}
          onPress={()=>{
              //navigate('Group');
          }}>
          <Text style={[GlobalStyle.linkView]}>Groups</Text>
        </TouchableOpacity>
      )
    }
  }
  constructor(props){
    super(props);
    let dataSource=new ListView.DataSource({
      rowHasChanged(a,b){
        //ToDo名が異なる場合にのみ
        return a.name !== b.name;
      }
    });
    this.state={
      todos:ToDoStore.getAll()
    }
  }
  componentWillMount(){
    ToDoStore.on('change',()=>{
      this.setState({
        todos:ToDoStore.getAll()
      })
    })
  }
  render(){
    return(
      <View>
        <List
          dataArray={this.state.todos}
          renderRow={this.renderRow}/>
      </View>
    )
  }
  renderRow(item,sectionIndex,rowIndex){
    return(
      <ListItem>
        <Text>{item.name}</Text>
      </ListItem>
    )
  }
}
