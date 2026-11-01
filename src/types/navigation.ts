export type SilvestreRoute =
  | 'home'
  | 'forest-map'
  | 'creator-territory'
  | 'character-archive'
  | 'character-page';

export interface RouteParams {
  creatorId?: string;
  characterId?: string;
}

export interface NavigationContextValue {
  currentRoute: SilvestreRoute;
  routeParams: RouteParams;
  isTransitioning: boolean;
  isForestTransitioning: boolean;
  navigateTo: (route: SilvestreRoute, params?: RouteParams) => void;
  startForestTransition: () => void;
  completeForestTransition: () => void;
}
