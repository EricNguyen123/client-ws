import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  params: {locale: string};
};

export type LocaleProps = {
  children: ReactNode;
  defaultValue: string;
  label: string;
  isPending?: boolean;
};

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginWithGoogleProps {
  email: string;
}

export interface LogoutProps {
  token: string | null;
}

export interface ForgotPasswordProps {
  email: string;
}

export interface VerifyOTPProps {
  email: string;
  otp: string;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export interface UserProps {
  id: string;
  email?: string;
  role?: string;
  name?: string;
  zipcode?: string;
  phone?: string;
  prefecture?: string;
  city?: string;
  street?: string;
  building?: string;
  status?: number;
  current_sign_in_at?: Date;
  last_sign_in_at?: Date;
}

export interface ChangePasswordProps {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeForgotPasswordProps {
  id: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AccountProps {
  id: string;
}

export interface SearchProps extends Pagination {
  status?: string;
  keyword?: string;
}

export type OptionsBaseInfo = {
  name?: string;
  content?: React.ReactNode | undefined;
  placeholder?: string | undefined;
  type?: string | undefined;
}

export type StatisticalUsersProps = {
  totalAllUsers: number;
  totalUsers: number;
  totalEmployees: number;
  totalUsersNotActive: number;
  usersVisited: number;
  usersNewSubscribers: number;
}

export type ChartDataProps = { [key: string]: string | number }[]

