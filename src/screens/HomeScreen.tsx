
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Calendar, MessageSquare, Search, Star } from 'lucide-react-native';
import { useThemeStore } from '../lib/theme';
import { Card } from '../components/ui/card';

// Define the navigation parameter list type
type RootStackParamList = {
  search: undefined;
  bookings: undefined;
  messages: undefined;
  'category/repairs': undefined;
  'category/cleaning': undefined;
  'category/plumbing': undefined;
  'category/electrical': undefined;
  'professional/1': undefined;
  'professional/2': undefined;
  [key: string]: undefined;
};

const categories = [
  {
    id: 'repairs',
    title: 'Repairs',
    icon: '🔧',
    count: '120+',
    color: '#FFB74D',
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    icon: '🧹',
    count: '80+',
    color: '#4FC3F7',
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    icon: '🚰',
    count: '95+',
    color: '#81C784',
  },
  {
    id: 'electrical',
    title: 'Electrical',
    icon: '⚡',
    count: '150+',
    color: '#FF8A65',
  },
];

const topProfessionals = [
  {
    id: '1',
    name: 'John Smith',
    rating: 4.8,
    specialty: 'Electrician',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    rating: 4.9,
    specialty: 'Plumber',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
];

const HomeScreen = () => {
  const { theme } = useThemeStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isDark = theme.startsWith('dark');

  const navigateTo = (path: keyof RootStackParamList) => {
    // Use the correct form for react-navigation v7 navigate method
    navigation.navigate(path as string);
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }
    ]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={[
              styles.welcomeText,
              { color: isDark ? '#888888' : '#666666' }
            ]}>
              Welcome back 👋
            </Text>
            <Text style={[
              styles.title,
              { color: isDark ? '#ffffff' : '#000000' }
            ]}>
              Find Your Service
            </Text>
          </View>
          
          <Pressable 
            style={styles.searchButton}
            onPress={() => navigateTo('search')}
          >
            <Search size={24} color={isDark ? '#ffffff' : '#000000'} />
          </Pressable>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? '#ffffff' : '#000000' }
          ]}>
            Categories
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }
                ]}
                onPress={() => navigateTo(`category/${category.id}` as keyof RootStackParamList)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryTitle,
                  { color: isDark ? '#ffffff' : '#000000' }
                ]}>
                  {category.title}
                </Text>
                <Text style={[
                  styles.categoryCount,
                  { color: category.color }
                ]}>
                  {category.count}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable
            style={[
              styles.quickActionButton,
              { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }
            ]}
            onPress={() => navigateTo('bookings')}
          >
            <Calendar size={24} color="#4FC3F7" />
            <Text style={[
              styles.quickActionText,
              { color: isDark ? '#ffffff' : '#000000' }
            ]}>
              Bookings
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.quickActionButton,
              { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }
            ]}
            onPress={() => navigateTo('messages')}
          >
            <MessageSquare size={24} color="#81C784" />
            <Text style={[
              styles.quickActionText,
              { color: isDark ? '#ffffff' : '#000000' }
            ]}>
              Messages
            </Text>
          </Pressable>
        </View>

        {/* Top Professionals */}
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? '#ffffff' : '#000000' }
          ]}>
            Top Professionals
          </Text>
          {topProfessionals.map((professional) => (
            <Pressable
              key={professional.id}
              style={[
                styles.professionalCard,
                { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }
              ]}
              onPress={() => navigateTo(`professional/${professional.id}` as keyof RootStackParamList)}
            >
              <Image
                source={{ uri: professional.image }}
                style={styles.professionalImage}
              />
              <View style={styles.professionalInfo}>
                <Text style={[
                  styles.professionalName,
                  { color: isDark ? '#ffffff' : '#000000' }
                ]}>
                  {professional.name}
                </Text>
                <Text style={[
                  styles.professionalSpecialty,
                  { color: isDark ? '#888888' : '#666666' }
                ]}>
                  {professional.specialty}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFB74D" fill="#FFB74D" />
                <Text style={[
                  styles.ratingText,
                  { color: isDark ? '#ffffff' : '#000000' }
                ]}>
                  {professional.rating}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  welcomeText: {
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoriesContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    width: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  professionalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  professionalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  professionalInfo: {
    flex: 1,
    marginLeft: 12,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  professionalSpecialty: {
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;
