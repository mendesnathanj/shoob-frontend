import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../components/pages/Admin';
import YearbookJobs from '../components/pages/Admin/YearbookJobs';
import routes from '../components/routes';

export default function Admin() {
  return (
    <Router basename="admin">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path={routes.admin.yearbookJobs()} element={<YearbookJobs />} />
      </Routes>
    </Router>
  );
}
