import { Provider as JotaiProvider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Main } from './Main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
    //   refetchOnWindowFocus: false,
    //   retry: 1,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Main />
      </JotaiProvider>
    </QueryClientProvider>
  );
};
