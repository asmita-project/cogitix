import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Characters from './pages/characters/character';
import Sidepanel from './component/sidebar/sidebar';

const router = createBrowserRouter([

  {
    path: '',
    element:<Sidepanel />,
    children: [
      {
        path: '',
        element: <Characters />,
    },
      {
        path: 'character/:id',
        element: <Characters />,
    },
    {
      path: 'cogitix',
        element: <Characters />,
      
    }
    ]
  }
]);




function App() {
 
  return <RouterProvider router={router} />;
}
export default App;
