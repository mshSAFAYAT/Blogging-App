import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage, FlatList,ActivityIndicator } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeadHome from "../comps/HeadHome";
import AddComment from "../comps/AddComment";
import CommentDetails from "../comps/CommentDetails";
import { getDataJSON } from "../functions/AsyncStorageFunction";

const CommentScreen = ({navigation,route}) => {
    let postId = route.params;

    const [allCOmments,setAllComments] = useState([]);
    const [postDetails,setPostDetails] = useState({});
    const [loading,setLoading] = useState(false);

    const getPostDetails = async () => {
      setLoading(true);
        let postDetails = await getDataJSON(postId);
        if (postDetails != null) {
            setPostDetails(postDetails);
        } else {
          console.log("no post");
        }
      };

      const getComments = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let comments = [];
        if (keys != null) {
          for (let key of keys) {
            if (key.startsWith("commentId")) {
              let comment = await getDataJSON(key);
              comments.push(comment);
            }
          }
          setAllComments(comments);
        } else {

        }
        setLoading(false);
      };
    
      useEffect(() => {
        getPostDetails();
      }, []);
      useEffect(() => {
        getComments();
      });

      return (
        <AuthContext.Consumer>
          {(auth) => (
            <View style ={styles.viewStyle}>
              <HeadHome navigation={navigation} />

              <Card>
                <Text>{postDetails.postOwner}</Text>
                <Text>{postDetails.date}</Text>
                <Text>{postDetails.post}</Text>
              </Card>
              <AddComment postDetails={postDetails} user={auth.CurrentUser.name}/>
              <ActivityIndicator size = "large" color = "blue" animating = {loading}/>
              <FlatList 
              data={allCOmments}
              renderItem={function({item}){
                  if(postDetails.id==item.postId){
                return(
                  <CommentDetails 
                  content={item}/>
                )
                  }
              }}
              keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </AuthContext.Consumer>
      );
}
const styles = StyleSheet.create({
    viewStyle : {
        flex :1,
    }
})

export default CommentScreen;