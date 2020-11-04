
import React,{useState} from 'react';
import { View,StyleSheet} from 'react-native';
import { Card, Button ,Input} from 'react-native-elements';
import { storeDataJSON } from "../functions/AsyncStorageFunction";
import NotificationFunction from "../functions/NotificationFunction";

const AddComment = ({postDetails,user}) => {
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
                    var id = Math.floor(Math.random() * 200);
                      let currentComment={
                          postId: postDetails.id,
                          comment: comment,
                          author: user,
                          receiver: postDetails.postOwner,
                          commentId:'commentId'+id
                      }
                      storeDataJSON("commentId"+id,currentComment);
                      NotificationFunction(currentComment);
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