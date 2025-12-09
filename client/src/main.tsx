import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { PostsProvider } from './context/PostsContext.tsx'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider> 
        <App />
        <ToastContainer position="bottom-right" theme="colored" />
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>,
);