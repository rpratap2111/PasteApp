import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/Navbar';
import ViewPaste from './componentes/ViewPaste';
import Home from './componentes/Home';
import Paste from './componentes/Paste';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path: '/pastes',
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path: '/pastes/:id',
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    },
  ]
);

function App() {

  return (
    <> 
      <RouterProvider router={router}/>
    </>
  )
}

export default App
