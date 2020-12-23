import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage, FlatList,ActivityIndicator } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeadHome from "../comps/HeadHome";
import AddComment from "../comps/AddComment";
import CommentDetails from "../comps/CommentDetails";
import { getDataJSON } from "../functions/AsyncStorageFunction";
import * as firebase from "firebase";
import 'firebase/firestore';

const CommentScreen = ({navigation,route}) => {
    let postid = route.params;
    //console.log(postid)
    const [Comments,setComment]=useState([]);
    const [Post, setPosts] = useState({});
    //const [loading,setLoading] = useState(false)
    const getPostDetails = async () => {
     // setLoading(true);
      firebase
      .firestore()
      .collection("posts")
      .doc(postid)
      .get()
      .then((doc)=>{
          let post=doc.data()
          post.id=postid
          post.creatTime=post.creatTime.toDate().toDateString()
          setPosts(post)
      })
      .catch((error)=>console.log(error));
      };

      const getComments = async () => {
        firebase
      .firestore()
      .collection("notifications")
      //.orderBy("creatTime","desc")
      .onSnapshot((querySnapshot)=>{
          let allComment=[]
          querySnapshot.forEach((docRef)=>{
              allComment.push({
                  id:docRef.id,
                  data:docRef.data(),
              });
          });
          console.log(allComment)
          if(allComment!=null){
              let Comment=allComment.filter(c=>c.data.postId==postid && c.data.comments!=undefined)
              setComment(Comment)
          }
          else console.log("no comment")
          },(error)=>{
          console.log(error);
      });
       // setLoading(false);
      };
    
      useEffect(() => {
        getPostDetails();
      }, []);
      useEffect(() => {
        getComments();
      },[]);

      return (
        <AuthContext.Consumer>
          {(auth) => (
            <View style ={styles.viewStyle}>
              <HeadHome navigation={navigation} />

              <Card>
              <Text style={{fontSize:16}}>{Post.user_name}</Text>
                <Text style={{color:"blue"}}>{Post.creatTime}</Text>
                <Text style={{fontSize:20}}>{Post.post}</Text>
              </Card>
              <AddComment post={Post} user={auth.CurrentUser.displayName}/>
              <FlatList 
              data={Comments}
              renderItem={function({item}){
                if(postid==item.data.postId)
                {
                return(
                  <CommentDetails 
                  content={item.data}/>
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