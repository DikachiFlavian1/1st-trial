import React from 'react';
import axios from 'axios';

const App = ({ todos }) => {
  const [todoList, setTodoList] = React.useState(todos);

  const addTodo = async (text) => {
    const response = await axios.post('/api/todos', { text });
    setTodoList([...todoList, response.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(e.target.todo.value);
        e.target.todo.value = '';
      }}>
        <input type="text" name="todo" />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default App;