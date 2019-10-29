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

// Menu Página
import PageListPage from 'containers/Pages/PageMenu/ListPage/Loadable';
import PageInsertPage from 'containers/Pages/PageMenu/InsertPage/Loadable';
import PageUpdatePage from 'containers/Pages/PageMenu/UpdatePage/Loadable';

// Menu Banner
import BannerListPage from 'containers/Pages/BannerMenu/ListPage/Loadable';
import BannerInsertPage from 'containers/Pages/BannerMenu/InsertPage/Loadable';
import BannerUpdatePage from 'containers/Pages/BannerMenu/UpdatePage/Loadable';

// Menu Trend
import TrendListPage from 'containers/Pages/TrendMenu/ListPage/Loadable';
import TrendInsertPage from 'containers/Pages/TrendMenu/InsertPage/Loadable';
import TrendUpdatePage from 'containers/Pages/TrendMenu/UpdatePage/Loadable';

// Menu Kit
import KitListPage from 'containers/Pages/KitMenu/ListPage/Loadable';
import KitInsertPage from 'containers/Pages/KitMenu/InsertPage/Loadable';
import KitUpdatePage from 'containers/Pages/KitMenu/UpdatePage/Loadable';

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
        url: '/catalog/catalog/products/update/:id',
        component: CatalogProductUpdatePage,
        showInMenu: false,
      },
      {
        id: 'catalog-stock',
        text: 'Importar Produtos',
        url: '/catalog/stock',
        component: CatalogProductImportPage,
      },
      {
        id: 'catalog-kit-list',
        text: 'Kits',
        url: '/catalog/kits',
        component: KitListPage,
      },
      {
        id: 'catalog-kit-new',
        text: 'Cadastrar kit',
        url: '/catalog/kits/new',
        component: KitInsertPage,
        showInMenu: false,
      },
      {
        id: 'catalog-kit-update',
        text: 'Atualizar kit',
        url: '/catalog/kits/update/:id',
        component: KitUpdatePage,
        showInMenu: false,
      },
      {
        id: 'catalog-category-list',
        text: 'Categorias',
        url: '/catalog/categories',
        component: CategoryListPage,
      },
      {
        id: 'catalog-category-new',
        text: 'Cadastrar Categoria',
        url: '/catalog/categories/new',
        component: CategoryInsertPage,
        showInMenu: false,
      },
      {
        id: 'catalog-category-update',
        text: 'Atualizar Categoria',
        url: '/catalog/categories/update/:id',
        component: CategoryUpdatePage,
        showInMenu: false,
      },
      {
        id: 'catalog-color-list',
        text: 'Listar Cor',
        url: '/catalog/colors',
        component: CatalogColorListPage,
      },
      {
        id: 'catalog-color-new',
        text: 'Cadastrar Cor',
        url: '/catalog/colors/new',
        component: CatalogColorInsertPage,
        showInMenu: false,
      },
      {
        id: 'catalog-color-update',
        text: 'Atualizar Cor',
        url: '/catalog/colors/update/:id',
        component: CatalogColorUpdatePage,
        showInMenu: false,
      },
      {
        id: 'catalog-size-list',
        text: 'Tamanhos',
        url: '/catalog/sizes',
        component: CatalogSizeListPage,
      },
      {
        id: 'catalog-size-new',
        text: 'Cadastrar Tamanho',
        url: '/catalog/sizes/new',
        component: CatalogSizeInsertPage,
        showInMenu: false,
      },
      {
        id: 'catalog-size-update',
        text: 'Atualizar Tamanho',
        url: '/catalog/sizes/update/:id',
        component: CatalogSizeUpdatePage,
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
  {
    id: 'banner',
    text: 'Banner',
    icon: <Icon>image</Icon>,
    children: [
      {
        id: 'banner-list',
        text: 'Listar banner',
        url: '/banner',
        component: BannerListPage,
      },
      {
        id: 'banner-new',
        text: 'Cadastrar banner',
        url: '/banner/new',
        component: BannerInsertPage,
      },
      {
        id: 'banner-update',
        text: 'Atualizar banner',
        url: '/banner/update/:id',
        component: BannerUpdatePage,
        showInMenu: false,
      },
    ],
  },
  {
    id: 'trend',
    text: 'Tendências',
    icon: <Icon>trending_up</Icon>,
    children: [
      {
        id: 'trend-list',
        text: 'Listar tendência',
        url: '/trend',
        component: TrendListPage,
      },
      {
        id: 'trend-new',
        text: 'Cadastrar tendência',
        url: '/trend/new',
        component: TrendInsertPage,
      },
      {
        id: 'trend-update',
        text: 'Atualizar tendência',
        url: '/trend/update/:id',
        component: TrendUpdatePage,
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
