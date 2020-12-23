import React, { useState } from "react";
import { View,AsyncStorage } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import moment from "moment";
import { storeDataJSON} from "../functions/AsyncStorageFunction";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";
import 'firebase/firestore';



function CurrentDate() {
    var date = new moment().format("DD/MM/YYYY");
    return date;
}

const AddPost = ({user,props}) => {
    const input = React.createRef();
    const [Post,setPost] = useState("");
    //console.log(user.name);
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
              disabled={Post.length==0?true:false}
              title="Post"
              type="outline" 
              onPress={function () {
                if(Post.length>0){ 
                  firebase
                      .firestore()
                      .collection("posts")
                      .add({
                          post:Post,
                          user_name:user.displayName,
                          user_email:user.email,
                          creatTime: firebase.firestore.Timestamp.now(),
                          likeCount:0,
                          comments:[]
                      }).then((docRef)=>{
                          alert("Post ID: "+ docRef.id);
                      })
                      .catch((error)=> {
                          alert(error);
                      });

                  setPost("");
                  input.current.clear();
              }
          else {
               alert("Input Field Empty");
           }
      }
            }
          />}
          multiline={true}
          ref={input}/>   
        </Card>
   )
}

export default AddPost;