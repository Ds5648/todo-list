import React,{useState,useEffect} from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import './App.css';

function App() {
  const[isCompleteScreen,setIsCompleteScreen] = useState(false);
  const[allTodos,setTodos]=useState([]);
  const[newTitle,setnewTitle]=useState("");
  const[newDescription,setnewDescription]=useState("");
  const[CompleteTodo,setCompleteTodo]=useState([]);
  
  // Add todo logic 
  const handleAddTodo=()=>{
    let newTodoItem={
    title:newTitle,
    description:newDescription
}

// after adding storing in local stroage
let updatedTodo=[...allTodos];
updatedTodo.push(newTodoItem);
setTodos(updatedTodo);
localStorage.setItem('newupdated',JSON.stringify(updatedTodo))
  }

  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem("newupdated"));
    if (savedTodo)
    {
      setTodos(savedTodo);
    }
  },[])

// Delete 
  const handledeleteTodo=(index)=>{
    let reducetodo=[...allTodos];
    reducetodo.splice(index,1);
    //splice deleted like  array.splice(index, howmany, item1, ....., itemX)
    localStorage.setItem("newupdated",JSON.stringify(reducetodo))
    setTodos(reducetodo);
}



// complete tab where all complete todo in complete tab
const handlecompletetodo=(index)=>{
  let now =new Date();
  let dd= now.getDate();
  let mm=now.getMonth();
  let yyyy=now.getFullYear()+1;
  let h=now.getHours();
  let m = now.getMinutes();
  let s =now.getSeconds();
  let CompletedOn = dd + "-" +mm +"-"+yyyy+"-"+"at" + h +":"+m+":"+s;

 // filter the item which was completed in add tab which you checkk
let filteredItem ={...allTodos[index],CompletedOn : CompletedOn}
//after completing the todo the todo goes in the completed tab

let updatedCompletedarr=[...CompleteTodo];
updatedCompletedarr.push(filteredItem);
setCompleteTodo(updatedCompletedarr);

//this handledelte will delete the todo from add section 
// so thats why using simple deletd todo

handledeleteTodo(index);
localStorage.setItem('newCompletedtodo',JSON.stringify(updatedCompletedarr));
};


// deleted the completed todos
// thats why using the checked 
const handledeletecompletedTodo=(index)=>{
  let reducetodo=[...CompleteTodo];
  reducetodo.splice(index,1);
  //splice deleted like  array.splice(index, howmany, item1, ....., itemX)
  localStorage.setItem("newCompletedTodo",JSON.stringify(reducetodo))
  setCompleteTodo(reducetodo);
}


useEffect(()=>{
  let savedTodo=JSON.parse(localStorage.getItem("newupdated"));
  let savedCompletedTodo=JSON.parse(localStorage.getItem("Completedtodo"));

  if (savedTodo)
  {
    setTodos(savedTodo);
  }

  if (savedCompletedTodo){
setCompleteTodo(savedCompletedTodo);

  }
},[])





  return (
    <div className="App">
  <h1> My Todos List</h1>

  <div className="todoclass">
    <div className="todo-input">
      <div className ="todoinput-item">
        <label><i>Tittle</i></label>
        <input type="text" value={newTitle} onChange={(e)=>setnewTitle(e.target.value)} placeholder="enter"/>
      </div>
      <div className ="todoinput-item">
        <label><i>Description</i></label>
        <input type="text" value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder="enter"/>
      </div>
      <div className ="todoinput-item">
        <button type="button" onClick = {(handleAddTodo)} className="primarybtn">add</button>
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

    {isCompleteScreen=== false && allTodos.map((item,index)=> {
      return(
    <div className='todo-list-item' key={index}>

    <div>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    </div>
    <div>
      <MdDelete onClick = {()=>handledeleteTodo(index)} className='icon' title='delete?'/>
      <FaCheck onClick={()=>handlecompletetodo(index)} className='check-icon' title='completed?'/>

    </div>

    </div>)
    })}


    {isCompleteScreen=== true && CompleteTodo.map((item,index)=> {
      return(
    <div className='todo-list-item' key={index}>

    <div>
    <h3>{item.title}</h3>
    <p><i>Completed on :</i>{item.CompletedOn}</p>
    </div>
    <div>
      <MdDelete 
      onClick = {()=>handledeletecompletedTodo(index)} className='icon' title='delete?'/>


    </div>

    </div>)
    })}


    </div>
  </div>
</div>
  );
}

export default App;
