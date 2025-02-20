const routes = {
  public: {
    register: 'register',
    login: 'sign-in',
    home: '/',
    logout: 'logout',
  },
  private: {
    account: 'account',
    profile: '/account/profile',
    users: '/account/users',
    information: '/account/users/information',
    categories: '/account/categories',
    banners: '/account/banners',
    products: '/account/products',
    addProduct: '/account/add_product',
    colorCode: '/account/color_code',
    sizeCode: '/account/size_code',
  },
  protected: {
    google: '/auth/google/login'
  }
};

export default routes;
