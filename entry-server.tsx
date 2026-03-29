import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  );
