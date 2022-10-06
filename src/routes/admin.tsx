export default {
  failedAccessCodeAttempts: {
    home: () => '/failed-access-code-attempts' as const,
  },
  home: () => '/admin/' as const,
  products: {
    edit: (id: number | string) => `/products/${id}/edit` as const,
    home: () => '/products' as const,
    new: () => '/products/new' as const,
  },
  root: () => '/' as const,
  seniorStatus: () => '/senior-status' as const,
  yearbookAdminJobs: {
    edit: (id: number | string) => `/yearbook-admin-jobs/${id}/edit` as const,
    home: () => '/yearbook-admin-jobs' as const,
    new: () => '/yearbook-admin-jobs/new' as const,
    show: (id: number | string) => `/yearbook-admin-jobs/${id}` as const,
  },
};
