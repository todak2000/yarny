import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider></Provider>
  );
}

export default MyApp;
