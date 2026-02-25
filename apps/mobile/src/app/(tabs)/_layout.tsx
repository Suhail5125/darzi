import { Tabs } from 'expo-router';
import TabBar from '../../components/navigation/TabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarAccessibilityLabel: 'Home tab',
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: 'Explore',
          tabBarAccessibilityLabel: 'Explore tab',
        }} 
      />
      <Tabs.Screen 
        name="cart" 
        options={{ 
          title: 'Cart',
          tabBarAccessibilityLabel: 'Cart tab',
        }} 
      />
      <Tabs.Screen 
        name="account" 
        options={{ 
          title: 'Account',
          tabBarAccessibilityLabel: 'Account tab',
        }} 
      />
    </Tabs>
  );
}
