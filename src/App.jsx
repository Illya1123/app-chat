import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Modal from 'react-modal';
import { Outlet } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './components/googleSignIn/SignIn';
import PrivateRoute from './components/PrivateRoute';

const Layout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: (
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                ),
            },
            { path: '/signin', element: <SignIn /> },
        ],
    },
]);

function App() {
    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'));
    }, []);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
