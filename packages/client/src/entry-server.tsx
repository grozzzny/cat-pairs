import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import store from '@/store';
import {
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';
import { Request as ExpressRequest } from 'express';
import { routes } from '@/routes';
import { createFetchRequest } from '@/entry-server.utils';
import App from '@/App';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);
  if (context instanceof Response) {
    throw context;
  }
  const staticRouter = createStaticRouter(dataRoutes, context);

  return {
    html: ReactDOM.renderToString(
      <React.StrictMode>
        <Provider store={store}>
          <App staticRouter={staticRouter} context={context} />
        </Provider>
      </React.StrictMode>
    ),
    initialState: store.getState(),
  };
};
