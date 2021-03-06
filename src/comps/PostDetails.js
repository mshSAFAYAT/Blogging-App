import React, { useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { mergeData } from "../functions/AsyncStorageFunction";
import * as firebase from "firebase";
import 'firebase/firestore';

const PostDetails = ({content,props}) => {
    //console.log(props)
    //const [like,setLike] = useState(content.like)
    const Like =content.data.likeCount;
    const Date =content.data.creatTime.toDate().toDateString();
    return (
      <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            containerStyle={{ backgroundColor: "#ffab91" }}
            rounded
            icon={{ name: "user", type: "font-awesome", color: "black" }}
            activeOpacity={1}
          />
          <Text h4Style={{ padding: 10 }} h4>
            {content.data.user_name}
          </Text>
        </View>
        <Text style={{ fontStyle: "italic" }}>{content.date}</Text>
        <Text style={{paddingVertical: 10, fontSize : 30}}>
          {content.data.post}
        </Text>
        <Card.Divider />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            type="clear"
            title="Like "
            icon={<AntDesign name="like2" size={24} color="black" />}
            onPress = {async () => {
              await firebase
              .firestore()
              .collection("posts")
              .doc(content.id)
              .update(
              {
                likeCount:Like+1
              })
              .catch((error)=>{
                console.log(error)
              });
            }}
          />
         
          <Button type="solid" title="Comment"
            onPress = {function (){
              let postId = content.id
              props.navigation.navigate("Comment",postId)
          }}
           />
            
        </View>
        <Text style = {{ fontWeight: "bold",color : '#3b5998', fontSize : 15}}>Like : {Like}</Text>
      </Card>
    );
  };
  
export default PostDetails;