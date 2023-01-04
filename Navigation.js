import React from 'react';


const Navigation =({route , clear})=>{
    return (
        <div className='nav flex' onClick={()=>{
          localStorage.setItem('state','signin')
             route('signin');
            clear()
            }} >
   <p>Sign Out</p>
        
        </div>
    )
    
}
export default Navigation;