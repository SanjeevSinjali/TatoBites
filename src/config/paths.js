export const paths = {
  home: {
    path: "/",
    getHref: () => "/"
  },
  auth: {
    signup: {
      path: "/signup",
      getHref: (redirectTo) => `/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
    },
    login: {
      path: "/login",
      getHref: (redirectTo) => `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
    }
  },
  app: {
    dashboard: {
      path: "/dashboard",
      getHref: () => "/dashboard"
    },
    reviews: {
      path: "/reviews",
      getHref: () => "/reviews"
    },
    notifications: {
      path: "/notifications",
      getHref: () => "/notifications"
    },
    search: {
      path: "/search",
      getHref: () => "/search"
    },
    offers: {
      path: "/offers",
      getHref: () => "/offers"
    },
    profile: {
      path: "/profile",
      getHref: () => "/profile"
    },
    orders: {
      path: "/orders",
      getHref: () => "/orders"
    },
    cart: {
      path: "/cart",
      getHref: () => "/cart"
    },
    settings: {
      path: "/settings",
      getHref: () => "/settings"
    },
    favourites: {
      path: "/favourites",
      getHref: () => "/favourites"
    }
  },
  admin: {
    root: {
      path: "/admin",
      getHref: () => "/admin/dashboard"
    },
    settings: {
      path: "/admin/settings",
      getHref: () => "/admin/settings"
    }
  }
} 
