'use strcit';

import React from 'react';
import {ListView} from 'realm/react-native';

export default class GroupList extends React.Component{
  static navigationOptions = ({navigation})=>{
    return{
      title:'GroupList'
    }
  }
  constructor(props){
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged(a,b){
        return a.id !== b.id;
      }
    });
    this.state={
      groups:
    }
  }
}
