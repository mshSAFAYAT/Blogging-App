import React, { useState,useEffect } from 'react';
import{ StyleSheet,View,Image} from 'react-native';
import {Input, Button,Card} from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialIcons ,AntDesign,FontAwesome} from '@expo/vector-icons';
import {storeDataJSON} from '../functions/AsyncStorageFunction'
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
const SignUpScreen = (props) => {
    const [name,setName] = useState("");
    const [sid,setSID] = useState("");
    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");
    const [DoB, setDoB] = useState("");
    const [address,setAddress] = useState("");
    const [worksAt,setWork] = useState("");
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    return(
        <View style={styles.viewStyle}>
            
        <Image
                style = {styles.imageStyle}
                source = {require('./../../assets/blog.webp')}
            /> 
        <Card>

            <Card.Title>Create An account in LetsBlog</Card.Title>
            <Card.Divider/>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 75, height: 75, alignSelf: 'center' }} 
            />} 
            <Input
            leftIcon={<AntDesign name="user" size={24} color="black" /> }
            placeholder = 'Name'
            onChangeText={
                function(currentInput) {
                    setName(currentInput);
                }
            }
            />
            <Input
            leftIcon={<MaterialCommunityIcons name="numeric" size={24} color="black" />}
            placeholder = 'ID'
            onChangeText={
                function(currentInput) {
                    setSID(currentInput);
                }
            }
            />
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
            leftIcon={<MaterialIcons name="date-range" size={24} color="black" />}
            placeholder = 'Date of Birth'
            onChangeText={
                function(currentInput) {
                    setDoB(currentInput);
                }
            }
            />

            <Input
            leftIcon={<Entypo name="address" size={24} color="black" />}
            placeholder = 'Address'
            onChangeText={
                function(currentInput) {
                    setAddress(currentInput);
                }
            }
            />

            <Input
            leftIcon={<MaterialIcons name="work" size={24} color="black" />}
            placeholder = 'Place of Work'
            onChangeText={
                function(currentInput) {
                    setWork(currentInput);
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
            icon = {<AntDesign name="adduser" size={24} color="white" />}
            title = 'Create Account'
            type = "solid"
            onPress = {
                function(){
                    let currentUser = {
                        name : name,
                        sid : sid,
                        mail : mail,
                        DoB : DoB,
                        address : address,
                        worksAt : worksAt,
                        password : password,
                        image : image
                    };
                    storeDataJSON(mail, currentUser);
                    props.navigation.navigate('Sign In');
                    console.log(currentUser);
                }
            }

            />
            <Card.Divider/>

            <Button
            icon = {<FontAwesome name="sign-in" size={24} color="dodgerblue" />}
            title = 'Already have an Account? Sign in Now'
            type = "clear"
            onPress={
                function(){
                    props.navigation.navigate("Sign In")
                }
            }
            />
        </Card>
        </View>);
};

const styles = StyleSheet.create(
    {
        viewStyle:{
            flex : 1,
            justifyContent: "center"
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
 
export default SignUpScreen; //acording const created