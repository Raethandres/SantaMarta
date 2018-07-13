import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,ActivityIndicator} from 'react-native';
import { NavigationActions } from 'react-navigation'
import firebase from 'react-native-firebase';



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {load:false};
       
    }


  render() {
      
    return (
        <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
          <Text>
            Home
          </Text>
                    
          <TouchableOpacity style={{marginTop:10,justifyContent: 'center',alignItems: 'center',height:"7%",width:"40%",borderColor:"#fff" ,borderRadius:10,borderWidth:1,fontSize:15,backgroundColor:"#009688"}} onPress={()=>{this.setState({load:true});firebase.auth().signOut().then(()=>{this.props.navigation.navigate('Login')})}}>
            <Text style={{color:"#fff"}}>
              cerrar
            </Text>
          </TouchableOpacity>
          {this.state.load? <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', position:'absolute',width:'100%',height:'100%'}}><ActivityIndicator style={{marginTop:80,}} size={50} color="#009688" /></View>:null}
        </View>
    );
  }
}

