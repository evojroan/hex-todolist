import todotitle from 'src/assets/todotitle.png';
import todoman from 'src/assets/todoman.png'; //左側圖片
import 'src/components/compcss.css';
import {useState} from 'react'

export default function Leftimg() {
  return (
    <div className='imgSec'>
      <img
        id='todotitle'
        src={todotitle}
        alt='Online Todo List'
      />
      <img
        id='todoman'
        src={todoman}
        alt='Todoman'
      />
    </div>
  );
}

