import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { FontAwesome } from '@expo/vector-icons';

import Home from "../../screens/Home/Home";
import Perfil from "../../screens/Perfil/Perfil.js";
import CrearPost from "../../screens/CrearPost/CrearPost";
import StackNav from "../StackNav/StackNav";


function HomeMenu() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <Tab.Screen
        name="StackNav"
        component={StackNav}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="CrearPost"
        component={CrearPost}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="plus-square" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
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