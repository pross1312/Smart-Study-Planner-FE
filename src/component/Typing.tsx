import React from 'react';

const Typing: React.FC = () => {
  return (
    <div className='typing d-flex' style={{width: '70px', height: '30px'}}>
      <div className='typing__dot'></div>
      <div className='typing__dot'></div>
      <div className='typing__dot'></div>
    </div>
  );
};

export default Typing;
