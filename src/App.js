import { renderRoutes } from 'react-router-config';

const App = ({ route }) => renderRoutes(route.routes);

export default {
  component: App,
};
