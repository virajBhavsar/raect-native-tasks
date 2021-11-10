import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, TextInput, Dimensions,TouchableHighlight,Animated, Image,Text, View, Button,FlatList,Alert, SafeAreaView } from 'react-native';
import Todo from './components/Todo';

class App extends React.Component {
  state = {
    input:false,
    deadline:{hh:1,mm:1,D:"PM"},
    inputText:"",
    taskRemains:0,
    todos:[]
  }

  

  InputForm = () => {
     if(this.state.input){
     return(
    <View style={{
          display:"flex",
          width: getPercentage(100),
          paddingTop:"2%",
          paddingBottom:"2%",
          position:"absolute",
          top:(Dimensions.get("window").height*30)/100,
          height:(Dimensions.get("window").height*10)/100,
          backgroundColor:"white",
          }}>
          <TextInput
            placeholder="todo"
            style={styles.input}
            onChangeText = {(text)=>{this.setState({inputText:text})}}
          ></TextInput>
      </View>
      )}
  }

  handleAddTodo = () => {
    if(this.state.input && this.state.inputText !== ""){
      let todosx = [...this.state.todos];
      todosx.splice(0,0,{todo:this.state.inputText,check:false});
      this.setState({todos:todosx,inputText:"",taskRemains:this.state.taskRemains + 1})
    }

    this.setState({
      input: ! this.state.input
    })
  }

  handleDelete = (index) => {
    let todos = [...this.state.todos]
    let removed = todos.splice(index,1)
    console.log(removed)

    if(removed[0].check){
      this.setState({todos:todos}) 
    }else{
        this.setState({todos:todos,taskRemains:this.state.taskRemains - 1})
    }}
  
  handleCheck = (index) => {
    let todos = [...this.state.todos]
    todos[index].check = ! todos[index].check;
    if(todos[index].check){
      this.setState({todos:todos,taskRemains:this.state.taskRemains - 1})
    }else{
      this.setState({todos:todos,taskRemains:this.state.taskRemains + 1})
    }
  }
  renderItem = ({item, index, separators}) => {
    return(
      <Todo index={index} handleCheck={this.handleCheck} handleDelete={this.handleDelete} todo={item.todo} check={item.check}/>
    )}

  render(){
    return (
      <SafeAreaView style={styles.container}>
      <Image 
          style={styles.mountainImg} 
          source={{uri:'data:image/jpeg;base64,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'}}
        />
        
      <View style={styles.total}>
        <Text style={styles.totalText}>{this.state.taskRemains}</Text>
        <Text style={styles.totalText}>task ramaining</Text>
      </View>

      <FlatList 
        data={this.state.todos}
        style={{
                  top:30,
                  width:getPercentage(100),
                  paddingRight:getPercentage(5),
                }}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

       {this.InputForm()}
        
          <TouchableHighlight underlayColor="#0735ab" style={styles.addBtn} onPress={()=> this.handleAddTodo()}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableHighlight>
      
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const getPercentage = (percentage) => {
    return (Dimensions.get("window").width*percentage)/100
 }
 

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: getPercentage(100),
    alignItems: "flex-start",
  },
  total:{
    position:"absolute",
    top:130,
    left:getPercentage(50),
    transform:[{translateX : -getPercentage(5)}],
    padding:5,
  },
  totalText:{
    fontSize:24,
    color:"white"
  },
  mountainImg:{
    width:getPercentage(100),
    height:200,
    top:20,
  },

  input:{
     width: getPercentage(80),
     marginLeft:getPercentage(10),
     padding:5,
     height:50,
  },

  addBtn: {
   width: getPercentage(16),
   height:getPercentage(16),
   display:"flex",
   justifyContent:"center",
   alignItems: "center",
   backgroundColor:"#6e42ff",
   borderRadius:getPercentage(10),
   left:getPercentage(50),
   transform:[{translateX : -getPercentage(8)}],
   position:"absolute",
   top:Dimensions.get("window").height - getPercentage(18),
   borderColor:"#6e01ff",
   borderWidth:4,
  },

  addBtnText:{
    fontSize:20,
    color:"white"
  }
});

export default App;
