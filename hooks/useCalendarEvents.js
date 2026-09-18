/**
 * hooks/useCalendarEvents.js
 * Client hook that fetches upcoming Google Calendar events from /api/calendar.
 * Provides live events, loading state, error state, connection flag, and refetch handler.
 * Fully compliant with React 19 async effect guidelines.
 */
"use client";

import { useState, useEffect, useCallback } from "react";

export function useCalendarEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const refetch = useCallback(() => {
    setLoading(true);
    setReloadTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadEvents() {
      try {
        const res = await fetch("/api/calendar");

        if (ignore) return;

        if (res.status === 401) {
          // Unauthenticated or demo mode
          setIsGoogleConnected(false);
          setEvents([]);
          return;
        }

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `HTTP error ${res.status}`);
        }

        const data = await res.json();
        if (ignore) return;

        setEvents(data.events || []);
        setIsGoogleConnected(Boolean(data.isGoogleConnected));
        setError(null);
      } catch (err) {
        if (ignore) return;
        console.warn("Could not load Google Calendar events:", err.message);
        setError(err.message);
        setIsGoogleConnected(false);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      ignore = true;
    };
  }, [reloadTrigger]);

  return {
    events,
    loading,
    error,
    isGoogleConnected,
    refetch,
  };
}