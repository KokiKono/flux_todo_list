import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ToDoList from './Views/ToDoList';
import ToDoInput from './Views/ToDoInput';
import GroupList from './Views/GroupList';
import GroupInput from './Views/GroupInput';
import ToDoEdit from './Views/ToDoEdit';
import ToDoDetail from './Views/ToDoDetail';


const App = StackNavigator({
  ToDoList:{screen:ToDoList},
  ToDoInput:{screen:ToDoInput},
  GroupList:{screen:GroupList},
  GroupInput:{screen:GroupInput},
  ToDoEdit:{screen:ToDoEdit},
  ToDoDetail:{screen:ToDoDetail}
},
{
  mode:false,
  isSave:false
});

AppRegistry.registerComponent('FluxToDoList',()=>App);
