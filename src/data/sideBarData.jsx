import {
  AnalyticsIcon,
  AuditTrailIcon,
  DatabaseIcon,
  DispatchIcon,
  DriverIcon,
  HomeIcon,
  InvoiceIcon,
  NotificationBellIcon,
  OrderIcon,
  SettingsIcon,
  ShipmentCalculatorIcon,
  ShipmentIcon,
  SupportIcon,
  TransactionIcon,
} from "src/assets/SvgIcons";
import {
  CartIcon,
  CmsIcon,
  GlobeIcon,
  UserGroupIcon,
} from "../assets/SvgIcons";

const sideMenu = [
  {
    title: "Home",
    iconPath: <HomeIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/dashboard",
    subMenu: [],
  },
  {
    title: "Dispatch",
    iconPath: <DispatchIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/dispatch",
    subMenu: [],
  },
  {
    title: "Orders",
    iconPath: <OrderIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/orders",
    subMenu: [],
  },
  {
    title: "Drivers",
    iconPath: <DriverIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/drivers",
    subMenu: [],
  },
  {
    title: "Shipments",
    iconPath: <ShipmentIcon />,
    subMenuIcon: true,
    internalTool: false,
    url: "/shipments",
    subMenu: [],
  },
  {
    title: "Database",
    iconPath: <DatabaseIcon />,
    subMenuIcon: true,
    internalTool: false,
    url: "/database",
    subMenu: [],
  },
  {
    title: "Analytics",
    iconPath: <AnalyticsIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/analytics",
    subMenu: [],
  },
  {
    title: "Support Tickets",
    iconPath: <SupportIcon />,
    subMenuIcon: false,
    internalTool: true,
    url: "/support-tickets",
    subMenu: [],
  },

  {
    title: "Invoices",
    iconPath: <InvoiceIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/invoices",
    subMenu: [],
  },
  {
    title: "Transactions",
    iconPath: <TransactionIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/transactions",
    subMenu: [],
  },

  {
    title: "Notifications",
    iconPath: <NotificationBellIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/notifications",
    subMenu: [],
  },
  {
    title: "Shipping Quote",
    iconPath: <ShipmentCalculatorIcon />,
    subMenuIcon: false,
    internalTool: false,
    url: "/shipping-quote",
    subMenu: [],
  },
  {
    title: "Audit Trail",
    iconPath: <AuditTrailIcon />,
    subMenuIcon: true,
    internalTool: false,
    url: "/audit-trail",
    subMenu: [],
  },
  {
    title: "Settings",
    iconPath: <SettingsIcon />,
    subMenuIcon: true,
    internalTool: false,
    url: "/settings",
    subMenu: [],
  },
];

export default sideMenu;

export const sidedata = [
  {
    title: "Home",
    icon: <HomeIcon />,
    href: "/useer/dashboard",
    child: [
      // {
      //   title: "Admin Home",
      //   icon: <SettingsIcon />,
      //   href: "/useer/dashboard/home-admin",
      // },
      // {
      //   title: "Order Home",
      //   icon: <HomeIcon />,
      //   href: "/useer/dashboard/order-home",
      // },
      // {
      //   title: "Sales Home",
      //   icon: <HomeIcon />,
      //   href: "/useer/dashboard/home-sales",
      // },
    ],
  },
  {
    title: "Orders Mgt.",
    icon: <CartIcon />,
    href: "/useer/orders-management",
    child: [
      {
        title: "Orders List",
        // icon: <HomeIcon />,
        href: "/useer/orders-management/orders-list",
      },
      {
        title: "Product Reviews",
        // icon: <HomeIcon />,
        href: "/useer/orders-management/product-reviews",
      },
      {
        title: "Abandoned Cart",
        // icon: <HomeIcon />,
        href: "/useer/orders-management/abandoned-cart",
      },
      {
        title: "Order Cancellation Requests",
        // icon: <HomeIcon />,
        href: "/useer/orders-management/order-cancellation-requests",
      },
      {
        title: "Order Return Requests",
        // icon: <HomeIcon />,
        href: "/useer/orders-management/order-return-requests",
      },
      {
        title: "Wishlist Mgt",
        // icon: <HomeIcon />,
        href: "/useer/orders-management/wishlist-mgt",
      },
      {
        title: "Coupon Management",
        // icon: <HomeIcon />,
        href: "/useer/orders-management/coupon-managements",
      },
    ],
  },

  {
    title: "Product",
    icon: <ShipmentIcon />,
    href: "/useer/product",
    child: [
      {
        title: "Inventory",
        // icon: <SettingsIcon />,
        href: "/useer/product/inventory",
        nested: [{ title: "Create", href: "/useer/product/inventory/create" }],
      },
      {
        title: "Categories",
        // icon: <HomeIcon />,
        href: "/useer/product/categories",
        nested: [{ title: "Create", href: "/useer/product/categories/create" }],
      },

      {
        title: "Tags",
        // icon: <HomeIcon />,
        href: "/useer/product/tags",
      },
      {
        title: "Attributes",
        // icon: <HomeIcon />,
        href: "/useer/product/attributes",
      },
      {
        title: "Returned Items",
        // icon: <HomeIcon />,
        href: "/useer/product/returned-items",
      },
    ],
  },
  {
    title: "CMS",
    icon: <CmsIcon />,
    // href: "",
    child: [],
  },
  {
    title: "SEO",
    icon: <GlobeIcon />,
    // href: "",
    child: [],
  },

  {
    title: "Analytics",
    icon: <AnalyticsIcon />,
    // href: "",
    child: [],
  },
  {
    title: "Users",
    icon: <UserGroupIcon />,
    // href: "",
    child: [],
  },
  {
    isHeader: true,
    title: "Internal tools",
  },
  {
    title: "Support",
    icon: <SupportIcon />,
    // href: "",
    child: [],
  },

  {
    title: "Settings",
    icon: <SettingsIcon />,
    child: [
      {
        title: "Hero Icons",
        icon: <SettingsIcon />,
        href: "/useer/icons-iconify",
      },
      {
        title: "Lucide Icons",
        icon: <SettingsIcon />,
        href: "/useer/icons-lucide",
      },
      {
        title: "Custom Icons",
        icon: <SettingsIcon />,
        href: "/useer/icons-custom",
      },
    ],
  },
  // {
  //   title: "Multi Level",
  //   icon: <AuditTrailIcon />,
  //   child: [
  //     {
  //       title: "Level 1.1",
  //       icon: <AuditTrailIcon />,
  //       href: "#",
  //     },
  //     {
  //       title: "Level 2",
  //       icon: <SettingsIcon />,
  //       nested: [
  //         {
  //           title: "Level-2.1",
  //           href: "#",
  //         },
  //         {
  //           title: "Level 2.2",
  //           href: "#",
  //         },
  //         {
  //           title: "Level 3",
  //           child: [
  //             {
  //               title: "Level 3.1",
  //               href: "#",
  //             },
  //             {
  //               title: "Level 3.2",
  //               href: "#",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const usersidedata = [
  {
    title: "Account",
    icon: <HomeIcon />,
    href: "/user/dashboard",
    child: [
      // {
      //   title: "Admin Home",
      //   icon: <SettingsIcon />,
      //   href: "/useer/dashboard/home-admin",
      // },
      // {
      //   title: "Order Home",
      //   icon: <HomeIcon />,
      //   href: "/useer/dashboard/order-home",
      // },
      // {
      //   title: "Sales Home",
      //   icon: <HomeIcon />,
      //   href: "/useer/dashboard/home-sales",
      // },
    ],
  },
  {
    title: "Overview",
    icon: <ShipmentIcon />,
    href: "/user/overview",
    child: [],
  },

  {
    title: "Orders",
    icon: <CartIcon />,
    href: "/user/orders",
    child: [],
  },
  // {
  //   title: "Cards",
  //   icon: <CmsIcon />,
  //   href: "/user/cards",
  //   child: [],
  // },
  {
    title: "Delivery Address",
    icon: <GlobeIcon />,
    href: "/user/delivery-address",
    child: [],
  },

  // {
  //   title: "Reviews",
  //   icon: <AnalyticsIcon />,
  //   // href: "",
  //   child: [],
  // },
  {
    title: "Profile Settings",
    icon: <UserGroupIcon />,
    href: "/user/profile-settings",
    child: [],
  },
  {
    title: "Wallet",
    icon: <InvoiceIcon />,
    // href: "",
    child: [],
  },
  {
    isHeader: true,
    title: "Internal tools",
  },
  {
    title: "Help",
    icon: <SupportIcon />,
    // href: "",
    child: [],
  },

  {
    title: "Settings",
    icon: <SettingsIcon />,
    child: [],
  },
  // {
  //   title: "Multi Level",
  //   icon: <AuditTrailIcon />,
  //   child: [
  //     {
  //       title: "Level 1.1",
  //       icon: <AuditTrailIcon />,
  //       href: "#",
  //     },
  //     {
  //       title: "Level 2",
  //       icon: <SettingsIcon />,
  //       nested: [
  //         {
  //           title: "Level-2.1",
  //           href: "#",
  //         },
  //         {
  //           title: "Level 2.2",
  //           href: "#",
  //         },
  //         {
  //           title: "Level 3",
  //           child: [
  //             {
  //               title: "Level 3.1",
  //               href: "#",
  //             },
  //             {
  //               title: "Level 3.2",
  //               href: "#",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];
