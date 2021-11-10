import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet,Pressable, Text, View, Button,TouchableHighlight, TextInput, Dimensions } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

class Todo extends React.Component {
  getClass = () => {
    if(this.props.check){
    return([styles.container,styles.faded])
  }else{
    return(styles.container)
  }
  }
  render(){
    return (
      <View style={this.getClass()}>
        <Text style={styles.todoText} nomberOfLines={1}>{this.props.todo}</Text>

        <TouchableHighlight underlayColor="none" style={styles.btn} onPress={()=>this.props.handleDelete(this.props.index)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableHighlight>
        <TouchableHighlight underlayColor="none" style={styles.btn} onPress={()=>this.props.handleCheck(this.props.index)}>
          <AntDesign name="checkcircleo" size={20} color="#42ff44" />
        </TouchableHighlight>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {  
    display:"flex",
    flexDirection:"row",
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
    marginTop:2,
    marginLeft:2,
    minHeight:50,
    marginBottom:5,
    backgroundColor: '#6e42ff',
    alignItems: 'center',
    justifyContent:"space-around"
  },
  faded:{
    backgroundColor:"#c5b6f5"
  },
  btn:{
    width:(Dimensions.get("window").width*1)/10,
    flex:1,
    alignItems:"center",
    justifyContent:"center",


  },
  todoText:{
    width:(Dimensions.get("window").width*5)/10,
    color:"#fff"
  }
});

export default Todo;