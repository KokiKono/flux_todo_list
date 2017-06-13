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
    source:{type:'string',optional:true},
    uri:'string',
    origURL:{type:'string',default:'',optional:true},
    path:{type:'string',default:'',optional:true},
    data:{type:'data',optional:true},
    fileName:{type:'string',default:'',optional:true},
    fileSize:{type:'int',default:-1,optional:true},
    width:{type:'int',default:-1,optional:true},
    height:{type:'int',default:-1,optional:true},
    isVertical:{type:'bool',default:false,optional:true},
    latitude:{type:'double',default:0,optional:true},
    longitude:{type:'double',default:0,optional:true},
    timestamp:{type:'date',default:null,optional:true}
  }
}

export default new Realm({
  schema:[ToDo,Group,Image],
  schemaVersion:10,
  migration:function(oldRealm,newRealm){

  }
});
