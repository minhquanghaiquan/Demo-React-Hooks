import React, { useState, useEffect } from "react";
import queryString from 'query-string'
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFilterForm from "./components/PostFilterForm";
function App() {
  //Set State
  const [todoList , setTodoList] = useState([
    {id: 1, title: 'I love you'},
    {id: 2 , title: 'I love Mary'},
    {id: 3 , title: 'I love Jeccisa'},
    {id: 4 , title: 'I love Hanna'}
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination , setPagination] = useState({
    _page:1,
    _limit:10,
    _totalRows:1,
  })
  const [filter , setFilter] = useState({
    _limit: 10,
    _page:1,
    title_like: '',
  })

  //Demo use effect Post List
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filter);
        const requesUrl =`http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const res = await fetch(requesUrl);
        const resJSON = await res.json();
  
        const {data, pagination} = resJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Erorr: '+ error);
      }
    }
    fetchPostList();
  }, [filter]);

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

  //Demo pagination
  function handlePageChange(newPage) {
    setFilter({
      ...filter,
      _page: newPage,
    })
  }

  //Demo search

  function handleFilterChange(newFilter) {
    console.log(newFilter);
    setFilter({
      ...filter,
      _page:1,
      title_like: newFilter.searchTerm,
    })
  }
  return (
    <div className="App">
      <ColorBox />
      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoLick}/>
      
      <PostFilterForm onSubmit={handleFilterChange} />
      <PostList posts={postList}/>
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
