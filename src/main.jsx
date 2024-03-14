import ReactDOM from 'react-dom/client';
import App from '@/components/App/App';
import store from './store';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
);
