import React,{useState} from 'react';
import './App.css';

function App() {
  const[isCompleteScreen,setIsCompleteScreen] = useState(false);
  return (
    <div className="App">
  <h1> My Todos</h1>

  <div className="todoclass">
    <div className="todo-input">
      <div className ="todoinput-item">
        <label>Tittle</label>
        <input type="text" placeholder="enter"/>
      </div>
      <div className ="todoinput-item">
        <label>Description</label>
        <input type="text" placeholder="enter"/>
      </div>
      <div className ="todoinput-item">
        <button type="button" className="primarybtn">add</button>
      </div>
    </div>

    <div className='btn-area'>
      <button 
      className={`secondarybtn ${isCompleteScreen === false && 'active'}`} 
      onClick={()=>setIsCompleteScreen(false)}>Todo </button>
      
      <button className={`secondarybtn ${isCompleteScreen === true && 'active'}`}
      onClick={()=>setIsCompleteScreen(true)}>Completed</button>
    </div>

    <div className='todo-list'>
    <div className='todo-list-item'>
      <h3>task1</h3>
      <p>Description</p>
    </div>
  </div>
    </div>
    </div>
  );
}

export default App;
