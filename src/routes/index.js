import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import Signin from "../pages/Signin";
import Register from "../pages/Register";
import Dashboard from "../pages/dashboard";
import RegisterEntrada from "../pages/registerEntrada";
import UserProfileScreen from "../pages/profile";
import ConfigProfile from "../pages/ConfigProfile";
import NewCreditCard from "../pages/NewCreditCard";
import Accounts from "../pages/Accounts"
import RegisterAccount from "../pages/RegisterAccount";
import AccountExist from "../pages/AccountExist";

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
            <Stack.Screen name="newCreditCard" component={NewCreditCard} options={{headerShown: false}}/>
            <Stack.Screen name="Accounts" component={Accounts} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterAccount" component={RegisterAccount} options={{headerShown: false}}/>
            <Stack.Screen name="AccountExist" component={AccountExist} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}