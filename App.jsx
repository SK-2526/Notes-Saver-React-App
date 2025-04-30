
import { useEffect, useState } from 'react';
import './App.css'
import { AiOutlineCopy, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import toast from 'react-hot-toast';


function App() {

const [allTodos,setTodos]= useState([]);  
const [Title, setNewTitle]= useState("");
const [Description, setNewDescription]= useState("");
const [currentEdit, setcurrentEdit]= useState("");
const [currentEdittedItem, setcurrentEdittedItem]= useState("");

const handleDeleteTodo= (index)=>{
   let removeTodos= [...allTodos];
   removeTodos.splice(index,1);    //reomve elemt from specify index  

   localStorage.setItem('TodoList',JSON.stringify(removeTodos)); //delete from local strg
   setTodos(removeTodos)
};

const handleEdit= (ind, item)=>{
  setcurrentEdit(ind); 
  setcurrentEdittedItem(item);
}

const handleUpdateTitle= (value)=>{
    setcurrentEdittedItem((prev)=>{
      return {...prev,title:value}
    })
}

const handleUpdateDescription= (value)=>{
  setcurrentEdittedItem((prev)=>{
    return {...prev,description:value}
  })
}

const handleUpdate= ()=>{
  let newTodo= [...allTodos];
  newTodo[currentEdit]= currentEdittedItem;
  setTodos(newTodo);
  setcurrentEdit("");
  toast.success('Task Updated Succefully');
}

const handleAddTodo = ()=>{
  
  let now= new Date();
  let dd= now.getDate();
  let mm= now.getMonth()+1;
  let yy= now.getFullYear();
  let hh= now.getHours();
  let min= now.getMinutes();
  let completedOn= dd + "-" + mm + "-" + yy + " at " + hh + ":" + min ;

  let newTodoItem= {
    title: Title,
    description: Description,
    Completedon : completedOn
  }
 
  let updatedTodoArr= [...allTodos];
  updatedTodoArr.push(newTodoItem);
  setTodos(updatedTodoArr);
//after referesh page data not loss for that we use localStorage
localStorage.setItem('TodoList', JSON.stringify(updatedTodoArr)); 
toast.success('Task Created Succefully');
}

useEffect(()=>{
  //JSON.parse=> convert into Arry or objects
  let savedTodos= JSON.parse(localStorage.getItem('TodoList'));
  if(savedTodos){
    setTodos(savedTodos)        
  }

},[]);

  return (
<div className='App'>
    <div>
       <h1>ToDO List </h1>

    <div className='todo-wrapper'>

      <div className='todo-inp'>
         <div className='todo-inp-items'>
            <label >Title</label>
            <input type="text" value={Title} 
            onChange={e => setNewTitle (e.target.value)}
            placeholder="Enter task title" />
         </div>
         <div className='todo-inp-items'>
            <label >Description</label>
            <input type="text"  value={Description} 
            onChange={e => setNewDescription (e.target.value)} 
            placeholder="Enter task description" />
         </div>
         <div className='todo-inp-items'>
           <button type='button' onClick={handleAddTodo} 
           className='primaryBtn'>Add Tasks</button>
         </div>
      </div>

      <div className='Todo-list'>
        
        {allTodos.map((item,index)=>{
          if(currentEdit=== index){
             return (
              <div className='edit-wrapper' key={index}>
               <input type="text" 
               placeholder='updated Title' value={currentEdittedItem.title}   
               onChange={(e)=>handleUpdateTitle(e.target.value)}
               />

               <textarea type="text" rows={4}
               placeholder='updated description' value={currentEdittedItem.description}   
               onChange={(e)=>handleUpdateDescription(e.target.value) }
               />

              <button type='button' onClick={handleUpdate} 
              className='primaryBtn'>Update</button>
             </div>
             )
          }else{
            return(
              <div className='Todo-list-items' key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small><i>Completed On :{item.Completedon}</i></small>
            </div>
  
            <div>
              
              <AiOutlineEdit 
              className="icon"
              onClick={() => {handleEdit (index,item)
              }}
              title="Edit?"
              />
              
              <AiOutlineCopy 
              title='Copy to Clipboard'
              className='copy-content'
              onClick={()=>{navigator.clipboard.writeText(item.description)
              toast.success("Copied to Clipboard");  
              }}
              />

              <AiOutlineDelete
              className="icon"
              onClick={() => {handleDeleteTodo (index)
                toast.success('Task Deleted')
              }}
              title="Delete?"
              /> 

            </div>
          </div>
            )
          }
        })}

      </div>
    </div>

    </div>


</div>  

)
}

export default App
