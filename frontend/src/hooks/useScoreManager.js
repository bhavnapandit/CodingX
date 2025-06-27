// hooks/useScoreManager.js
import { useState, useCallback } from 'react';
import axios from 'axios';
import { getBackendUrl } from '../utils/helpers';

export const useScoreManager = (currentUser, hasLoggedIn) => {
  const [score, setScore] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchScore = useCallback(async () => {
    if (!hasLoggedIn || !currentUser.email) return 0;

    try {
      const url = getBackendUrl();
      const res = await axios.get(`${url}user/score/${currentUser.email}`);

      if (typeof res.data === "number") return res.data;
      if (res.data && typeof res.data === "object") {
        return res.data.score || res.data.total_score || 0;
      }
      return 0;
    } catch (error) {
      throw new Error(error);
    }
  }, [hasLoggedIn, currentUser.email]);


  const refreshStats = useCallback(async () => {
    if (!hasLoggedIn || !currentUser.email) {
      setScore(0);
      setTotalSolved(0);
      return;
    }

    setIsLoading(true);
    try {
      const [scoreData] = await Promise.all([
        fetchScore(),
      ]);

      setScore(scoreData);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }, [hasLoggedIn, currentUser.email, fetchScore]);

  const updateScore = useCallback(async (newScore) => {
    if (!hasLoggedIn || !currentUser.email) {
      console.log("User not logged in, skipping score update");
      return false;
    }

    try {
      const url = getBackendUrl();
      const payload = {
        email: currentUser.email,
        new_score: newScore,
      };
      const res = await axios.put(`${url}user/update_score`, payload);
      // Refresh stats after successful update
      await refreshStats();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }, [hasLoggedIn, currentUser.email, refreshStats]);

  return {
    score,
    totalSolved,
    isLoading,
    refreshStats,
    updateScore,
    fetchScore,
  };
}