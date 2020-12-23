
import React from 'react';
import {Header} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import { FontAwesome5 } from '@expo/vector-icons';
import * as firebase from "firebase"
const HeadHome=(props)=>{
    return(
        <AuthContext.Consumer>
            {(auth)=>(
                <Header

                leftComponent={{
                  icon: "menu",
                  color: "#fff",
                  onPress: function () {
                    props.navigation.toggleDrawer();
                  },
                }}
                centerComponent={{
                  text: "Lets Blog",
                  style: { color: "#fff", fontSize: 20 },
                }}
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
            )}
        </AuthContext.Consumer>
    )
}

export default HeadHome;