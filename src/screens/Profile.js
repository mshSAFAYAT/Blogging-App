import React, { useEffect,useState } from "react";
import { View, StyleSheet, AsyncStorage,Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import {removeData} from "../functions/AsyncStorageFunction"
import PostDetails from "../comps/PostDetails";
import * as firebase from "firebase";
import 'firebase/firestore';
import HeadHome  from "../comps/HeadHome";
import { cond } from "react-native-reanimated";
const ProfileScreen = (props) => {

  const [profile,setProfile] = useState([]);
  const [loading,setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    firebase
            .firestore()
            .collection("users")
            .orderBy("creatTime","desc")
            .onSnapshot((querySnapshot)=>{
                let profiles=[]
                querySnapshot.forEach((doc)=>{
                    profiles.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setProfile(profiles);
                //console.log(props)
                setLoading(false);      
            },(error)=>{
                setLoading(false);      
                console.log(error);
            });
            
    //setLoading(false);
  };
    useEffect(() => {
      getProfile();
    setLoading(false);
  });
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
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    auth.setIsLoggedIn(false);
                    auth.setCurrentUser({});
                  })
                  .catch((error) => {
                    alert(error);
                  });
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
              <Text style = {{fontWeight: "bold"}}>Student ID : </Text>{auth.CurrentUser.email} {"\n"}
              <Text style = {{fontWeight: "bold"}}>Date of Birth : </Text>{auth.CurrentUser.displayName} {"\n"}
              </Text>
              <Card.Divider/>
             
            <Button
            title = 'Delete Account'
            type = "solid"
            onPress={
                async function(){
                  
                    await removeData(auth.CurrentUser.mail);
                    auth.setIsLoggedIn(false);
                    
                   
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