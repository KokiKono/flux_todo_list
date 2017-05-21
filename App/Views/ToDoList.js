'use strict';

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import {
  List,
  ListItem,
  Button
} from 'native-base'
import {ListView} from 'realm/react-native';
import ToDoStore from '../Stores/ToDoStore';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalStyle from '../Styles/GlobalStyle';
import {NavigationActions} from 'react-navigation';
import {SwipeListView,SwipeRow} from 'react-native-swipe-list-view';
import Swipeout from 'react-native-swipeout';
import * as ToDoAction from '../Actions/ToDoAction';
import Drawer from 'react-native-drawer';
import GroupList from './GroupList';

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
              navigate('GroupList');
          }}>
          <Text style={[GlobalStyle.linkView]}>Groups</Text>
        </TouchableOpacity>
      )
    }
  }

  constructor(props){
    super(props);
    this.state={
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    }
  }
  componentWillMount(){
    ToDoStore.on('change',()=>{
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(ToDoStore.getAll())
      });
    });
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(ToDoStore.getAll())
    });
  }
  render(){
    return(
      <Drawer
        ref={c => this.drawer = c}
        type="overlay"
        tapToClose={true}
        panCloseMask={0.5}
        styles={drawerStyles}
        openDrawerOffset={0.3}
        panOpenMask={0.5}
        side='right'
        content={<GroupList/>}
        >
        <ToDoListView
          dataSource={this.state.dataSource}/>
      </Drawer>
    );
  }
}
class ToDoListView extends React.Component{
  render(){
    return(
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
  renderRow(item,sectionIndex,rowIndex){
    let swipeType = {
      right:[
        {
          text:'削除',
          type: 'delete',
          onPress:()=>{
            ToDoAction.deleteToDo(item)
          }
        }
      ]
    };
    return(
      <Swipeout
        right={swipeType.right}
        rowID={rowIndex}
        sectionIndex={sectionIndex}
        autoClose={true}
        >
        <ListItem>
          <Text>{item.name}</Text>
        </ListItem>
      </Swipeout>
    )
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
