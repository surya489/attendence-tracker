import './App.css';

import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Footer />
      <Navbar />
    </div>
  );
}

export default App;
