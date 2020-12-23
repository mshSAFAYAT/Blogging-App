import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./src/screens/Profile";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen"
import SignInScreen from "./src/screens/SignInScreen"
import NotificationScreen from "./src/screens/Notification"
import {AuthContext,AuthProvider} from "./src/providers/AuthProvider"
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import CommentScreen from "./src/screens/CommentScreen"
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBso4XCLrMf3YqmMAnXIARavPy3m7RK_dc",
  authDomain: "blog-8b509.firebaseapp.com",
  projectId: "blog-8b509",
  storageBucket: "blog-8b509.appspot.com",
  messagingSenderId: "113626351773",
  appId: "1:113626351773:web:0b7a3e532302da58742c74",
  measurementId: "G-TJB0JCE533"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const AuthStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const CommentStack = createStackNavigator();

const CommentStackScreen = () => {
  return(
    <CommentStack.Navigator initialRouteName="Home">
      <CommentStack.Screen name="Home" component={TabScreen} options={{ headerShown: false }}/>
      <CommentStack.Screen name="Comment" component= { CommentScreen } options={{ headerShown: false }}/>
    </CommentStack.Navigator>
  )
}

const AppDrawerScreen = () => {
  return(
    <AppDrawer.Navigator>
      <AppDrawer.Screen name = 'Home' component={CommentStackScreen}/>
      <AppDrawer.Screen name = 'Profile' component={ProfileScreen}/>
    </AppDrawer.Navigator>
  )
}
const TabScreen = () => {
  return(
    <Tab.Navigator>
        <Tab.Screen name = "Home" component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
        /> 
        <Tab.Screen name = "Notification" component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
        /> 
    </Tab.Navigator>
    
  )
}
const AuthStackScreen = () => {
  return(
    <AuthStack.Navigator initialRouteName = "Sign In">
      <AuthStack.Screen name = "Sign In" component={SignInScreen} options = {{headerShown:false}}/> 
      <AuthStack.Screen name = "Sign Up" component={SignUpScreen} options = {{headerShown:false}}/> 
    </AuthStack.Navigator>
  );
};
function App2() {
  return (
    <AuthProvider>
    <AuthContext.Consumer>
    {(auth)=>
    <NavigationContainer>
        {auth.IsLoggedIn? <AppDrawerScreen /> : <AuthStackScreen/>}
    </NavigationContainer>
    }
    </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App2;  