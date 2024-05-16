import React from 'react';
import io from 'socket.io-client';
import { ThemeEnum } from '../enum/theme.enum';
import { getAsyncStorage, setAsyncStorage } from 'common/utils/cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TshusContext = React.createContext(null);

interface Props {
  children: React.ReactNode;
}

const TshusProvider: React.FC<Props> = ({ children }: Props) => {
  // Config
  const [config, setConfig] = React.useState(() => {
    // Default Config
    const defaultConfig = { theme: ThemeEnum.LIGHT };

    // Get config
    const data: any = getAsyncStorage('config');

    let parsedData;

    // Try parsing the config data
    try {
      parsedData = data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to parse config data:", error);
      parsedData = null;
    }

    // Check and set config to local storage if not existing or failed to parse
    if (!parsedData) {
      AsyncStorage.setItem('config', JSON.stringify(defaultConfig));
    }

    // Return the parsed data or default config
    return parsedData || defaultConfig;
  });

  // Stomp client state
  const [socket, setSocket] = React.useState(null);

  // Handle set config
  const handleSetConfig: Function = (key: string, value: any) => {
    // New Config
    const newConfig: object = { ...config, [key]: value };

    // Set config
    setConfig(newConfig);

    // Set config to local storage
    AsyncStorage.setItem('config', JSON.stringify(newConfig));
  };

  // Use Effect
  React.useEffect(() => {
    // Calling connecting
    const socket: any = io(`http://172.19.200.229:2820`);

    // Set Client
    setSocket(socket);

    // Return clean
    return () => {
      // Disconnect Socket
      socket.disconnect();

      // Clean
      setSocket(null);
    };
  }, []);

  // Shared Data
  const sharedData: any = {
    config: {
      get: config,
      set: handleSetConfig,
    },
    socket: { get: socket },
  };

  // Return
  return (
    <TshusContext.Provider value={sharedData}>{children}</TshusContext.Provider>
  );
};

export default TshusProvider;
