import Vue from 'vue'
import Router from 'vue-router'
import TakeDashboard from './take/views/TakeDashboard'
import WarehouseDetails from './take/views/warehouse/WarehouseDetails'
import ProductDetails from './take/views/product/ProductDetails'
import ShowProducts from './take/views/product/ShowProducts'
import ClientDetails from './take/views/client/ClientDetails'
import InvoiceDetails from './take/views/invoice/InvoiceDetails'
import Warehouse from './take/views/warehouse/Warehouse'
import Product from './take/views/product/Product'
import Invoice from './take/views/invoice/Invoice'
import Client from './take/views/client/Client'
import ShowInvoices from './take/views/invoice/ShowInvoices'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/take',
      name: 'TakeDashboard',
      component: TakeDashboard,
      props: true
    },
    {
      path: '/warehouseDetails/:warehouseId',
      name: 'WarehouseDetails',
      component: WarehouseDetails,
      props: true
    },
    {
      path: '/productDetails/:productId',
      name: 'ProductDetails',
      component: ProductDetails,
      props: true
    },
    {
      path: '/clientDetails/:clientId',
      name: 'ClientDetails',
      component: ClientDetails,
      props: true
    },
    {
      path: '/invoiceDetails/:invoiceId',
      name: 'invoiceDetails',
      component: InvoiceDetails,
      props: true
    },
    {
      path: '/showProducts/:warehouseId',
      name: 'ShowProducts',
      component: ShowProducts,
      props: true
    },
    {
      path: '/showInvoices/:clientId',
      name: 'ShowInvoices',
      component: ShowInvoices,
      props: true
    },
    {
      path: '/warehouse/:warehouseId',
      name: 'WarehouseUpdate',
      component: Warehouse,
      props: true
    },
    {
      path: '/warehouse',
      name: 'Warehouse',
      component: Warehouse,
    },
    {
      path: '/product/:productId',
      name: 'ProductUpdate',
      component: Product,
      props: true
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
    },
    {
      path: '/invoice/:invoiceId',
      name: 'InvoiceUpdate',
      component: Invoice,
      props: true
    },
    {
      path: '/invoice',
      name: 'Invoice',
      component: Invoice,
    },
    {
      path: '/client/:clientId',
      name: 'ClientUpdate',
      component: Client,
      props: true
    },
    {
      path: '/client',
      name: 'Client',
      component: Client,
    }
  ]
})
