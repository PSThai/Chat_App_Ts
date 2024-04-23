import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import TshusProvider from './common/context/tshus-context';
import ThemeContext from './common/context/theme-context';


export default function App() {
  return (
    <>

          <StackNavigator />

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
