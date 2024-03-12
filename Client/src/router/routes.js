
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/invoices', component: () => import('pages/InvoicePage.vue') },
      { path: '/receipt', component: () => import('pages/ReceiptPage.vue') },
      { path: '', component: () => import('pages/QuotationPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
