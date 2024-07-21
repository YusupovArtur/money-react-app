// React imports
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import 'app/firebase.ts';
// Store imports
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'store/store.ts';
// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
