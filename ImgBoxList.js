import React from 'react';
import ImgBox from './Navigation/ImgBox';
const ImgBoxList = ({source,box})=>{
    return (
        <div className='center a'>
          <div className='absolute ' id='parentDiv'>
            <img id='inputimage' alt='' src={source} width='500px' height='auto' className='center1'/>
    
            {
            
          
          box.map((region,i)=>{
          
          return (
            <ImgBox key={i} top={box[i].topRow} left={box[i].leftCol} right={box[i].rightCol} bottom={box[i].bottomRow}/>
          )
          })}
          
          </div>
        </div>
      );
}
export default ImgBoxList;