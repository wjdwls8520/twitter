import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Layout from "./components/layout";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRout from "./components/protected-rout";



const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <ProtectedRout>
        <Layout />
      </ProtectedRout>
    ),
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ],
  },
  {
    path:"/login",
    element: <Login />,
    children: [
      {

      }
    ]
  },
  {
    path:"/create-account",
    element: <CreateAccount />,
    children: [
      {

      }
    ]
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing:border-box;
  }
  body {
    background-color: black;
    color: white;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading]= useState(true);
  const init = async() => {
    // 파이어베이스를 기다리는 동안     

    await auth.authStateReady();
    setIsLoading(false);
  }
  useEffect(()=> {
    init();
  }, []);

  return <>
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}   
    </Wrapper>
  </>
  
}

export default App
