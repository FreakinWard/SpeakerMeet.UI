import endpoints from '../constants/endpoints';
import useRequest from './useRequest';

export default function useCommunity(slug) {
  const url = `${endpoints.communities}/${slug}`;
  const { data: community, isLoaded, error } = useRequest(url);

  return {
    error,
    isLoaded,
    community,
  };
}
