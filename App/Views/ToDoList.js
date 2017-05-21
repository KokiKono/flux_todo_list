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
  ListItem
} from 'native-base'
import {ListView} from 'realm/react-native';
import ToDoStore from '../Stores/ToDoStore';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalStyle from '../Styles/GlobalStyle';
import {NavigationActions} from 'react-navigation';
import {SwipeListView,SwipeRow} from 'react-native-swipe-list-view';
import * as ToDoAction from '../Actions/ToDoAction';
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
    this.state={
      todos: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    }
  }
  componentWillMount(){
    ToDoStore.on('change',()=>{
      this.setState({
        todos:this.state.todos.cloneWithRows(ToDoStore.getAll())
      });
    })
    this.setState({
      todos:this.state.todos.cloneWithRows(ToDoStore.getAll())
    });
  }
  render(){
    return(
      <View>
        <ListView
          dataSource={this.state.todos}
          renderRow={this.renderRow}/>
      </View>
    );
  }
  renderRow(item,sectionIndex,rowIndex){
    return(
      <View style={styles.standalone}>
					<SwipeRow
						leftOpenValue={75}
						rightOpenValue={-150}
					>
						<View style={styles.standaloneRowBack}>
            <Text>Left</Text>
            <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                  <Text style={styles.backTextWhite}>Right</Text>
                </View>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={()=>{
                    ToDoAction.deleteToDo(item);
                  }}>
                  <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
						</View>
						<View style={styles.standaloneRowFront}>
							<Text>{item.name}</Text>
						</View>
					</SwipeRow>
				</View>
    )
  }
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	standalone: {
    borderBottomColor: '#CFCFCF',
    borderBottomWidth: 1
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
});
