import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ToDoList from './Views/ToDoList';
import ToDoInput from './Views/ToDoInput';

const App = StackNavigator({
  ToDoList:{screen:ToDoList},
  ToDoInput:{screen:ToDoInput}
});

AppRegistry.registerComponent('FluxToDoList',()=>App);
