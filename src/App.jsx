import { ThemeProvider } from '@mui/material';
import customTheme from './customTheme';
import Header from './components/Header';

function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Header />
      </ThemeProvider>
    </>
  );
}

export default App;
