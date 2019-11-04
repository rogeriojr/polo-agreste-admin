import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

// Menu Dashboard
import DashboardPage from 'containers/Pages/DashboardMenu/HomePage/Loadable';

// Menu Pedidos
import OrderListPage from 'containers/Pages/OrderMenu/ListPage/Loadable';
import OrderViewPage from 'containers/Pages/OrderMenu/ViewPage/Loadable';

// Menu Cash
import CashExpressPage from 'containers/Pages/CashExpressMenu/Loadable';

// Menu Produtos
import CatalogProductListPage from 'containers/Pages/CatalogMenu/ProductListPage/Loadable';
import CatalogProductInsertPage from 'containers/Pages/CatalogMenu/ProductInsertPage/Loadable';
import CatalogProductUpdatePage from 'containers/Pages/CatalogMenu/ProductUpdatePage/Loadable';
import CatalogProductImportPage from 'containers/Pages/CatalogMenu/StockPage/Loadable';
import CatalogColorListPage from 'containers/Pages/CatalogMenu/ColorListPage/Loadable';
import CatalogColorInsertPage from 'containers/Pages/CatalogMenu/ColorInsertPage/Loadable';
import CatalogColorUpdatePage from 'containers/Pages/CatalogMenu/ColorUpdatePage/Loadable';
import CatalogSizeListPage from 'containers/Pages/CatalogMenu/SizeListPage/Loadable';
import CatalogSizeInsertPage from 'containers/Pages/CatalogMenu/SizeInsertPage/Loadable';
import CatalogSizeUpdatePage from 'containers/Pages/CatalogMenu/SizeUpdatePage/Loadable';
import CatalogKitListPage from 'containers/Pages/CatalogMenu/KitListPage/Loadable';
import CatalogKitInsertPage from 'containers/Pages/CatalogMenu/KitInsertPage/Loadable';
import CatalogKitUpdatePage from 'containers/Pages/CatalogMenu/KitUpdatePage/Loadable';
import CatalogCategoryListPage from 'containers/Pages/CatalogMenu/CategoryListPage/Loadable';
import CatalogCategoryInsertPage from 'containers/Pages/CatalogMenu/CategoryInsertPage/Loadable';
import CatalogCategoryUpdatePage from 'containers/Pages/CatalogMenu/CategoryUpdatePage/Loadable';

// Menu configurações de Loja

// Menu Lojas
import StoreListPage from 'containers/Pages/StoreMenu/ListPage/Loadable';
import StoreInsertPage from 'containers/Pages/StoreMenu/InsertPage/Loadable';
import StoreUpdatePage from 'containers/Pages/StoreMenu/UpdatePage';
import MyStorePage from 'containers/Pages/StoreMenu/MyStorePage';

// Menu Clientes
import ClientListPage from 'containers/Pages/ClientMenu/ListPage/Loadable';
import ClientProfileListPage from 'containers/Pages/ClientMenu/ProfileListPage/Loadable';
import ClientProfileInsertPage from 'containers/Pages/ClientMenu/ProfileInsertPage/Loadable';
import ClientUpdate from 'containers/Pages/ClientUpdate';
import NewsletterPage from 'containers/Pages/ClientMenu/NewsletterPage/Loadable';

// Menu Relatórios
import SalePage from 'containers/Pages/ReportMenu/SalePage/Loadable';
import SaleByCategoryPage from 'containers/Pages/ReportMenu/SaleByCategoryPage/Loadable';
import ProductAndStockPage from 'containers/Pages/ReportMenu/ProductAndStockPage/Loadable';

// Menu Marketing

import BannerListPage from 'containers/Pages/MarketingMenu/BannerListPage/Loadable';
import BannerInsertPage from 'containers/Pages/MarketingMenu/BannerInsertPage/Loadable';
import BannerUpdatePage from 'containers/Pages/MarketingMenu/BannerUpdatePage/Loadable';
import TrendListPage from 'containers/Pages/MarketingMenu/TrendListPage/Loadable';
import TrendInsertPage from 'containers/Pages/MarketingMenu/TrendInsertPage/Loadable';
import TrendUpdatePage from 'containers/Pages/MarketingMenu/TrendUpdatePage/Loadable';

// Menu usuários
import UserListPage from 'containers/Pages/UserMenu/ListPage/Loadable';
import UserNewPage from 'containers/Pages/UserMenu/InsertPage/Loadable';
import UserUpdatePage from 'containers/Pages/UserMenu/UpdatePage/Loadable';

// Menu Configurações
import SettingsGeneralConfigPage from 'containers/Pages/SettingMenu/GeneralConfigPage/Loadable';
import ProfileAccessListPage from 'containers/Pages/SettingMenu/ProfileAccessListPage/Loadable';
import ProfileAccessInsertPage from 'containers/Pages/SettingMenu/ProfileAccessInsertPage/Loadable';

// Menu Página
import PageListPage from 'containers/Pages/PageMenu/ListPage/Loadable';
import PageInsertPage from 'containers/Pages/PageMenu/InsertPage/Loadable';
import PageUpdatePage from 'containers/Pages/PageMenu/UpdatePage/Loadable';

// Páginas gerais
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Menu tree
const Menu = [
  {
    id: 'dashboard',
    text: 'Dashboard',
    icon: <Icon>timeline</Icon>,
    url: '/',
    component: DashboardPage,
  },
  {
    id: 'order',
    text: 'Pedidos',
    icon: <Icon>storage</Icon>,
    isDynamic: true,
    children: [
      {
        id: 'order-list',
        text: 'Listar Pedidos',
        url: '/orders',
        component: OrderListPage,
      },
      {
        id: 'order-view',
        text: 'Visualizar Pedido',
        url: '/orders/view/:id',
        component: OrderViewPage,
        showInMenu: false,
      },
    ],
  },
  {
    id: 'cash-express',
    text: 'Cash Express',
    icon: <Icon>attach_money</Icon>,
    url: '/cash-express',
    component: CashExpressPage,
  },
  {
    id: 'catalog',
    text: 'Catálogo',
    icon: <Icon>style</Icon>,
    children: [
      {
        id: 'catalog-product-list',
        text: 'Produtos',
        url: '/catalog/products',
        component: CatalogProductListPage,
      },
      {
        id: 'catalog-new',
        text: 'Cadastrar Produto',
        url: '/catalog/products/new',
        component: CatalogProductInsertPage,
        showInMenu: false,
      },
      {
        id: 'catalog-update',
        text: 'Atualizar Produto',
        url: '/catalog/products/update/:id',
        component: CatalogProductUpdatePage,
        showInMenu: false,
      },
      {
        id: 'catalog-stock',
        text: 'Estoque',
        url: '/catalog/stock',
        component: CatalogProductImportPage,
      },
    ],
  },
  {
    id: 'store-config',
    text: 'Minha loja',
    icon: <Icon>store_mall_directory</Icon>,
    url: '/stores',
    component: MyStorePage,
  },
  {
    id: 'client',
    text: 'Clientes',
    icon: <Icon>people</Icon>,
    children: [
      {
        id: 'client-list',
        text: 'Listar cliente',
        url: '/clients',
        component: ClientListPage,
      },
      /*
      {
        id: 'client-profile-list',
        text: 'Listar perfis de clientes',
        url: '/client/profiles',
        component: ClientProfileListPage,
      },
      {
        id: 'client-profile-new',
        text: 'Cadastrar Perfil de Cliente',
        url: '/client/profiles/new',
        component: ClientProfileInsertPage,
      },
      */
      {
        id: 'newsletter',
        text: 'Newsletter',
        url: '/clients/newsletter',
        component: NewsletterPage,
      },
      {
        id: 'client-update',
        text: 'Atualizar Produto',
        url: '/client/update/:id',
        component: ClientUpdate,
        showInMenu: false,
      },
    ],
  },
  {
    id: 'reports',
    text: 'Relatórios',
    icon: <Icon>assessment</Icon>,
    children: [
      {
        id: 'sale',
        text: 'Vendas',
        url: '/reports/sale',
        component: SalePage,
      },
      {
        id: 'sale-category',
        text: 'Vendas por categoria',
        url: '/reports/category',
        component: SaleByCategoryPage,
      },
      {
        id: 'product-and-stock',
        text: 'Produto e estoque',
        url: '/reports/stock',
        component: ProductAndStockPage,
      },
    ],
  },
];

// Asign index and parent fields for each item, which is needed for header tabs navigation
let index = 0;

Menu.map(item => {
  const menuItem = item;
  menuItem.index = index;
  index += 1;
  if (menuItem.children) {
    menuItem.children.map(child => {
      const childItem = child;

      childItem.index = index;
      childItem.parent = {
        id: childItem.id,
        parentId: menuItem.id,
        parentText: menuItem.text,
      };
      index += 1;

      return child;
    });
  }
  return item;
});

export { Menu };
