
import React, { useState } from 'react';
import{ StyleSheet,View,Image,AsyncStorage} from 'react-native';
import {Input, Button,Card} from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import {AuthContext} from "../providers/AuthProvider"
import {getDataJSON} from '../functions/AsyncStorageFunction'

const SignInScreen = (props) => {
    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");
    return(
        <AuthContext.Consumer>
            {(auth) => (
        <View style={styles.viewStyle}>
             <Image
                style = {styles.imageStyle}
                source = {require('./../../assets/blog.webp')}
            /> 
            <Card>
                <Card.Title>Sign into LetsBlog</Card.Title>
                <Card.Divider/>
                <Input
                leftIcon={<MaterialCommunityIcons name="email-variant" size={24} color="black" />}
                placeholder = 'E-mail Address'
                onChangeText={
                    function(currentInput) {
                        setMail(currentInput);
                    }
                }
                />

                <Input
                leftIcon={<SimpleLineIcons name="lock" size={24} color="black" />}
                placeholder = 'Password'
                secureTextEntry = {true}
                onChangeText={
                    function(currentInput) {
                        setPassword(currentInput);
                    }
                }
                />
                
                <Card.Divider/>
                <Button
                icon = {<MaterialCommunityIcons name="account-arrow-right" size={24} color="white" />}
                title = 'Sign In'
                type = "solid"
                onPress={
                        async function(){
                        let UserData = await getDataJSON(mail)
                        if(UserData == null)
                        {
                            alert("No Account");
                        }
                        else{
                        if(UserData.password == password)
                        {
                            auth.setIsLoggedIn(true);
                            auth.setCurrentUser(UserData);
                        }
                        else {
                            alert("Sign In Failed");
                        }
                    }
                    }
                }

                />
                
                <Card.Divider/>

                <Button
                icon = {<MaterialIcons name="create" size={24} color="dodgerblue" />}
                title = 'Don,t have an Account? Create Now'
                type = "clear"
                onPress={
                    function(){
                        props.navigation.navigate("Sign Up")
                    }
                }
                />
        </Card>
        {/*<Button
            type="clear"
            icon ={<MaterialIcons name="clear" size={22} color="black" />}
            title=" Clean App"
            onPress={function () {
                AsyncStorage.clear()
            }}
        />*/}
        </View>
        )}
        </AuthContext.Consumer>);
};

const styles = StyleSheet.create(
    {
        viewStyle:{
            flex:1,
            justifyContent:'center'
        },
        textStyle:{
            fontSize: 30,
            color: '#000000',
            textAlign : "center"
        },
        imageStyle:
        {
            width: 400, 
            height: 100,
            alignSelf: 'center' 
        },
        buttonStyle:
        {
            elevation: 8,
            color: "#00ffff",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            width : 200,
            alignSelf : "center"
        },
        buttonStyleTO:
        {
            elevation: 8,
            backgroundColor: "#00ffff",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            width : 200,
            alignSelf : "center"
        },
        buttonTextStyle:
        {
            color: '#000000',
            textAlign : 'center',
        }
    }
); 
 
export default SignInScreen; //acording const created