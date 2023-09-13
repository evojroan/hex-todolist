import todotitle from 'src/assets/todotitle.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const baseUrl = 'https://todolist-api.hexschool.io';
import 'src/layouts/layoutcss.css';

function Alltodo() {}
function Finishedtodo() {}
function Unfinishedtodo() {}

//取得 cookie
const cookieValue = document.cookie
  .split('; ')
  .find(row => row.startsWith('token='))
  ?.split('=')[1];

export default function Todolist({ inputValue }) {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [todoEdit, setTodoEdit] = useState({}); //收集所有編輯的事項

  useEffect(() => {
    getTodos({ cookieValue, setTodos });
  }, []);

  //getTodos 功能
  async function getTodos({ setTodos }) {
    try {
      if (!cookieValue) {
        return;
      }
      const response = await axios.get(`${baseUrl}/todos`, {
        headers: {
          Authorization: cookieValue
        }
      });
      setTodos(response.data.data);

      console.log('getTodos：', response.data.data);
    } catch (error) {
      throw new Error(error);
    }
  }

  //addTodo 功能
  async function addTodo({ newTodo, setNewTodo, setTodos }) {
    if (!newTodo) {
      alert('請輸入新增事項！');
      return;
    }
    try {
      await axios.post(
        `${baseUrl}/todos`,
        { content: newTodo },
        { headers: { Authorization: cookieValue } }
      );
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }

    getTodos({ setTodos });
  }

  //deleteTodo 功能
  async function deleteTodo(id, { setTodos, cookieValue }) {
    await axios.delete(`${baseUrl}/todos/${id}`, {
      headers: { Authorization: cookieValue }
    });
    getTodos({ cookieValue, setTodos });
  }

  // editTodo 功能
  async function editTodo(
    id,
    { token, setTodos, todos, setTodoEdit, todoEdit }
  ) {
    try {
      const todo = todos.find(todo => todo.id === id); //以 id 相符的方式指定所選的事項
      todo.content = todoEdit[id]; //所選事項的 content 被賦值("content" 這個 key 是 API 定義的，參閱API文件)，賦值的內容是 todoEdit 中，id 相符的事項
      if (todo.content == '') {
        alert('請輸入更新值！');
        return;
      }
      await axios.put(`${baseUrl}/todos/${id}`, todo, {
        headers: {
          Authorization: token
        }
      });
      getTodos({ token, setTodos });
      setTodoEdit({
        ...todoEdit,
        [id]: '' //只清空我剛剛按下修改按鈕的事項的內容，其他事項沒有清空，避免一併被清空。
      });
      console.log(todoEdit);
    } catch (error) {
      throw new Error(error);
    }
  }

  //toggleDone 功能
  async function toggleDone(id, { cookieValue, setTodos }) {
    try {
      const response = await axios.patch(
        `${baseUrl}/todos/${id}/toggle`,
        {},
        { headers: { authorization: cookieValue } }
      );

      getTodos({ cookieValue, setTodos });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  //signout 功能
  async function signout({ cookieValue }) {
    try {
      await axios.post(
        `${baseUrl}/users/sign_out`,
        {},
        { headers: { Authorization: cookieValue } }
      );

      //navigate('/login');
    } catch (error) {
      console.error('Server messages!:', error.response.data.message);

      throw new Error(error.response.data);
    }
  }

  //網頁內容
  return (
    <div className='todolist'>
      <header>
        <img
          id='todotitle'
          src={todotitle}
          alt='Online Todo List'
        />
        <span>{inputValue.nickname}的代辦事項</span>{' '}
        <button
          onClick={() => {
            signout(cookieValue);
          }}>
          登出
        </button>
        {cookieValue}
      </header>

      <div className='inputtodo'>
        <input
          type='text'
          value={newTodo}
          placeholder='新增待辦事項'
          onChange={event => {
            setNewTodo(event.target.value);
          }}
        />
        <button
          type='submit'
          onClick={() => addTodo({ newTodo, setNewTodo, setTodos })}>
          +
        </button>
      </div>
      <div className='listdiv'>
        <div className='listnav'>
          <span>全部</span>
          <span>待完成</span>
          <span>已完成</span>
        </div>
        <ul>
          {todos.map((item, index) => (
            <li key={index}>
              <input
                type='checkbox'
                onClick={() => {
                  toggleDone(item.id, { cookieValue, setTodos });
                }}
              />

              {item.status ? (
                <span style={{ textDecoration: 'line-through' }}>
                  {item.content}
                </span>
              ) : (
                <span>{item.content}</span>
              )}

              <input
                type='text'
                placeholder='更新值'
                onChange={e => {
                  setTodoEdit({
                    ...todoEdit, //在全部現有的 todoEdit 事項之餘(最當初是空的{})，
                    [item.id]: e.target.value //再增加 [item.id](計算屬性名稱): e.target.value。id 是新增事項時，API回傳提供的。todoEdit 收集暫存了所有的修改事項。
                  });
                }}
              />
              <button
                onClick={() => {
                  editTodo(item.id, {
                    cookieValue,
                    setTodos,
                    todos,
                    todoEdit,
                    setTodoEdit
                  });
                }}>
                修改
              </button>
              <button
                onClick={() => {
                  deleteTodo(item.id, { cookieValue, setTodos });
                }}>
                刪除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

//待完成優化功能
//1. toggleDone 畫線加快速度
