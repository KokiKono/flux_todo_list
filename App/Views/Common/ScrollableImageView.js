import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput
} from 'react-native'
import {
  Card,
  CardItem,
  Left,
  Body,
  Spinner,
  Input,
  ActionSheet,
  Form
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'react-native-fetch-blob';
import DialogAndroid from 'react-native-dialogs';

const DefaultStyle={width:150,height:150};
const CardItemStyle={width:150,flex:1,justifyContent: 'center',alignItems: 'center'};
/**
* 横方向のスクロール式imageクラス
* Props list.
* Title : react-native.Text,native-base.Input
* Image : react-native.Image
* Spinner : native-base.Spinner
* Required Props
* images object:{title:string,origURL:iOSPath,path:AndroidPath}
* Optional (default)
* titleStyle:Cardのタイトル部分に使うstyle (width:120,fontSize:20)
* onPressCamera():callback関数、propsに渡すとカメラアイコン付itemが追加される。
*                 そのpressイベント関数 (null)
* cardItemStyle:各写真ごとのstyle (width:150,flex:1,justifyContent: 'center',alignItems: 'center')
* cameraIconStyle:(color:'#007AFF',fontSize:100)
* edit:編集可能な画面か。editを付与するとcardItemにpress関数がつく。(null)
* onDelete(image,index):editモードでの単品削除関数
* onPressCardItem(image,index):(null)
* spinnerColor:(palevioletred)
* spinnerStyle:native-base spinner Componentのスタイル(width:150,height:150)
* errorViewStyle:(width:150,height:150)
* errIconStyle:(fontSize:40,color:'red')
* errorMessage:(読み込みに失敗しました)
* onEndEditing(image,index,newTitle):編集モードでのタイトルからフォーカスアウトした時。(null)
*/
export default class ScrollableImageView extends React.Component{
  render(){
    return(
      <View style={{padding:5,borderBottomWidth:1,borderColor:'#dcdcdc'}}>
        <ScrollView
          horizontal={true}>
        { this.renderScrollImageView() }
        { this.props.onPressCamera?this.renderSelectImage():null }
        </ScrollView>
      </View>
    );
  }
  renderScrollImageView(){
      return !this.props.images?null:
      this.props.images.map((image,index)=>{
      return(
        <Card
        key={index}>
          <TitleImageView
            image={image}
            index={index}
            title={image.title}
            titleStyle={this.props.titleStyle?this.props.titleStyle:{width:120,fontSize:20}}
            defaultValue={image.title}
            {...this.props}/>
        </Card>
      );
    });
  }
  renderSelectImage(){
    return(
      <Card key={99999}>
        <CardItem
          cardBody
          button
          onPress={()=>{
            this.props.onPressCamera?this.props.onPressCamera():null;
          }}
          style={this.props.cardItemStyle?this.props.cardItemStyle:CardItemStyle}>
          <Ionicons name = 'ios-camera-outline'
            style = {this.props.cameraIconStyle?this.props.cameraIconStyle:{color:'#007AFF',fontSize:100}}/>
        </CardItem>
      </Card>
    )
  }

}
class TitleImageView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isEdit:false
    }
  }
  render(){
    return(
      <View
        style={{alignItems:'center',justifyContent:'center'}}>
        <CardItem>
          <Left>
            <Body>
              {
                this.state.isEdit?
                <InputTitle
                  editEnable={()=>{
                    this.setState({isEdit:false});
                  }}
                  {...this.props}/>:
                  <Text style={this.props.titleStyle}>{this.props.title}</Text>
              }
            </Body>
          </Left>
        </CardItem>
        <CardItem
          cardBody
          button
          onPress={()=>{
          if(this.props.edit){
            this.actionSheetShow(this.props.image,this.props.index);
          }
          if(this.props.detail){
            this.props.detail(this.props.image,this.props.index);
          }
        }}>
          <FetchImageView
            imageData={this.props.image}/>
        </CardItem>
      </View>
    );
  }
  actionSheetShow(cardItem,cardIndex){
    let ACTION_LIST=[
      '編集',
      'DELETE',
      'Cancel'
    ];
    ActionSheet.show(
      {
        options:ACTION_LIST,
        cancelButtonIndex:2,
        destructiveButtonIndex:1,
        title:''
      },
      (buttonIndex)=>{
        console.log('on select',buttonIndex);
        switch (buttonIndex) {
          case 0:
          case '0':
            this.setState({isEdit:true});
            break;
          case 1:
          case '1':
            this.props.onDelete?this.props.onDelete(cardItem,cardIndex):null;
            break;
        }
      }
    );
  }
  showDialog(){
    let options={
      title: 'Hello, World!',
      content: 'I\'m just simple Dialog',
      positiveText: 'OK',
      negativeText: 'Cancel'
    };
    let dialog=new DialogAndroid;
    dialog.set(options);
    dialog.show();
  }
}
class FetchImageView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      imageSource:null,
      isLoading:true,
      isError:false
    };
  }
  componentWillMount(){
    let data='';
    let filePath=Platform.OS==='ios'?this.props.imageData.origURL:this.props.imageData.path;
    if(!filePath){
      this.setState({isError:true});
      return;
    }
    RNFetchBlob.fs.readStream(
      filePath,
      'base64',
      4095
    ).then((ifstream)=>{
      ifstream.open();
      ifstream.onData((chunk)=>{
        data+=chunk;
      });
      ifstream.onError((err)=>{
        console.log('oops',err);
      });
      ifstream.onEnd(()=>{
        this.setState({
          imageSource:{ uri : 'data:image/jpeg;base64,' + data },
          isLoading:false
        });
      });
    });
  }
  render(){
    return(
      <View>
        {
          this.state.isError?<ErrorView
          {...this.props}
          style={this.props.errorViewStyle?this.props.errorViewStyle:DefaultStyle}/>:
          this.state.isLoading?
          <Spinner
            {...this.props}
            color={this.props.spinnerColor?this.props.spinnerColor:'palevioletred'}
            style={this.props.spinnerStyle?this.props.spinnerStyle:DefaultStyle}/>:
          <Image
            {...this.props}
            source={this.state.imageSource}
            style={this.props.imageStyle?this.props.imageStyle:DefaultStyle}
            resizeMethod={'scale'}
            resizeMode={'contain'}
            onError={()=>{this.setState({isError:true})}}
          />
        }
      </View>
    );
  }
}
class ErrorView extends React.Component{
  render(){
    let errIconStyle=this.props.errIconStyle?this.props.errIconStyle:{fontSize:40,color:'red'};
    return(
      <View style={[this.props.style,{alignItems:'center',justifyContent:'center'}]}>
        {Platform.OS==='ios'?
          <Ionicons name='ios-alert' style={errIconStyle} />
          :
          <MaterialCommunityIcons name='alert' style={errIconStyle} />
        }
        <Text>{this.props.errorMessage?this.props.errorMessage:'読み込みに失敗しました'}</Text>
      </View>
    );
  }
}
class InputTitle extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:''
    };
  }
  render(){
    return(
      <Input
        {...this.props}
        onChangeText={(text)=>{
          this.setState({text:text});
        }}
        onEndEditing={()=>{
          this.props.editEnable();
          this.props.onEndEditing?this.props.onEndEditing(this.props.image,this.props.index,this.state.text):null;
        }}
        numberOfLines={this.props.numberOfLines?this.props.numberOfLines:1}
        style={this.props.titleStyle}
        autoFocus={true}
      />
    );
  }
}
