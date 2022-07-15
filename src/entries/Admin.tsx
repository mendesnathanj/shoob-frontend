import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Home } from '../components/pages/Admin';
import ProductsEdit from '../components/pages/Admin/Products/ProductsEdit';
import ProductsHome from '../components/pages/Admin/Products/ProductsHome';
import ProductsNew from '../components/pages/Admin/Products/ProductsNew';
import YearbookJobs from '../components/pages/Admin/YearbookJobs';
import routes from '../components/routes';
import YearbookAdminJobsHome from '../components/pages/Admin/YearbookAdminJobs/YearbookAdminJobsHome';
import YearbookAdminJobsNew from '../components/pages/Admin/YearbookAdminJobs/YearbookAdminJobsNew';
import YearbookAdminJobEdit from '../components/pages/Admin/YearbookAdminJobs/YearbookAdminJobsEdit';

const queryClient = new QueryClient();

export default function Admin() {
  const isAdminSubdomain = window.location.hostname.split('.').includes('admin');
  const basename = isAdminSubdomain ? '' : 'admin';

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="light" />
      <Router basename={basename}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path={routes.admin.yearbookJobs()} element={<YearbookJobs />} />
          <Route path={routes.admin.products.home()}>
            <Route index element={<ProductsHome />} />
            <Route path={routes.admin.products.new()} element={<ProductsNew />} />
            <Route path={routes.admin.products.edit(':id')} element={<ProductsEdit />} />
          </Route>
          <Route path={routes.admin.yearbookAdminJobs.home()}>
            <Route index element={<YearbookAdminJobsHome />} />
            <Route path={routes.admin.yearbookAdminJobs.new()} element={<YearbookAdminJobsNew />} />
            <Route path={routes.admin.yearbookAdminJobs.edit(':id')} element={<YearbookAdminJobEdit />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
