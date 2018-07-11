import React from 'react';
import { StyleSheet, Text, View , KeyboardAvoidingView,ActivityIndicator, TextInput, TouchableOpacity,AsyncStorage,ImageBackground} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { us:'',pw: '',bv:false,token:"",back:"",name:"",load:false};
       
    }


    Facebook(){
      LoginManager.logInWithReadPermissions(['public_profile']).then(
        function(result) {
          if (result.isCancelled) {
            alert('Login cancelled');
          } else {
            alert('Login success with permissions: '
              +result.grantedPermissions.toString());
          }
        },
        function(error) {
          alert('Login fail with error: ' + error);
        }
      );
     }


    Google() {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
        webClientId: '772422892515-al7ecaqtpj8un9mtn30j57lbomh6lsrv.apps.googleusercontent.com', 
        }).then(() => {
          GoogleSignin.signIn().then(user=>{
            alert(user)
          })
        })
    }

  render() {
      
    return (
        <View style={{flex:1, justifyContent: 'center',alignItems: 'center',}}>
          <TouchableOpacity onPress={this.Facebook.bind(this)}>
            <Text>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.Google.bind(this)}>
            <Text>
              Google
            </Text>
          </TouchableOpacity>

          
        </View>
    );
  }
}

