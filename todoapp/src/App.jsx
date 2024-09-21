import  {useState, useEffect} from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription,setDescription] = useState("");
  const [CompletedTodos, setCompletedTodos] = useState([])
  const HandleAddTodo =() =>{
    if (newTitle === "") {
      alert("Please fill out both the title");
      return;
    }
    let newTodoItems = {
      title : newTitle,
      description : newDescription
    }
    let updateTodoarr =[...allTodos, newTodoItems];
    setTodos(updateTodoarr);
    localStorage.setItem("todolist", JSON.stringify(updateTodoarr));
    setTitle("");
    setDescription("");
  };
  useEffect(()=>{
    let saveTodos = JSON.parse(localStorage.getItem('todolist'))
    let saveCompletedTodos = JSON.parse(localStorage.getItem('CompletedTodo'))

    if(saveTodos){
      setTodos(saveTodos)
    }
    if(saveCompletedTodos){
      setCompletedTodos(saveCompletedTodos)
    }

  },[]);
  const handleDelete = (index) =>{ 
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);  
  };
  const handleDeleteCompleted = (index) =>{
    let reducedTodo = [...CompletedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo); 
  }
  const handleCompleted = (index) =>{
    let now = new Date()
    let dd = now.getDay()
    let mm = now.getMonth()
    let yyyy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()

    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;
    let FilterItems = {
      ...allTodos[index],
      completedOn : completedOn

    }
    let updateCompletedarr = [...CompletedTodos]
    updateCompletedarr.push(FilterItems)
    setCompletedTodos(updateCompletedarr)
    handleDelete(index)
    localStorage.setItem('CompletedTodo',JSON.stringify(updateCompletedarr));

  }
  return (
    <>
      <div className='text-center h-auto m-auto '>
        <h1 className='font-bold text-center w-2/3 text-4xl py-5'>Todo-List</h1>  
        <div className='bg-gray-600  items-center  relative w-2/3 p-2'>
            <div className='flex'>
                  <div className=' py-5  w-30'>
                  <label className='text-white px-3'>Title</label> 
                  <input type="text" value={newTitle} onChange={(e)=> setTitle(e.target.value)} placeholder='What is the title of your Todo ?' size={40} />
                </div>
                <div className='pl-3 py-5  w-30'>
                  <label className='text-white px-3'>Description</label>
                  <input type="text"  value={newDescription} onChange={(e)=> setDescription(e.target.value)} placeholder='What is the title of your Todo ?' size={40} />
                </div>
                <div className=' px-5 py-5 text-center ml-20 h-auto  bg-slate-400 hover:bg-slate-300 cursor-pointer'>
                  <button className='text-white'onClick={HandleAddTodo} type='button'>Add</button>
                </div>

            </div>
            <div className='text-white text-left'>
               <button
                      className={`px-3 w-fit ${isCompleteScreen === false ? 'bg-green-500 hover:bg-green-200' : 'bg-gray-500'} `}
                      onClick={() => setIsCompleteScreen(false)}>
                   Todo
               </button>

                <button
                   className={`px-3 w-fit ${isCompleteScreen === true ? 'bg-green-500 hover:bg-green-200' : 'bg-gray-500'} `}
                   onClick={() => setIsCompleteScreen(true)}>
                   Completed
                </button>
          </div>

{/* Hiển thị danh sách Todo chưa hoàn thành */}
{!isCompleteScreen &&
            allTodos.map((item, index) => (
              <div
                key={index}
                className='flex rounded-md shadow-inner bg-slate-500 justify-between p-6 mb-3 pt-3 mt-6'
              >
                <span className='p-3'>
                  <p className='text-4xl mb-7 text-green-400'>{item.title}</p>
                  <p className='text-sm text-gray-400'>{item.description}</p>
                </span>
                <span className='ml-3 mt-7'>
                  <button
                    className='p-3 px-5 hover:bg-red-600 cursor-pointer text-4xl'
                    onClick={() => handleDelete(index)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className='p-3 px-5 text-green-500 hover:bg-green-300 cursor-pointer text-4xl'
                    onClick={() => handleCompleted(index)}
                  >
                    <ImCheckboxChecked />
                  </button>
                </span>
              </div>
            ))}

          {/* Hiển thị danh sách Todo đã hoàn thành */}
          {isCompleteScreen &&
            CompletedTodos.map((item, index) => (
              <div
                key={index}
                className='flex rounded-md shadow-inner bg-slate-500 justify-between p-6 mb-3 pt-3 mt-6'
              >
                <span className='p-3'>
                  <p className='text-4xl mb-7 text-green-400'>{item.title}</p>
                  <p className='text-sm text-gray-400'>{item.description}</p>
                  <p className='text-xs'>Completed On: {item.completedOn}</p>
                </span>
                <span className='ml-3 mt-7'>
                  <button
                    className='p-3 px-5 hover:bg-red-600 cursor-pointer text-4xl'
                    onClick={() => handleDeleteCompleted(index)}
                  >
                    <MdDelete />
                  </button>
                </span>
              </div>
            ))}

        </div>
       
      </div>
      
    </>
  )
}

export default App
