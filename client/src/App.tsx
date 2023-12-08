import { FontStyles } from "./resources/fonts/fontStyles";
import { BrowserContainer } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FontStyles />
      <BrowserContainer />
    </QueryClientProvider>
  );
}

export default App;
