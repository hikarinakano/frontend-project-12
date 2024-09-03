import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne } from './Components/Pages';
import { NotFound } from './Components/NotFound';
import LoginPage  from './Components/Form';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/login" element={< LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;