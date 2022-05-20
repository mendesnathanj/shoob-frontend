import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../components/pages/Admin';
import YearbookJobs from '../components/pages/Admin/YearbookJobs';

export default function Admin() {
  return (
    <Router basename="admin">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route element={<YearbookJobs />} />
        </Route>
      </Routes>
    </Router>
  );
}
