import { useEffect, useState } from 'react';
import './App.css';
import { useAsync } from './hooks/useAsync';
import { useInput } from './hooks/useInput';

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [fetchTodos, isLoadingTodos, errorTodos] = useAsync(requestTodos);
  const inputString = useInput('text');
  const inputNumber = useInput(101);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestTodos() {
    const todosFetch = await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json());
    setTodos(todosFetch);
  }

  return (
    <section className='App'>
      <h1>Custom hooks example</h1>

      <hr />

      <h2>My custom hook</h2>
      <section className='use-fetching'>
        <h3>useFetching</h3>
        {isLoadingTodos && <p>Loading...</p>}
        {!!todos.length && (
          <ul className='use-fetching__list'>
            {todos.map(todo => (
              <li className='use-fetching__list-item' key={todo.id}>
                <span>
                  <b>Title:</b> {todo.title}
                </span>
                <span>
                  <b>Status:</b> {todo.completed ? 'complited' : 'not complited'}
                </span>
              </li>
            ))}
          </ul>
        )}

        {errorTodos && (
          <p>
            <b>Error:</b>
            {errorTodos}
          </p>
        )}
      </section>

      <hr />

      <section className='use-input'>
        <h3>useInput</h3>
        <div>
          <input type='text' {...inputString.bind} />
          <button onClick={inputString.onClear} type='button'>
            Clear
          </button>
          <p>
            <b>Value:</b> {inputString.value}
          </p>
        </div>
        <div>
          <input type='number' {...inputNumber.bind} />
          <button onClick={inputNumber.onClear} type='button'>
            Clear
          </button>
          <p>
            <b>Value:</b> {inputNumber.value}
          </p>
        </div>
      </section>

      <h2>Site custom hooks</h2>
      <section>
        <h3>
          <a href='https://usehooks-ts.com/'>usehooks-ts</a>
        </h3>
      </section>
      <section>
        <h3>
          <a href='https://usehooks.com/'>usehooks</a>
        </h3>
      </section>
    </section>
  );
}

export default App;
