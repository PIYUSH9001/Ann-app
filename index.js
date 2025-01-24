/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AnimeNewsProvider } from './components/context/context';

const Root = () => (
    <AnimeNewsProvider>
        <App />
    </AnimeNewsProvider>
  );

AppRegistry.registerComponent(appName, () => Root);
