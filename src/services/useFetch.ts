import { useState, useRef, useEffect } from "react";
import { baseUrl } from "../constants/constants";


export default function useFetch<T>(url:string)  {
  const isMounted = useRef(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e as any);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();
    console.log('111 :>> ', 111);

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
}