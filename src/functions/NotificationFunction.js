import React, {useState} from 'react'
import { storeDataJSON,getDataJSON } from "../functions/AsyncStorageFunction";

const NotificationFunction=async(value)=>{
let allnotifications=[];
try{
    let getNotification=await getDataJSON('notification')

    if(getNotification!=null){
        getNotification.push(value)
        await storeDataJSON('notification',getNotification)
    }
    else{
        allnotifications.push(value)
        await storeDataJSON('notification',allnotifications)
    }
}
catch(error){
    console.log(error);
}
}

export default NotificationFunction;