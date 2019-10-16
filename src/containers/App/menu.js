import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

// Menu Dashboard
import DashboardPage from 'containers/Pages/DashboardMenu/HomePage/Loadable';

// Menu Pedidos
import OrderListPage from 'containers/Pages/OrderMenu/ListPage/Loadable';
import OrderViewPage from 'containers/Pages/OrderMenu/ViewPage/Loadable';

// Menu Produtos
import ProductListPage from 'containers/Pages/ProductMenu/ListPage/Loadable';
import ProductInsertPage from 'containers/Pages/ProductMenu/InsertPage/Loadable';
import ProductUpdatePage from 'containers/Pages/ProductMenu/UpdatePage';
import ProductImportPage from 'containers/Pages/ProductMenu/ImportPage/Loadable';

// Menu Categorias
import CategoryListPage from 'containers/Pages/CategoryMenu/ListPage/Loadable';
import CategoryInsertPage from 'containers/Pages/CategoryMenu/InsertPage/Loadable';
import CategoryUpdatePage from 'containers/Pages/CategoryMenu/UpdatePage/Loadable';

// Menu configurações de Loja

// Menu Lojas
import StoreListPage from 'containers/Pages/StoreMenu/ListPage/Loadable';
import StoreInsertPage from 'containers/Pages/StoreMenu/InsertPage/Loadable';
import StoreUpdatePage from 'containers/Pages/StoreMenu/UpdatePage';

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

// Menu Configurações
import SettingsGeneralConfigPage from 'containers/Pages/SettingMenu/GeneralConfigPage/Loadable';
import ProfileAccessListPage from 'containers/Pages/SettingMenu/ProfileAccessListPage/Loadable';
import ProfileAccessInsertPage from 'containers/Pages/SettingMenu/ProfileAccessInsertPage/Loadable';
import UserListPage from 'containers/Pages/SettingMenu/UserListPage/Loadable';
import UserNewPage from 'containers/Pages/SettingMenu/UserInsertPage/Loadable';
import UserUpdatePage from 'containers/Pages/SettingMenu/UserUpdatePage/Loadable';
import ColorListPage from 'containers/Pages/SettingMenu/ColorListPage/Loadable';
import ColorInsertPage from 'containers/Pages/SettingMenu/ColorInsertPage/Loadable';
import ColorUpdatePage from 'containers/Pages/SettingMenu/ColorUpdatePage/Loadable';

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
    children: [
      {
        id: 'order-list',
        text: 'Listar Pedidos',
        url: '/order',
        component: OrderListPage,
      },
      {
        id: 'order-view',
        text: 'Visualizar Pedido',
        url: '/order/view/:id',
        component: OrderViewPage,
        showInMenu: false,
      },
    ],
  },
  {
    id: 'catalog',
    text: 'Produtos',
    icon: <Icon>style</Icon>,
    children: [
      {
        id: 'product-list',
        text: 'Listar Produtos',
        url: '/product',
        component: ProductListPage,
      },
      {
        id: 'product-new',
        text: 'Cadastrar Produto',
        url: '/product/new',
        component: ProductInsertPage,
      },
      {
        id: 'product-update',
        text: 'Atualizar Produto',
        url: '/product/update/:id',
        component: ProductUpdatePage,
        showInMenu: false,
      },
      {
        id: 'stock-import',
        text: 'Importar Produtos',
        url: '/stock-import',
        component: ProductImportPage,
      },
    ],
  },
  {
    id: 'category',
    text: 'Categorias',
    icon: <Icon>category</Icon>,
    children: [
      {
        id: 'category-list',
        text: 'Listar Categorias',
        url: '/category',
        component: CategoryListPage,
      },
      {
        id: 'category-new',
        text: 'Cadastrar Categoria',
        url: '/category/new',
        component: CategoryInsertPage,
      },
      {
        id: 'category-update',
        text: 'Atualizar Categoria',
        url: '/category/update/:id',
        component: CategoryUpdatePage,
        showInMenu: false,
      },
    ],
  },
  {
    id: 'store-config',
    text: 'Lojas',
    icon: <Icon>store_mall_directory</Icon>,
    children: [
      {
        id: 'store-list',
        text: 'Listar Lojas',
        url: '/store',
        component: StoreListPage,
      },
      {
        id: 'store-new',
        text: 'Cadastrar Loja',
        url: '/store/new',
        component: StoreInsertPage,
      },
      {
        id: 'store-update',
        text: 'Atualizar Loja',
        url: '/store/update/:id',
        component: StoreUpdatePage,
        showInMenu: false,
      },
    ],
  },
  {
    id: 'client',
    text: 'Clientes',
    icon: <Icon>people</Icon>,
    children: [
      {
        id: 'client-list',
        text: 'Listar cliente',
        url: '/client',
        component: ClientListPage,
      },
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
      {
        id: 'newsletter',
        text: 'Newsletter',
        url: '/newsletter',
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
        url: '/sale',
        component: SalePage,
      },
      {
        id: 'sale-category',
        text: 'Vendas por categoria',
        url: '/sale/category',
        component: SaleByCategoryPage,
      },
      {
        id: 'product-and-stock',
        text: 'Produto e estoque',
        url: '/product-and-stock',
        component: ProductAndStockPage,
      },
    ],
  },
  {
    id: 'config',
    text: 'Configurações',
    icon: <Icon>settings</Icon>,
    children: [
      {
        id: 'general-config',
        text: 'Configurações gerais',
        url: '/general-config',
        component: SettingsGeneralConfigPage,
      },
      {
        id: 'profile-access-list',
        text: 'Listar perfil de acesso',
        url: '/profile-access',
        component: ProfileAccessListPage,
      },
      {
        id: 'profile-access-new',
        text: 'Cadastrar perfil de acesso',
        url: '/profile-access/new',
        component: ProfileAccessInsertPage,
      },
      {
        id: 'user-list',
        text: 'Listar Usuário',
        url: '/user',
        component: UserListPage,
      },
      {
        id: 'user-new',
        text: 'Cadastrar Usuário',
        url: '/user/new',
        component: UserNewPage,
      },
      {
        id: 'user-update',
        text: 'Atualizar Usuário',
        url: '/user/update/:id',
        component: UserUpdatePage,
        showInMenu: false,
      },
      {
        id: 'color-list',
        text: 'Listar Cor',
        url: '/color',
        component: ColorListPage,
      },
      {
        id: 'color-new',
        text: 'Cadastrar Cor',
        url: '/color/new',
        component: ColorInsertPage,
      },
      {
        id: 'color-update',
        text: 'Atualizar Cor',
        url: '/color/update/:id',
        component: ColorUpdatePage,
        showInMenu: false,
      },
    ],
  },
  {
    id: 'page',
    text: 'Página',
    icon: <Icon>palette</Icon>,
    children: [
      {
        id: 'page-list',
        text: 'Listar página',
        url: '/page',
        component: PageListPage,
      },
      {
        id: 'page-new',
        text: 'Cadastrar página',
        url: '/page/new',
        component: PageInsertPage,
      },
      {
        id: 'page-update',
        text: 'Atualizar página',
        url: '/page/update/:id',
        component: PageUpdatePage,
        showInMenu: false,
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

// Routes
const getRoute = item => (
  <Route key={item.id} exact path={item.url} component={item.component} />
);

const Routes = (location, dynamicMenu) => {
  const menu = dynamicMenu || Menu;
  return (
    <Switch key={location.key} location={location}>
      {menu.map(item =>
        !item.children
          ? getRoute(item)
          : item.children.map(child => getRoute(child)),
      )}
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export { Menu, Routes };
