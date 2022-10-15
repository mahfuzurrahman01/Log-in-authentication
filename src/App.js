import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Error from './Components/Error'
import Main from './layouts/Main';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Signin></Signin>
      },
      {
        path: '/signin',
        element: <Signin></Signin>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      }
    ]
  }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
