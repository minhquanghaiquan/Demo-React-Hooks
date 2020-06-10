import React, { useState } from "react";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {

  const [todoList , setTodoList] = useState([
    {id: 1, title: 'I love you'},
    {id: 2 , title: 'I love Mary'},
    {id: 3 , title: 'I love Jeccisa'},
    {id: 4 , title: 'I love Hanna'}
  ]);

  function handleTodoLick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0 ) {
      return;
    }else {
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    }
    console.log('Click');
    
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id:todoList.length+1,
      ...formValues,
    }
    const newTodoList =[...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="App">
      <ColorBox />
      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoLick}/>
    </div>
  );
}

export default App;
