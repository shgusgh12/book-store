import { ThemeProvider } from 'styled-components';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { GlobalStyle } from './style/global';
import { light, dark, ThemeName, getTheme } from './style/theme';
import ThemeSwitcher from './components/common/header/ThemeSwitcher';
import { useContext, useState } from 'react';
import { BookStoreThemeProvider, ThemeContext } from './context/themeContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout><Home/></Layout>,
    errorElement : <Error/>
  },
  {
    path : '/books',
    element : <Layout><Books /></Layout>
  },
  {
    path : '/signup',
    element : <Layout><Signup /></Layout>,
  },
  {
    path : '/reset',
    element : <Layout><ResetPassword /></Layout>,
  },
  {
    path : '/login',
    element : <Layout><Login /></Layout>
  }
])

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
