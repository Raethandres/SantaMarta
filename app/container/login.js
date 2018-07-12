import React from 'react';
import { StyleSheet, Text, View , KeyboardAvoidingView,ActivityIndicator, TextInput, TouchableOpacity,AsyncStorage,ImageBackground} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { LoginManager,AccessToken,GraphRequest ,GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user:'',pw: '',bv:false,token:"",back:"",name:"",load:false};
        this.setUser=this.setUser.bind(this)
    }


    setUser(user){
        this.setState({user})
    }

    


    Facebook(){
      LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
        (result)=> {
          if (result.isCancelled) {
            alert('Login cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken)
                    let credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                    firebase.auth().signInAndRetrieveDataWithCredential(credential)
               
                  }
                )
            const _responseInfoCallback=(error: ?Object, res: ?Object)=>{
               this.setUser(res)
               
            }
            const infoRequest = new GraphRequest('/me?fields=name,picture',
                                                  null,_responseInfoCallback)
            new GraphRequestManager().addRequest(infoRequest).start();
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
            this.setUser(user)
          })
        })
    }

  render() {
      
    return (
        <View style={{flex:1, justifyContent: 'center',alignItems: 'center',}}>
        <Text>{this.state.user.name}</Text>
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

