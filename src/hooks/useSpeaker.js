import endpoints from '../constants/endpoints';
import useRequest from './useRequest';

export default function useSpeaker(slug) {
  const { data: speaker, isLoaded, error } = useRequest(`${endpoints.speakers}/${slug}`);

  return {
    error,
    isLoaded,
    speaker,
  };
}
