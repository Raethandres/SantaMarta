import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation'



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { us:'',pw: '',bv:false,token:"",back:"",name:"",load:false};
       
    }


  render() {
      
    return (
        <View>
          <Text>
            Home
          </Text>
        </View>
    );
  }
}

