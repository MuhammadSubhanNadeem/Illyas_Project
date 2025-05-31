import { createRoot } from "react-dom/client";
import { Main_store } from "./stores/main_store/main_store";
import { Main_router } from "./router/main_router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router";
let queryClient = new QueryClient();
createRoot(document.getElementById("main")).render(
  <QueryClientProvider client={queryClient}>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    <Main_store>
      <Main_router />
    </Main_store>
  </QueryClientProvider>
);
