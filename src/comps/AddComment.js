
import React,{useState} from 'react';
import { View,StyleSheet} from 'react-native';
import { Card, Button ,Input} from 'react-native-elements';
import { storeDataJSON } from "../functions/AsyncStorageFunction";
import NotificationFunction from "../functions/NotificationFunction";
import * as firebase from "firebase";
import "firebase/firestore";

const AddComment = ({post,user}) => {
    const input = React.createRef();
    const [comment,setComment] = useState("")
    return(
        <Card>
            <View style={{flexDirection:'row'}}>
            <Input 
                ref = {input} 
                placeholder="Comment Here"
                onChangeText={
                    function (input) {
                    setComment(input);
                  }}
                  rightIcon={<Button 
                  disabled={comment.length==0?true:false}
                  title="Comment"
                  type="outline"
                  onPress={function(){

                      let currentComment={
                        postId:post.id,
                        comments:comment,
                        sender:user,
                        receiver:post.user_email,
                      };
                      firebase
                        .firestore()
                        .collection("notifications")
                        .add(currentComment).then((docRef)=>{
                            alert("Comment ID: "+ docRef.id);
                        })
                        .catch((error)=> {
                            console.log(error);
                        });
                      setComment("");
                      input.current.clear();
                  }}/>}
                multiline={true}
                ref={input}/>
            </View>
        </Card>
    )
}

export default AddComment;