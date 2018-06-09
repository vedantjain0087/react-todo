var React = require('react');
var ReactDom = require('react-dom');
var createReactClass = require('create-react-class');

var TodoItem = require('./todoitem');
var AddItem = require('./additem');
var About = require('./about');

require('./css/index.css');

import {Route, BrowserRouter as Router, browserHistory, Link } from 'react-router-dom';

var App = createReactClass({
    render:function(){
        return(
            <Router history={browserHistory}>
                <div>
                <Route exact path={'/'} component={TodoComponent}/>
                <Route exact path={'/about'} component={About}/>
                </div>
            </Router>
        );
    }
});

var TodoComponent = createReactClass({
    getInitialState: function(){
        return{
            todos: ["wake up","bk","co"]
        };
    },
render:function(){

    // var ager = setTimeout(function(){
    //     this.setState({
    //         age:35
    //     });
    // }.bind(this),2000);
    var todos = this.state.todos;
    todos = todos.map(function(item, index){
        return(
            
               // <li>{item}</li>
               <TodoItem item={item} ke y={index} onDelete={this.onDelete}/>
            
        );
    }.bind(this));
    return(
        <div>
            <Link to="/about">About</Link>
        <ul>
       {todos}
       <AddItem onAdd={this.onAdd}/>
       </ul>
       </div>
    );
    
},

onAdd:function(item){
    var updatedTodos = this.state.todos;
    updatedTodos.push(item);
    this.setState({
        todos:updatedTodos
    });

},
onDelete:function(item){

    var updatedTodos = this.state.todos.filter(function(val,index){
        return item !== val;
    });
    this.setState({
        todos : updatedTodos
    });
}

});

var TodoItem = createReactClass({
    render:function(){
        return(
            <li>
                <div className="todo-item">
                    <span className="item-name">{this.props.item}</span>
                    <span className="item-name">{this.props.item}</span>
                    <span className="item-delete" onClick={this.handleDelete}> X </span>
                </div>
            </li>
        );
    },
    
    handleDelete:function(){
        this.props.onDelete(this.props.item);
    }

});

ReactDom.render(<App />, document.getElementById('todo-wrapper'));