import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';

import Home from "../../screens/Home/Home";
import Usuarios from "../../screens/Usuarios/Usuarios";
import NuevoPost from "../../screens/NuevoPost/NuevoPost";

const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Nuevo post"
        component={NuevoPost}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="plus-square" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="users" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeMenu;