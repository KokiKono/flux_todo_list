import Realm from 'realm';

class ToDo extends Realm.Object{}
ToDo.schema={
  name:'ToDo',
  properties:{
    id:'int',
    name:'string'
  }
};
class Group extends Realm.Object{}
Group.schema={
  name:'Group',
  properties:{
    id:'int',
    name:'string',
    todos:{type:'list',objectType:'ToDo',default:null}
  }
};

export default new Realm({
  schema:[ToDo,Group],
  schemaVersion:1,
  migration:function(oldRealm,newRealm){
    //ToDoオブジェクトにidを追加
    var oldToDo = oldRealm.objects('ToDo');
    var newToDo = newRealm.objects('ToDo');
    for(var index=0;index<oldToDo.length;index++){
      newToDo[index].id = index+1;
    }
  }
});
