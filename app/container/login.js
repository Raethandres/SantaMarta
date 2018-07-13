import React from 'react';
import { StyleSheet, Text, View ,Keyboard, KeyboardAvoidingView,ActivityIndicator, Modal,TextInput, TouchableOpacity,AsyncStorage,ImageBackground} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { LoginManager,AccessToken,GraphRequest ,GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user:'',us:'',pw: '',load:false,show:false,reg:false,rue:false,rpe:false};
        this.setUser=this.setUser.bind(this)
    }

    componentDidMount() {
      this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({ user:{name:user._user.email},show:false });
          this.props.navigation.navigate('Home')           
        }else{

        }

      });
    }

    setUser(user){
        this.setState({user})
    }

    
    Facebook(){
      this.setState({load:true,show:false})
      LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
        (result)=> {
          if (result.isCancelled) {
            alert('Login cancelled');
            this.setState({load:false})

          } else {
            
            const _responseInfoCallback=(error: ?Object, res: ?Object)=>{
               this.setUser(res)
               AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    let credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                    console.log(credential)
                    firebase.auth().signInAndRetrieveDataWithCredential(credential)
               
                  }
                )
               
            }
            const infoRequest = new GraphRequest('/me?fields=name,picture',
                                                  null,_responseInfoCallback)
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        },
        function(error) {
          this.setState({load:false})
          alert('Login fail with error: ' + error);
        }
      );
     }

     Login(){
      let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      this.setState({load:true})
      Keyboard.dismiss()
      if(!regex.test(this.state.us)){
        this.setState({rue:true,load:false})
        return 0
      }else{
        this.setState({rue:false})
      }
      if(this.state.pw.length<6){
        this.setState({rpe:true,load:false})
        return 0
      }else{
        this.setState({rpe:false})

      }

      firebase.auth().signInWithEmailAndPassword(this.state.us,this.state.pw)
    }

    Registro(){
      this.setState({show:false,reg:true})
    }

    Setup(){
      let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      Keyboard.dismiss()
      
      this.setState({load:true,})
      if(!regex.test(this.state.us)){
        this.setState({rue:true,load:false})
        return 0
      }else{
        this.setState({rue:false})
      }
      if(this.state.pw.length<6){
        this.setState({rpe:true,load:false})
        return 0
      }else{
        this.setState({rpe:false})

      }
      firebase.auth().createUserWithEmailAndPassword(this.state.us,this.state.pw)
    }

    Google() {
      this.setState({load:true,show:false})
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
        webClientId: '772422892515-al7ecaqtpj8un9mtn30j57lbomh6lsrv.apps.googleusercontent.com', 
        }).then(() => {
          GoogleSignin.signIn().then(user=>{
            this.setUser(user)
            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken)
            console.log(credential)
            firebase.auth().signInAndRetrieveDataWithCredential(credential);
          }).catch(err=>this.setState({load:false}))
        })
    }

  render() {
      
    return (
        <View style={{flex:1, justifyContent: 'center',alignItems: 'center',}}>
          
          <Text style={{color:"#000",marginBottom:10,fontSize:20}}>{this.state.reg?'Registro':'Bienvenido'}</Text>
            
          <TextInput style={{marginBottom:10,width:"70%",borderRadius:10,borderColor:"#e5ddd5",borderWidth:1,fontSize:15}} textAlign={'center'} placeholder='Usuario'  underlineColorAndroid = "transparent" onChangeText={(us) => this.setState({us})}/>
          {this.state.rue?<Text style={{color:"#ea4335"}}>agregue una direcion de correro valida</Text>:null}
          <TextInput style={{width:"70%",borderRadius:10,borderColor:"#e5ddd5",borderWidth:1,fontSize:15}} textAlign={'center'} placeholder='Contraseña' underlineColorAndroid = "transparent" onChangeText={(pw) => this.setState({pw})} secureTextEntry={true}/>
          {this.state.rpe?<Text style={{color:"#ea4335"}}>agregue una contraseña valida</Text>:null}
          
          <TouchableOpacity style={{marginTop:10,justifyContent: 'center',alignItems: 'center',height:"7%",width:"40%",borderColor:"#fff" ,borderRadius:10,borderWidth:1,fontSize:15,backgroundColor:"#009688"}} onPress={()=>{this.state.reg?this.Setup(this):this.Login(this)}}>
            <Text style={{color:"#fff"}}>
              {this.state.reg?'Registrar':'Iniciar session'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop:10,justifyContent: 'center',alignItems: 'center',height:"7%",width:"40%",borderColor:"#fff",borderRadius:10,borderWidth:1,fontSize:15,backgroundColor:"#009688"}} onPress={()=>{this.state.reg?this.setState({reg:false}):this.setState({show:true})}}>
            <Text style={{color:"#fff"}}>
              {this.state.reg?'Close':'Setup'}
            </Text>
          </TouchableOpacity>

          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.show}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
          >
          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:20
          }}>
          <View style={{width: "80%",height: "50%",borderRadius:10,borderColor:"#009688",backgroundColor:"#fff",justifyContent: 'center',alignItems: 'center',}}>
            <Text>Iniciar</Text>
            <TouchableOpacity style={{marginTop:10,justifyContent: 'center',alignItems: 'center',height:"10%",width:"40%",borderColor:"#fff",borderRadius:10,borderWidth:1,fontSize:15,backgroundColor:"#4080ff"}} onPress={this.Facebook.bind(this)}>
              <Text style={{color:"#fff"}}>
                Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10,justifyContent: 'center',alignItems: 'center',height:"10%",width:"40%",borderColor:"#fff",borderRadius:10,borderWidth:1,fontSize:15,backgroundColor:"#ea4335"}} onPress={this.Google.bind(this)}>
              <Text style={{color:"#fff"}}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10,justifyContent: 'center',alignItems: 'center',height:"10%",width:"40%",borderColor:"#fff",borderRadius:10,borderWidth:1,fontSize:15,backgroundColor:"#ffcb2d"}} onPress={this.Registro.bind(this)}>
              <Text style={{color:"#fff"}}>
                Registro
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10,justifyContent: 'center',alignItems: 'center',height:"10%",width:"40%",borderColor:"#fff",borderRadius:10,borderWidth:1,fontSize:15,backgroundColor:"#009688"}} onPress={()=>{this.setState({show:false})}}>
                <Text style={{color:"#fff"}}>
                 close
                </Text>
            </TouchableOpacity>
            </View>
          </View>

        </Modal>
        {this.state.load? <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', position:'absolute',width:'100%',height:'100%'}}><ActivityIndicator style={{marginTop:80,}} size={50} color="#009688" /></View>:null}
        
        </View>
    );
  }
}

