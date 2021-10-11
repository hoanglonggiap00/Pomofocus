/** @format */
import "./App.css";

import Container from "@mui/material/Container";
import Header from "./components/Layouts/Header";
import Main from "./components/Layouts/Main";

import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Themes";

import { useDarkMode } from "./hooks/useDarkMode";
import { useSelector } from "react-redux";

const Background = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-image: ${({ theme }) => `url(${theme.background_img})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 0.5s linear;
`;

function App() {
  const pomo = useSelector((state) => state.pomo.pomoList);
  const currPomoIndex = useSelector((state) => state.pomo.currPomoIndex);
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const bgColor = pomo[currPomoIndex][`color_${theme}`];
  if (!mountedComponent)
    return (
      <div className='lds-spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Background />
      <Container
        maxWidth='md'
        style={{
          backgroundColor: `${bgColor}`,
          padding: "25px",
          borderRadius: "20px",
          marginTop: "50px",
          marginBottom: "50px",
          opacity: "0.9",
          transition: "background-color 0.5s ease-in-out 0s",
        }}>
        <Header changeTheme={themeToggler} theme={theme} />
        <Main theme={theme} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
