// React imports
import ReactDOM from 'react-dom/client';
import App from 'app/App';
// Router
import { BrowserRouter } from 'react-router-dom';
// Store imports
import { Provider } from 'react-redux';
import store, { persist } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react';
// Firebase
import 'app/firebase';
// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'styles/index.scss';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
