import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../components/pages/Admin';

export default function Admin() {
  return (
    <Router basename="admin">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
