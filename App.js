import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Weber} from './WebViewer/Weber';
import {NativeModules} from 'react-native';
import { selectContactPhone } from 'react-native-select-contact';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';
import {useRef} from 'react';
import { WebView } from 'react-native-webview';

var HelloWorld = NativeModules.Hello;


export default function App() {
  const webViewRef = useRef();
  const rem = async () => {
    HelloWorld.sayHi( (err) => {alert(err)}, (msg) => {alert(msg)} );
  }

  const readMessage = () => {
    console.log("Got message from web ::");
    // gP(); // method to get contact list only in form of json
    getPhoneNumber();   // method to get user's selected contact from opened panel
  }
  
  const getPhoneNumber = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    )
      .then(
            selectContactPhone()
                .then(selection => {
                    if (!selection) {
                        return null;
                    }
                    
                    let { contact, selectedPhone } = selection;
                    // alert(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
                    console.log("Selected :: ", JSON.stringify(selection));
                    webViewRef.current.postMessage(JSON.stringify(selection));
                    return selectedPhone.number;
                }).catch(err => alert("Error in RN while getting contact ::" + JSON.stringify(err))))
                .catch(err => alert("Error in RN selectPhone ::" + JSON.stringify(err))) ;  
  }
  const gP = () => {
    // Contacts.getAll().then(contacts => {
    //   // contacts returned
      // console.log("All contacts :: ", webViewRef);
    // });
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    )
      .then(Contacts.getAll()
        .then((contacts) => {
            // work with contacts
              console.log("contacts :: RN :: ");
              webViewRef.current.postMessage(JSON.stringify(contacts));
            })
              .catch((e) => {          
                  webViewRef.current.postMessage('Error ::' + e);
                  console.log(e)
              }))
  }

  return (
      // <View>
      //   <Text>Im ok</Text>
        // <Weber/>
        <WebView ref={webViewRef} source={{ uri: 'https://customerconnect-dev.crisil.com' }} onMessage={readMessage} />
        // <>
        //   <TouchableOpacity  onPress={() => HelloWorld.sayHi()}>
        //     <Text>Invoke native Java code</Text>
        //   </TouchableOpacity>

        //   <TouchableOpacity  onPress={() => getPhoneNumber()}>
        //   <Text>react native select contact</Text>
        //   </TouchableOpacity>

        //   <TouchableOpacity  onPress={() => gP()}>
        //   <Text>react native all contacts</Text>
        //   </TouchableOpacity>
        // </>
      // </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
