import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Home } from '../components/pages/Admin';
import ProductsEdit from '../components/pages/Admin/Products/ProductsEdit';
import ProductsHome from '../components/pages/Admin/Products/ProductsHome';
import ProductsNew from '../components/pages/Admin/Products/ProductsNew';
import YearbookJobs from '../components/pages/Admin/YearbookJobs';
import routes from '../components/routes';

const queryClient = new QueryClient();

export default function Admin() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="admin">
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
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
