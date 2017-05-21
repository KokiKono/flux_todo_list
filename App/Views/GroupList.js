'use strcit';

import React from 'react';
import {ListView} from 'realm/react-native';
import GroupStore from '../Stores/GroupStore';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  ListItem
} from 'native-base';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalStyle from '../Styles/GlobalStyle';
import {NavigationActions} from 'react-navigation';

export default class GroupList extends React.Component{
  static navigationOptions = ({navigation})=>{
    const {navigate} = navigation;
    return{
      title:'GroupList',
      headerRight:(
        <TouchableOpacity
          onPress={()=>{
            navigate('GroupInput');
          }}>
          <Icon
              name='plus' style={[GlobalStyle.iconView,GlobalStyle.rightView]}/>
        </TouchableOpacity>
      )
    }
  }
  constructor(props){
    super(props);
    this.state={
      dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    }
  }
  componentWillMount(){
    GroupStore.on('change',()=>{
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(GroupStore.getAll())
      });
    });
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(GroupStore.getAll())
    });
  }
  render(){
    return(
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
  renderRow(item,sectionIndex,rowIndex){
    return(
      <ListItem>
        <Text>{item.name}</Text>
      </ListItem>
    );
  }
}
