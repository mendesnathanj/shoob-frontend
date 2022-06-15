export default {
  home: () => '/admin/' as const,
  products: {
    edit: (id: number | string) => `/products/${id}/edit` as const,
    home: () => '/products' as const,
    new: () => '/products/new' as const,
  },
  root: () => '/' as const,
  yearbookJobs: () => '/yearbook-jobs' as const,
};
