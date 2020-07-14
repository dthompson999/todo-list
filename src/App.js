import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [task, setTask] = useState("");
  const [taskTouched, setTaskTouched] = useState(false);
  const [list, setList] = useState([]);

  const addTask = e => {
    e.preventDefault();
    setList([...list, {task}]);
    setTask("");
    setTaskTouched("");
  }

  const completeTask = i => {
    const listCopy = [...list];
    listCopy[i].completed = !listCopy[i].completed;
    setList(listCopy);
    console.log(list, i);
  }

  const deleteItem = (e, i) => {
    let copy = [...list];
    copy.splice(i, 1);
    setList(copy);
  }

  return (
    <div className="container">
      <div className="App">
        <div className="text-center">
          <div className="jumbotron mt-5 bg-white text-dark shadow-lg rounded">
            <h1>Welcome to ToDo List!</h1>
          </div>
          <div class="mx-auto" style={{width: '400px'}}>
            <form onSubmit={addTask}>
              <div class="form-inline ml-4 mt-5">
                <div class="form-group mx-sm-3 mb-2">
                  <input type="text"
                    class="form-control"
                    name="task"
                    onBlur={e => setTaskTouched(true)}
                    onChange={e => setTask(e.target.value)}
                    value={task}
                  />
                </div>
                {
                  task.length >= 5 ?
                  <button type="submit" class="btn btn-primary mb-2">Add Task</button> :
                  <button disabled type="submit" class="btn btn-primary mb-2">Add Task</button>
                }
                {
                  taskTouched && task.length <= 5 ? 
                  <p className="text-danger">Task description must be 5 characters or longer.</p> : 
                  ""
                }
              </div>
            </form>
          </div>
        </div>
        <table className="table table-striped table-hover mt-5 shadow-lg rounded">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Completed</th>
              <th scope="col">Task Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {list.map((todo, i) =>
            <tr key={i}>
              {
                !todo.completed ?
                <td><button class="btn btn-sm btn-success mt-1" onClick={e => completeTask(i)}>Check</button></td> :
                <td><button class="btn btn-sm btn-success mt-1" onClick={e => completeTask(i)}>Uncheck</button></td>
              }
              {
                !todo.completed ?
                <td style={{paddingTop: "20px"}}>{todo.task}</td> :
                <td style={{paddingTop: "20px", textDecoration: "line-through"}}>{todo.task}</td>
              }
              <td><a href="/#" onClick={e => deleteItem(e, i) }><button class="btn btn-sm btn-danger mt-1">Delete</button></a></td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
