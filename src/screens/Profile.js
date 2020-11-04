import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage,Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import {removeData} from "../functions/AsyncStorageFunction"
import PostDetails from "../comps/PostDetails";
const ProfileScreen = (props) => {
  
  return (
    <AuthContext.Consumer>
      {(auth) => (
        
        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Lets Blog", style: { fontSize:20,color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          <Card>
            <View>
              <Text style={{ alignSelf : 'center',fontWeight: "bold",fontSize: 30 }}>
                {auth.CurrentUser.name} 
              </Text>
              <Card.Divider/>
              {auth.CurrentUser.image && <Image source = {{uri : auth.CurrentUser.image}} 
              style={{ width: 100, 
              height: 100,
              alignSelf: 'center'   }}/> }
              <Text style = {styles.textStyle}>
              <Text style = {{fontWeight: "bold"}}>Student ID : </Text>{auth.CurrentUser.sid} {"\n"}
              <Text style = {{fontWeight: "bold"}}>Date of Birth : </Text>{auth.CurrentUser.DoB} {"\n"}
              <Text style = {{fontWeight: "bold"}}>Address : </Text>{auth.CurrentUser.address} {"\n"}
              <Text style = {{fontWeight: "bold"}}>Place of Work : </Text>{auth.CurrentUser.worksAt} {"\n"}
              </Text>
              <Card.Divider/>
              
            <Button
            title = 'Delete Account'
            type = "solid"
            onPress={
                async function(){
                  
                    await removeData(auth.CurrentUser.mail);
                    auth.setIsLoggedIn(false);
                    
                   
                     await removeData(postDetails.id);
                   
                }
            }
            />
            </View>
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    paddingHorizontal: 10,
    fontSize: 20,
  },
  viewStyle: {
    flex: 1,
  },
});

export default ProfileScreen; 