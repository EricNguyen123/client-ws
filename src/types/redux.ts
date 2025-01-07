/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
  AccountProps, 
  ChangeForgotPasswordProps, 
  ChangePasswordProps, 
  CreateBannerProps, 
  CreateCategoriesProps, 
  ForgotPasswordProps, 
  LoginProps, 
  LogoutProps, 
  RegisterProps, 
  SearchProps, 
  StatisticalUsersProps, 
  UpdateBannerProps, 
  UpdateCategoriesProps, 
  UserProps, 
  VerifyOTPProps 
} from ".";

export type Action = {
  type: string;
  payload?: any;
};

export type AuthState = {
  loading: boolean;
  userInfo: any | undefined;
  authenticated: boolean;
  registered: boolean;
  otp: any | undefined;
};

export type UserState = {
  loading: boolean;
  userInfo: any | undefined;
  pages: {
    users: any | undefined;
    totalUsers: number;
    currentPage: number;
  };
  statistical: StatisticalUsersProps | undefined;
}

export type CategoriesState = {
  loading: boolean;
  pages: {
    categories: any | undefined;
    totalUsers: number;
    currentPage: number;
  };
  categories: any | undefined;
};

export type BannersState = {
  loading: boolean;
  pages: {
    banners: any | undefined;
    totalBanners: number;
    currentPage: number;
  };
};

export type RegisterData = {
  data: RegisterProps;
  setError: (error: any) => void;
};

export type LoginData = {
  data: LoginProps;
  setError: (error: any) => void;
};

export type LogoutData = {
  data: LogoutProps;
}

export type UpdateAccountData = {
  data: UserProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type ChangePasswordData = {
  data: ChangePasswordProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type ForgotPasswordData = {
  data: ForgotPasswordProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type VerifyOTPData = {
  data: VerifyOTPProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type ChangeForgotPasswordData = {
  data: ChangeForgotPasswordProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type UsersPaginationData = {
  data: SearchProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type StatisticalUserData = {
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type CreateUserData = {
  data: RegisterProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type DeleteUsersData = {
  data: AccountProps[];
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type DeleteUserData = {
  data: AccountProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type DeleteCategoryData = DeleteUserData

export type CategoriesPaginationData = {
  data: SearchProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type CreateCategoriesData = {
  data: CreateCategoriesProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type GetCategoriesData = {
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type UpdateCategoriesData = {
  data: UpdateCategoriesProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type CreateBannerData = {
  data: CreateBannerProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type BannersPaginationData = {
  data: SearchProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

export type DeleteBannerData = DeleteUserData

export type UpdateBannerData = {
  data: UpdateBannerProps & AccountProps;
  setError: (error: any) => void;
  setSuccess: (success: any) => void;
}

type ErrorResponse = {
  message: string;
  name: string;
  response: {
    status: number;
    statusText: string;
    data: {
      errors: string[];
      success: boolean;
    };
  };
};

type RegisterSuccessResponse = {
  status: number;
  statusText: string;
  data: {
    status: number;
  };
  headers: {
    "access-token": string;
    "content-length": string;
    "content-type": string;
  };
};

type LoginSuccessResponse = {
  status: number;
  statusText: string;
  data: {
    user: {
      status: number;
      role: string;
    };
    token: string;
  };
  headers: {
    "access-token": string;
    "content-length": string;
    "content-type": string;
  };
};

type SuccessResponse = {
  status: number;
  statusText: string;
  data: {
    errors: string[];
    success: boolean;
    screen: string;
  };
  headers: {
    "access-token": string;
    "content-length": string;
    "content-type": string;
  };
};

export type ResponseResult = ErrorResponse & SuccessResponse;
export type RegisterResponseResult = ErrorResponse & RegisterSuccessResponse;
export type LoginResponseResult = ErrorResponse & LoginSuccessResponse;
