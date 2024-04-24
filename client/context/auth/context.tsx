import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { getCookie } from '../../../common/utils/cookie';
import { AuthState } from '../../../common/types/auth/types';
import { initialize, reducer } from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';


export enum AuthActionType {
  INITIALZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface PayloadAction<T> {
  type: AuthActionType;
  payload: T;
}

export interface AuthContextType extends AuthState {
  dispatch: Dispatch<PayloadAction<AuthState>>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  // State
  const [state, dispatch] = useReducer(reducer, initialState);

  // Use Effect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get access token from AsyncStorage
        const accessToken = await AsyncStorage.getItem('token');
  
        // Check access token
        if (!accessToken) {
          return dispatch(initialize({ isAuthenticated: false }));
        }
  
        // Get user data from AsyncStorage
        const userDataString = await AsyncStorage.getItem('user');
        if (!userDataString) {
          throw new Error('User data not found in AsyncStorage');
        }
  
        const user = JSON.parse(userDataString);
  
        // Dispatch initialize action with user data
        dispatch(initialize({ isAuthenticated: true, ...user }));
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(initialize({ isAuthenticated: false }));
      }
    };
  
    fetchUserData();
  }, []);
  
  // Shared
  const shared: any = {
    user: {
      get: state,
      set: dispatch,
    },
  };

  // Return
  return <AuthContext.Provider value={shared}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
