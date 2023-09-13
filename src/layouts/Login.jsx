//OK
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const baseUrl = 'https://todolist-api.hexschool.io';
import 'src/layouts/layoutcss.css';
import Leftimg from 'src/components/components.jsx';

export default function Login({ inputValue, setInputValue }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function loginfunc({ email, password }) {
    if (email.length == 0) {
      alert('請輸入電子郵件！');
    }
    if (password.length == 0) {
      alert('請輸入密碼！');
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/users/sign_in`, {
        email,
        password
      });
      const { token } = response.data;

      document.cookie = `token=${token};`;
      
      console.log('登入成功，Token是：',token)
      
      setInputValue({ ...inputValue, nickname: response.data.nickname });
      
      navigate('/todolist');
      setIsLoading(false);
      return response.data;
    } catch (error) {
      alert('電子郵件或密碼錯誤！');
      setIsLoading(false);
      throw new Error(error);
    }
  }

  return (
    <div className='login'>
      <Leftimg />
      <div className='right'>
        <h1>最實用的線上待辦事項服務</h1>
        <h3>Email</h3>
        <input
          type='email'
          placeholder='請輸入 Email'
          onChange={event => {
            setInputValue({ ...inputValue, email: event.target.value });
          }}
        />
        <h3>密碼</h3>
        <input
          type='password'
          placeholder='請輸入密碼'
          onChange={event => {
            setInputValue({ ...inputValue, password: event.target.value });
          }}
        />
        <br />
        <button
          type='button'
          disabled={isLoading}
          onClick={() => {
            loginfunc({
              email: inputValue.email,
              password: inputValue.password
            });
          }}>
          登入
        </button>
        <br />
        <Link to='/signup'>註冊帳號</Link>
      </div>
    </div>
  );
}
