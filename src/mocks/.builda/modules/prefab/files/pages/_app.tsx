import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../lib/context/auth-context';
import { DatabaseProvider } from '../lib/context/database-context';

// Import theme
import 'styles/index.scss';
// Import stylesheet for react-crop-image
import 'react-image-crop/dist/ReactCrop.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <Component {...pageProps} />
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
