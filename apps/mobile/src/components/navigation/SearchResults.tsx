import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { SearchResult, SearchableItem } from '../../hooks/useSearch';

interface SearchResultsProps<T extends SearchableItem> {
  results: SearchResult<T>[];
  isSearching: boolean;
  hasQuery: boolean;
  onResultPress: (item: T) => void;
  emptyMessage?: string;
  renderResultItem?: (result: SearchResult<T>) => React.ReactNode;
}

export default function SearchResults<T extends SearchableItem>({
  results,
  isSearching,
  hasQuery,
  onResultPress,
  emptyMessage = 'No results found',
  renderResultItem,
}: SearchResultsProps<T>) {
  // Show loading state
  if (isSearching) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Searching...</Text>
      </View>
    );
  }

  // Show empty state when query exists but no results
  if (hasQuery && results.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="search-outline" size={64} color={colors.text.disabled} />
        <Text style={styles.emptyTitle}>{emptyMessage}</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting your search terms or browse all services
        </Text>
      </View>
    );
  }

  // Show results
  if (results.length > 0) {
    return (
      <FlatList
        data={results}
        keyExtractor={(result) => result.item.id}
        renderItem={({ item: result }) => {
          if (renderResultItem) {
            return <>{renderResultItem(result)}</>;
          }

          return (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => onResultPress(result.item)}
              accessibilityLabel={`View ${result.item.title}`}
              accessibilityRole="button"
            >
              <View style={styles.resultContent}>
                <Text style={styles.resultTitle} numberOfLines={2}>
                  {result.item.title}
                </Text>
                {result.item.description && (
                  <Text style={styles.resultDescription} numberOfLines={2}>
                    {result.item.description}
                  </Text>
                )}
                {result.item.category && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{result.item.category}</Text>
                  </View>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  // Default state - no query entered
  return (
    <View style={styles.centerContainer}>
      <Ionicons name="search" size={64} color={colors.text.disabled} />
      <Text style={styles.emptyTitle}>Search for services</Text>
      <Text style={styles.emptySubtitle}>
        Enter a search term to find services and content
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing['2xl'],
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginTop: spacing.sm,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * 1.5,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
  },
  resultContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  resultTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  resultDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.sm * 1.4,
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
  },
  categoryText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
});
