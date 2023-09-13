import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const baseUrl = 'https://todolist-api.hexschool.io';
import 'src/layouts/layoutcss.css';
import Leftimg from 'src/components/components.jsx';

export default function Signup({ inputValue, setInputValue }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function signupfunc({ email, password, nickname, confirmpassword }) {
    if (email.length == 0) {
      alert('請輸入電子郵件！');
    }
    if (password.length < 6) {
      alert('密碼請至少六個字元！');
    }
    if (nickname.length == 0) {
      alert('請輸入使用者名稱！');
    }

    if (password !== confirmpassword) {
      alert('密碼確認不符！');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/users/sign_up`, {
        email,
        password,
        nickname
      });
      const { token } = response.data;
      document.cookie = `token=${token};`;
      setIsLoading(false);
      navigate('/todolist');
      console.log(response.data);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      if (error.message === 'Request failed with status code 400') {
        alert('用戶已存在！');
      }

      throw new Error(error);
    }
  }

  return (
    <div className='signup'>
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
        <h3>您的暱稱</h3>
        <input
          type='text'
          placeholder='您的暱稱'
          onChange={event => {
            setInputValue({ ...inputValue, nickname: event.target.value });
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
        <h3>再次輸入密碼</h3>
        <input
          type='password'
          placeholder='請再次輸入密碼'
          onChange={event => {
            setInputValue({
              ...inputValue,
              confirmpassword: event.target.value
            });
          }}
        />
        <br />
        <button
          type='button'
          disabled={isLoading}
          onClick={() => {
            signupfunc({
              email: inputValue.email,
              nickname: inputValue.nickname,
              password: inputValue.password,
              confirmpassword: inputValue.confirmpassword
            });
          }}>
          註冊
        </button>
        <br />
        <Link to='/login'>登入</Link>
      </div>
    </div>
  );
}
