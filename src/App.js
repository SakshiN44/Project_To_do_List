import './App.css';
import TextField from '@material-ui/core/TextField';
import {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import {db} from "./firebase_config";
import firebase from "firebase";
import TodoListItem from "./Todo";

function App() {

  const[todos, setTodos] = useState([]);
  const [todoinput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos(){
    db.collection("todos").onSnapshot(function(querySnapshot){
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  function addTodo(e){

    e.preventDefault();
    console.log(`you are tying to add a todo`);

    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoinput,
    });

    setTodoInput("");


  }

  return (
    <div className="App" 
    style={{ 
      display: "flex",
      flexDirection: "column" ,
      justifyContent: "top",
      margin: "128px auto",
      borderradius: "10px",
      paddingTop: "10px",
      paddingBottom: "60px",
      paddingLeft: "20px",
      alignItems: "center",
      backgroundColor: 'rgb(0.00,0.00,0.00, 0.10)',
      maxWidth: "600px",
      width: "100vw"
      }}>
      <div>
      <h1 align = "center">To-Do App</h1>
      <form>
        <TextField 
        id="standard-basic" 
        label="Write your To-Do Task"
        variant="filled"
        color= "black"
        value = {todoinput}
        onChange={(e) => setTodoInput(e.target.value)} 
        style={{
          maxWidth: "480px",
          width: "90vw"
        }}/>
        <Button 
        type="submit" 
        variant="contained" 
        onClick={addTodo} 
        style={
          {display: "none"}
        }>
          Default
        </Button>
      </form>

      <div style={{ marginTop:"25px"}}>
        {todos.map((todo) => (
            <TodoListItem 
            todo={todo.todo} 
            inprogress={todo.inprogress} 
            id={todo.id}/>
          ))}
      </div>

      </div>
    </div>
  );
}

export default App;
