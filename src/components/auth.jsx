import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <>
      <div className='listnav'>
        <span>全部</span>
        <span>待完成</span>
        <span>已完成</span>
      </div>

      {/* 指定渲染位置 */}
      <Outlet />
    </>
  );
};

export default Auth;
