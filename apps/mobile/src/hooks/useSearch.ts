import { useState, useEffect, useMemo } from 'react';

export interface SearchableItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  keywords?: string[];
  [key: string]: any;
}

export interface SearchResult<T extends SearchableItem> {
  item: T;
  score: number;
  matchedFields: string[];
}

export interface UseSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
  maxResults?: number;
  searchFields?: string[];
}

export interface UseSearchReturn<T extends SearchableItem> {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult<T>[];
  isSearching: boolean;
  hasResults: boolean;
  suggestions: string[];
  clearSearch: () => void;
}

/**
 * Custom hook for implementing search functionality with filtering, scoring, and suggestions
 * @param items - Array of searchable items
 * @param options - Search configuration options
 * @returns Search state and methods
 */
export function useSearch<T extends SearchableItem>(
  items: T[],
  options: UseSearchOptions = {}
): UseSearchReturn<T> {
  const {
    debounceMs = 300,
    minQueryLength = 2,
    maxResults = 20,
    searchFields = ['title', 'description', 'category', 'keywords'],
  } = options;

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Calculate search results with scoring
  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < minQueryLength) {
      return [];
    }

    const searchTerms = debouncedQuery.toLowerCase().trim().split(/\s+/);
    const scoredResults: SearchResult<T>[] = [];

    items.forEach((item) => {
      let score = 0;
      const matchedFields: string[] = [];

      searchFields.forEach((field) => {
        const fieldValue = item[field];
        if (!fieldValue) return;

        const fieldText = Array.isArray(fieldValue)
          ? fieldValue.join(' ').toLowerCase()
          : String(fieldValue).toLowerCase();

        searchTerms.forEach((term) => {
          if (fieldText.includes(term)) {
            // Exact match in title gets highest score
            if (field === 'title' && fieldText === term) {
              score += 100;
            }
            // Title starts with term gets high score
            else if (field === 'title' && fieldText.startsWith(term)) {
              score += 50;
            }
            // Title contains term
            else if (field === 'title') {
              score += 30;
            }
            // Category match
            else if (field === 'category') {
              score += 20;
            }
            // Description or keywords match
            else {
              score += 10;
            }

            if (!matchedFields.includes(field)) {
              matchedFields.push(field);
            }
          }
        });
      });

      if (score > 0) {
        scoredResults.push({ item, score, matchedFields });
      }
    });

    // Sort by score (highest first) and limit results
    return scoredResults
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }, [debouncedQuery, items, minQueryLength, maxResults, searchFields]);

  // Generate search suggestions based on popular terms
  const suggestions = useMemo(() => {
    if (!query || query.length < minQueryLength) {
      return [];
    }

    const queryLower = query.toLowerCase();
    const suggestionSet = new Set<string>();

    items.forEach((item) => {
      // Add matching titles
      if (item.title.toLowerCase().includes(queryLower)) {
        suggestionSet.add(item.title);
      }

      // Add matching categories
      if (item.category && item.category.toLowerCase().includes(queryLower)) {
        suggestionSet.add(item.category);
      }

      // Add matching keywords
      if (item.keywords) {
        item.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(queryLower)) {
            suggestionSet.add(keyword);
          }
        });
      }
    });

    return Array.from(suggestionSet).slice(0, 5);
  }, [query, items, minQueryLength]);

  const clearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
  };

  return {
    query,
    setQuery,
    results,
    isSearching,
    hasResults: results.length > 0,
    suggestions,
    clearSearch,
  };
}
