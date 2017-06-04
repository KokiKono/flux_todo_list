import Realm from 'realm';

class ToDo extends Realm.Object{}
ToDo.schema={
  name:'ToDo',
  properties:{
    id:'int',
    name:'string',
    images:{type:'list',objectType:'Image',default:null}
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
class Image extends Realm.Object{}
Image.schema={
  name:'Image',
  properties:{
    id:'int',
    title:'string',
    source:{type:'data',optional:true},
    uri:'string'
  }
}

export default new Realm({
  schema:[ToDo,Group,Image],
  schemaVersion:1,
  migration:function(oldRealm,newRealm){

  }
});
