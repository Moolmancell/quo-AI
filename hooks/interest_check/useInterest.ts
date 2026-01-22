// hooks/useInterests.ts
import { useState } from "react";
import axios from "axios";

export function useInterests() {
  const [options, setOptions] = useState(["Programming", "Religion", "Technology", "Science"]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedTopics, setFetchedTopics] = useState(new Set<string>());

  const fetchNewOptions = async (topic: string) => {
    if (fetchedTopics.has(topic)) return;
    
    setIsFetching(true);
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/generate-interests?topic=${topic}`);
      setOptions((prev) => [...new Set([...prev, ...data.interests])]);
      setFetchedTopics((prev) => new Set(prev).add(topic));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  const submitInterests = async (userId: string, interests: string[]) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-interests/${userId}`, { interests });
  };

  return { options, isFetching, fetchNewOptions, submitInterests, setOptions };
}