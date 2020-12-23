import React from "react";
import {Card} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from "react-native";

const NotificationDetails=({content,props})=>{

    console.log(content)
    return(
        <Card onPress = { function(){
            let postID = content.data.postId
            props.navigation.navigate("Comment",postID)
            }}>
            
            <Card.Title title={content.data.sender} 
            subtitle=' commented on your post' 
            left={()=><MaterialIcons 
            name="insert-comment" 
            size={24} color="black" 
                />}
                />
                 
        </Card>
    )
    }
    
export default NotificationDetails;