import React, { createContext, useContext, useState, useCallback } from 'react';
import { SilvestreRoute, RouteParams, NavigationContextValue } from '../types/navigation';

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<SilvestreRoute>('home');
  const [routeParams, setRouteParams] = useState<RouteParams>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isForestTransitioning, setIsForestTransitioning] = useState(false);

  const startForestTransition = useCallback(() => {
    if (isForestTransitioning) return;
    setIsForestTransitioning(true);
  }, [isForestTransitioning]);

  const completeForestTransition = useCallback(() => {
    setCurrentRoute('forest-map');
    setRouteParams({});
    setIsForestTransitioning(false);
  }, []);

  const navigateTo = useCallback(
    (route: SilvestreRoute, params: RouteParams = {}) => {
      if (route === currentRoute) return;

      // When wandering deeper from home into the forest map, invoke the atmospheric transition
      if (currentRoute === 'home' && route === 'forest-map') {
        startForestTransition();
        return;
      }

      setIsTransitioning(true);
      window.setTimeout(() => {
        setCurrentRoute(route);
        setRouteParams(params);
        setIsTransitioning(false);
      }, 750);
    },
    [currentRoute, startForestTransition]
  );

  return (
    <NavigationContext.Provider
      value={{
        currentRoute,
        routeParams,
        isTransitioning,
        isForestTransitioning,
        navigateTo,
        startForestTransition,
        completeForestTransition,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
