import React, { useEffect,useState } from "react";
import {   StyleSheet,
  View,
  ScrollView,
  FlatList,
  AsyncStorage,ActivityIndicator} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { storeDataJSON,getDataJSON } from "../functions/AsyncStorageFunction";
import HeadHome  from "../comps/HeadHome";
import  AddPost  from "../comps/AddPost";
import  PostDetails from "../comps/PostDetails";
import * as firebase from "firebase";

const HomeScreen = (props) => {
  
  const [post,setPost] = useState([]);
  const [loading,setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    firebase
            .firestore()
            .collection("posts")
            .orderBy("creatTime","desc")
            .onSnapshot((querySnapshot)=>{
                let Posts=[]
                querySnapshot.forEach((doc)=>{
                    Posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setPost(Posts)
                setLoading(false);      
            },(error)=>{
                setLoading(false);

            });
    //setLoading(false);
  };
  
  useEffect(() => {
    getPosts();
    setLoading(false);
  });
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeadHome navigation = {props.navigation}/>
          <AddPost  user = {auth.CurrentUser} props = {props}/>
        <ActivityIndicator size = "large" color = "blue" animating = {loading}/>
        <FlatList
            data={post}
            renderItem={function ({ item }) {
              return (<PostDetails 
                content={item}
                props={props} 
                />);
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;
