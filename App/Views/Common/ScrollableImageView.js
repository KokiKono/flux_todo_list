import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {
  Card,
  CardItem,
  Left,
  Body
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

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
    return this.props.images.map((images,index)=>{
      return(
        <Card
        key={index}>
          <CardItem>
            <Left>
              <Body>
                <Text>Title</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody
          button
          onPress={()=>{
            console.log('tap to card');
          }}>
            <Image
              source={images}
              style={{width:150,height:150}}/>
          </CardItem>
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
          style={{width:150,flex:1,justifyContent: 'center',alignItems: 'center'}}>
          <Icon name = 'ios-camera-outline'
            style = {{color:'#007AFF',fontSize:100}}/>
        </CardItem>
      </Card>
    )
  }
}
