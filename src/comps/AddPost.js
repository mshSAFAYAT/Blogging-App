import React, { useState } from "react";
import { View,AsyncStorage } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import moment from "moment";
import { storeDataJSON} from "../functions/AsyncStorageFunction";
import { AntDesign, Entypo } from "@expo/vector-icons";

function CurrentDate() {
    var date = new moment().format("DD/MM/YYYY");
    return date;
}

const AddPost = ({user,props}) => {
    const input = React.createRef();
    const [post,setPost] = useState("");
    return(
        <Card>
             <Input
              ref = {input}             
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText = {
                 function(currentPost) {
                  setPost(currentPost);
                }
              }
              rightIcon ={<Button 
              disabled={post.length==0?true:false}
              title="Post"
              type="outline" 
              onPress={function () {
              var id = Math.floor(Math.random() * 200);
              let postDetails = {
                post : post,
                id: "postId" + id,
                date : CurrentDate(),
                postOwner : user.name,
                like : 0
              };
              storeDataJSON("postId"+id,postDetails);
              setPost("");
              input.current.clear();
              alert("Post added. Press 'OK'");
            }
          }/>}
          multiline={true}
          ref={input}/>   
        </Card>
    )
}

export default AddPost;