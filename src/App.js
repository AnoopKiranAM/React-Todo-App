import React,{Component} from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import "./App.css"
import Header from './components/layout/header'
import About from './components/pages/About.js'
import axios from 'axios';


class App extends Component{
state={
  todos:[ ]
}

//getting the https request from the api and adding it to the state object created which contains all the todos
componentDidMount(){
  axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
  .then(res => this.setState({todos:res.data}))
}



//toggle complete action after the check box is clicked
markComplete=(id)=>{
  this.setState({todos : this.state.todos.map(todo=>{
    if(todo.id===id){
     todo.completed=!todo.completed
    }
    return todo;
  })
  });
}

//Deleting one entry from the list of todos is done using higher order method called filter
//Filter will loops through the array and based on the conditon it will return another set of array
delTodo=(id)=>{
axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
.then(res=> this.setState({todos:[...this.state.todos.filter(todo=>todo.id!==id)]}))
 
}


//taking the new todo and sending the http post request and adding to the state using the spread operator
addTodo=(title)=>{
axios.post('http://jsonplaceholder.typicode.com/todos',
{title,completed:false}).then(res=>{this.setState({todos:[...this.state.todos,res.data]})});
}
  render() {
  return(
    <Router>
    <div className='App'>
    <div className="contaniner">
    <Header></Header>
    <Route exact path="/" render={props=>(
      <React.Fragment> 
      <AddTodo addTodo={this.addTodo}></AddTodo>
      <Todos todos={this.state.todos} 
       markComplete={this.markComplete}
       delTodo={this.delTodo}></Todos>
       </React.Fragment>
    )}/>
    <Route path="/about" component={About}>
     
    </Route>
    </div>
    </div>
    </Router>
  );
}
}


export default App