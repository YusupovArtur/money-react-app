// React imports
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from 'app/App.tsx';
// Router
import { BrowserRouter } from 'react-router-dom';
// Store imports
import { Provider } from 'react-redux';
import { persist, store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
