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
  },
  protected: {
    google: '/auth/google/login'
  }
};

export default routes;
