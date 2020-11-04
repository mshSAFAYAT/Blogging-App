import React, { useEffect, useState } from "react";
import { Text,View, StyleSheet, AsyncStorage,FlatList,ActivityIndicator } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import HeadHome from "../comps/HeadHome";
import { getDataJSON } from "../functions/AsyncStorageFunction";
import NotificationFunction from "../functions/NotificationFunction"
import NotificationDetails from "../comps/NotificationDetails";

const NotificationScreen = (props) => {
  let[notification,setNotification]=useState([])
  const [loading,setLoading] = useState(false);

  const getNotification=async()=>{
    setLoading(true);
    let noitify=await getDataJSON('notification')
    if(noitify!=null){
      setNotification(noitify)
    }
    else{
      console.log('No notification')
    }
    setLoading(false);
  }
  console.log(notification);
  useEffect(()=>{
    getNotification()
  },[])

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeadHome navigation={props.navigation}/>
          <ActivityIndicator size = "large" color = "blue" animating = {loading}/>
            <View style={{ flexDirection: "row" }}>
            
              <FlatList 
              data={notification}
              renderItem={function({item}){
                if(item.receiver==auth.CurrentUser.name){
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