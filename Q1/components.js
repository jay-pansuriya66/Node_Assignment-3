// Component 1: UserCard - Displays user profile information
const UserCard = ({ name, email, avatar, followers, following, posts }) => {
    return (
        <div className="user-card">
            <div className="user-avatar">{avatar}</div>
            <h2 className="user-name">{name}</h2>
            <p className="user-email">{email}</p>
            <div className="user-stats">
                <div className="stat">
                    <div className="stat-value">{followers}</div>
                    <div className="stat-label">Followers</div>
                </div>
                <div className="stat">
                    <div className="stat-value">{following}</div>
                    <div className="stat-label">Following</div>
                </div>
                <div className="stat">
                    <div className="stat-value">{posts}</div>
                    <div className="stat-label">Posts</div>
                </div>
            </div>
        </div>
    );
};

// Component 2: TodoList - Interactive todo list with add/delete/complete functionality
const TodoList = () => {
    const [todos, setTodos] = React.useState([
        { id: 1, text: 'Learn React with CDN', completed: false },
        { id: 2, text: 'Create awesome components', completed: false }
    ]);
    const [inputValue, setInputValue] = React.useState('');

    const addTodo = () => {
        if (inputValue.trim() === '') return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        
        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;

    return (
        <div className="todo-container">
            <h2 className="todo-title">📝 My Todo List</h2>
            
            <div className="todo-input-container">
                <input 
                    type="text"
                    className="todo-input"
                    placeholder="Enter a new task..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="todo-btn" onClick={addTodo}>
                    Add Task
                </button>
            </div>

            <ul className="todo-list">
                {todos.map(todo => (
                    <li 
                        key={todo.id} 
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                        <span 
                            className={`todo-text ${todo.completed ? 'completed' : ''}`}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.text}
                        </span>
                        <button 
                            className="delete-btn"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <div className="todo-stats">
                Completed: {completedCount} / {totalCount} tasks
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="app-container">
            <h1 className="app-title">⚛️ React Components - CDN Approach</h1>
            
            <div className="components-grid">
                <UserCard 
                    name="John Doe"
                    email="john.doe@example.com"
                    avatar="👨‍💻"
                    followers={1234}
                    following={567}
                    posts={89}
                />
                
                <TodoList />
            </div>
        </div>
    );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
