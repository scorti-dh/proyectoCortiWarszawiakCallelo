import Home from '../../screens/Home/Home'
import Comentarios from '../../screens/Comentarios/Comentarios'


function StackNav(props) {
    <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Comentarios'
          component={Comentarios}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
}

export default StackNav