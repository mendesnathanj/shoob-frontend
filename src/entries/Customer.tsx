import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/Customer/Home';

export default function Customer() {
  console.log('customer rendering...');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
