import React, { useEffect, useState } from "react";
import { Text,View, StyleSheet, AsyncStorage,FlatList,ActivityIndicator } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import HeadHome from "../comps/HeadHome";
import { getDataJSON } from "../functions/AsyncStorageFunction";
import NotificationFunction from "../functions/NotificationFunction"
import NotificationDetails from "../comps/NotificationDetails";
import * as firebase from "firebase";
import "firebase/firestore";

const NotificationScreen = (props) => {

  let[notification,setNotification]=useState([])
  const [reload,setReload]=useState(false);

  const getNotification=async()=>{
    setReload(true)
    firebase
    .firestore()
    .collection("notifications")
    .onSnapshot((querySnapshot)=>{
        let allNotify=[]
        querySnapshot.forEach((doc)=>{
          console.log(doc.data())
            allNotify.push({
                id:doc.id,
                data:doc.data(),
            });
        });
        if(allNotify!=null){
            setNotification(allNotify)
          //  console.log(allNotify)
        }
        else console.log("no Notification")
        setReload(false)
    },(error)=>{
        setReload(false);
        console.log(error);
    });
  } 

  useEffect(()=>{
    
    getNotification()
  },[])
  //console.log(notification)
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeadHome navigation={props.navigation}/>
            <View style={{ flexDirection: "row" }}>
            
              <FlatList 
              data={notification}
              renderItem={function({item}){
                if(item.data.receiver==auth.CurrentUser.email){
                  return(
                    <NotificationDetails 
                    content={item} 
                    props = {props}
                    />
                  )
                }
              }}
              keyExtractor={(item, index) => index.toString()}
              />
            </View>
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

export default NotificationScreen;