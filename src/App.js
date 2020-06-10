import React, { useState, useEffect } from "react";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";

function App() {

  const [todoList , setTodoList] = useState([
    {id: 1, title: 'I love you'},
    {id: 2 , title: 'I love Mary'},
    {id: 3 , title: 'I love Jeccisa'},
    {id: 4 , title: 'I love Hanna'}
  ]);
  const [postList, setPostList] = useState([]);

  //Demo use effect Post List
  useEffect(() => {
    async function fetchPostList() {
      try {
        const requesUrl ='http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const res = await fetch(requesUrl);
        const resJSON = await res.json();
  
        const {data} = resJSON;
        setPostList(data);
      } catch (error) {
        console.log('Erorr: '+ error);
      }
    }
    fetchPostList();
  }, []);

  //Demo useState TodoList
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
  //Demo useState TodoForm
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
      <PostList posts={postList}/>
    </div>
  );
}

export default App;
