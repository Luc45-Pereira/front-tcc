import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import Signin from "../pages/Signin";
import Register from "../pages/Register";
import Dashboard from "../pages/dashboard";
import RegisterEntrada from "../pages/registerEntrada";
import UserProfileScreen from "../pages/profile";
import ConfigProfile from "../pages/ConfigProfile";

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/> */}
            <Stack.Screen name="SignIn" component={Signin} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="dashboard" component={Dashboard} options={{headerShown: false}}/>
            <Stack.Screen name="entrada" component={RegisterEntrada} options={{headerShown: false}}/>
            <Stack.Screen name="profile" component={UserProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="configProfile" component={ConfigProfile} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}