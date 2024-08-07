// React imports
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app/App';
import { BrowserRouter } from 'react-router-dom';
import 'app/firebase';
// Store imports
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persist } from 'store/store';
// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'styles/index.scss';

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
