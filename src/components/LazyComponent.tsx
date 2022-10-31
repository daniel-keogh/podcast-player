import React, { Suspense, SuspenseProps } from "react";

const LazyComponents = {
  AuthDialog: React.lazy(() => import("@/components/Profile/AuthDialog")),
  EpisodeDialog: React.lazy(() => import("@/components/EpisodeDialog/EpisodeDialog")),
  FeedFormDialog: React.lazy(() => import("@/components/Discover/FeedFormDialog")),
} as const;

const LazyComponentContext = React.createContext({} as typeof LazyComponents);

type LazyComponentContextProviderProps = {
  children: React.ReactNode;
};

type LazyComponentContextConsumerProps = {
  fallback?: SuspenseProps["fallback"];
  children: (value: typeof LazyComponents) => React.ReactNode;
};

export function LazyComponentContextProvider(props: LazyComponentContextProviderProps) {
  return (
    <LazyComponentContext.Provider value={LazyComponents}>
      {props.children}
    </LazyComponentContext.Provider>
  );
}

export function LazyComponent({ children, fallback = null }: LazyComponentContextConsumerProps) {
  return (
    <LazyComponentContext.Consumer>
      {(value) => <Suspense fallback={fallback}>{children(value)}</Suspense>}
    </LazyComponentContext.Consumer>
  );
}

export default LazyComponentContext;
