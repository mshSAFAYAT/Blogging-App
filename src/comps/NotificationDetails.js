import React from "react";
import {Card} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from "react-native";

const NotificationDetails=({content,props})=>{


    return(
        <Card onPress = { function(){
            let postId = content.postId 
            props.navigation.navigate("Comment",postId)
            }}>
            
            <Card.Title title={content.author} 
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