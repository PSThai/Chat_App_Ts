import { PayloadAction } from '../../../client/context/auth/context';
import { Dispatch } from 'react';
import { AuthState } from '../auth/types';

export interface HookType<T> {
  get: T | undefined | null | any;
  set?: Dispatch<T>;
}

export interface SpecialHookType<T> {
  list: HookType<T>;
  current: HookType<T>;
}

export type AuthHookType<T> = {
  get: T | undefined | null | any;
  set?: Dispatch<PayloadAction<AuthState>>;
}
