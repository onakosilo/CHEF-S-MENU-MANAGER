import { useMemo, useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from '@/constants/theme';

import {
  Course,
  useMenu,
} from '@/context/MenuContext';

const courses: Course[] = [
  'Starter',
  'Main Course',
  'Dessert',
];

export default function ExploreScreen() {
  const { menuItems } = useMenu();

  const scheme = useColorScheme();

  const colors = Colors[
    scheme === 'dark' ? 'dark' : 'light'
  ];

  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] =
    useState<Course | 'All'>('All');

  // Search and filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCourse =
        selectedCourse === 'All' ||
        item.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [menuItems, search, selectedCourse]);

  // Calculate statistics using ALL menu items
  const totalItems = menuItems.length;

  const averagePrice =
    totalItems > 0
      ? menuItems.reduce(
          (total, item) => total + item.price,
          0
        ) / totalItems
      : 0;

  const courseCount = (course: Course) =>
    menuItems.filter(
      (item) => item.course === course
    ).length;

  function clearFilters() {
    setSearch('');
    setSelectedCourse('All');
  }

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}

        <Text style={[styles.eyebrow, { color: colors.primary }]}>
          RESTAURANT OVERVIEW
        </Text>

        <Text style={[styles.heading, { color: colors.text }]}>
          Menu Insights
        </Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Search your menu and monitor your restaurant's offerings.
        </Text>

        {/* Statistics */}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Menu Statistics
        </Text>

        <View style={styles.statisticsGrid}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.statIcon}>🍽️</Text>

            <Text style={styles.statNumber}>
              {totalItems}
            </Text>

            <Text style={styles.statLabel}>
              Total Dishes
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
                borderWidth: 1,
              },
            ]}
          >
            <Text style={styles.statIcon}>💰</Text>

            <Text style={[styles.statNumber, { color: colors.primary }]}>
              R{averagePrice.toFixed(2)}
            </Text>

            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Average Price
            </Text>
          </View>
        </View>

        {/* Course breakdown */}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Dishes by Course
        </Text>

        {courses.map((course) => {
          const count = courseCount(course);

          const percentage =
            totalItems > 0
              ? (count / totalItems) * 100
              : 0;

          return (
            <View
              key={course}
              style={[
                styles.courseCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.courseHeader}>
                <Text style={[styles.courseName, { color: colors.text }]}>
                  {course}
                </Text>

                <Text style={[styles.courseCount, { color: colors.primary }]}>
                  {count}
                </Text>
              </View>

              <View
                style={[
                  styles.progressBackground,
                  { backgroundColor: colors.secondary },
                ]}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </View>

              <Text style={[styles.percentage, { color: colors.textSecondary }]}>
                {percentage.toFixed(0)}% of your menu
              </Text>
            </View>
          );
        })}

        {/* Search */}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Find a Dish
        </Text>

        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Search by dish name..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />

        {/* Filters */}

        <Text style={[styles.filterHeading, { color: colors.text }]}>
          Filter by Course
        </Text>

        <View style={styles.filterContainer}>
          <Pressable
            onPress={() => setSelectedCourse('All')}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  selectedCourse === 'All'
                    ? colors.primary
                    : colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color:
                  selectedCourse === 'All'
                    ? '#FFFFFF'
                    : colors.text,
                fontWeight: '700',
              }}
            >
              All
            </Text>
          </Pressable>

          {courses.map((course) => (
            <Pressable
              key={course}
              onPress={() => setSelectedCourse(course)}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedCourse === course
                      ? colors.primary
                      : colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    selectedCourse === course
                      ? '#FFFFFF'
                      : colors.text,
                  fontWeight: '700',
                }}
              >
                {course}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.clearButton}
          onPress={clearFilters}
        >
          <Text style={{ color: colors.primary, fontWeight: '700' }}>
            Clear Search & Filters
          </Text>
        </Pressable>

        {/* Search results */}

        <View style={styles.resultsHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Search Results
          </Text>

          <Text style={{ color: colors.textSecondary }}>
            {filteredItems.length} found
          </Text>
        </View>

        {filteredItems.length === 0 ? (
          <View
            style={[
              styles.emptyResults,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={{ fontSize: 30 }}>🔎</Text>

            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No dishes found
            </Text>

            <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>
              Try another search or clear your filters.
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <View
              key={item.id}
              style={[
                styles.resultCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.resultName, { color: colors.text }]}>
                  {item.name}
                </Text>

                <Text style={[styles.resultCourse, { color: colors.primary }]}>
                  {item.course}
                </Text>

                <Text style={[styles.resultDescription, { color: colors.textSecondary }]}>
                  {item.description}
                </Text>
              </View>

              <Text style={[styles.resultPrice, { color: colors.primary }]}>
                R{item.price.toFixed(2)}
              </Text>
            </View>
          ))
        )}

        <Text style={[styles.footer, { color: colors.textSecondary }]}>
          Chef's Menu Manager • Menu Insights
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  content: {
    padding: 22,
    paddingBottom: 100,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },

  heading: {
    fontSize: 29,
    fontWeight: '800',
    marginTop: 8,
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 15,
  },

  statisticsGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  statCard: {
    flex: 1,
    padding: 19,
    borderRadius: 16,
  },

  statIcon: {
    fontSize: 24,
  },

  statNumber: {
    fontSize: 25,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 15,
  },

  statLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
  },

  courseCard: {
    padding: 16,
    borderRadius: 13,
    borderWidth: 1,
    marginBottom: 12,
  },

  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  courseName: {
    fontWeight: '700',
    fontSize: 14,
  },

  courseCount: {
    fontWeight: '800',
    fontSize: 16,
  },

  progressBackground: {
    height: 7,
    borderRadius: 10,
    marginTop: 14,
    overflow: 'hidden',
  },

  progressFill: {
    height: 7,
    borderRadius: 10,
  },

  percentage: {
    fontSize: 11,
    marginTop: 8,
  },

  searchInput: {
    borderWidth: 1,
    borderRadius: 11,
    padding: 15,
    fontSize: 14,
  },

  filterHeading: {
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
  },

  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  filterButton: {
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 9,
    borderWidth: 1,
  },

  clearButton: {
    alignSelf: 'flex-start',
    paddingVertical: 15,
  },

  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 13,
    marginBottom: 12,
    gap: 10,
  },

  resultName: {
    fontSize: 15,
    fontWeight: '800',
  },

  resultCourse: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },

  resultDescription: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },

  resultPrice: {
    fontSize: 14,
    fontWeight: '800',
  },

  emptyResults: {
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    padding: 25,
    gap: 10,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
  },

  footer: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 35,
  },
});
