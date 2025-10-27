import { Provider as JotaiProvider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Main } from './Main';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Main />
      </JotaiProvider>
    </QueryClientProvider>
  );
};
