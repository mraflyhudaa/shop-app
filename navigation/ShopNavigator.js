import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import {Platform} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../constants/Colors";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsStackNavigator = createNativeStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator
            screenOptions={defaultNavigationOptions}
        >
            <ProductsStackNavigator.Screen
                name="ProductsOverview"
                component={ProductOverviewScreen}
            />
            <ProductsStackNavigator.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
            />
            <ProductsStackNavigator.Screen name="Cart" component={CartScreen} />
        </ProductsStackNavigator.Navigator>
    );
};

const OrdersStackNavigator = createNativeStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator
            screenOptions={defaultNavigationOptions}
        >
            <OrdersStackNavigator.Screen
                name="OrdersScreen"
                component={OrdersScreen}
            />
        </OrdersStackNavigator.Navigator>
    );
};

const AdminStackNavigator = createNativeStackNavigator();

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
            <AdminStackNavigator.Screen
                name="UserProduct"
                component={UserProductScreen}
            />
            <AdminStackNavigator.Screen
                name="EditProduct"
                component={EditProductScreen}
            />
        </AdminStackNavigator.Navigator>
    );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <ShopDrawerNavigator.Navigator
                screenOptions={{
                    drawerActiveTintColor: Colors.primary,
                    headerShown: false,
                }}
            >
                <ShopDrawerNavigator.Screen
                    name="Products"
                    component={ProductsNavigator}
                    options={{
                        drawerIcon: (drawerConfig) => (
                            <Ionicons
                                name={
                                    Platform.OS === "android"
                                        ? "md-cart"
                                        : "ios-cart"
                                }
                                size={23}
                                color={drawerConfig.color}
                            />
                        ),
                    }}
                />
                <ShopDrawerNavigator.Screen
                    name="Orders"
                    component={OrdersNavigator}
                    options={{
                        drawerIcon: (drawerConfig) => (
                            <Ionicons
                                name={
                                    Platform.OS === "android"
                                        ? "md-list"
                                        : "ios-list"
                                }
                                size={23}
                                color={drawerConfig.color}
                            />
                        ),
                    }}
                />
                <ShopDrawerNavigator.Screen
                    name="Admins"
                    component={AdminNavigator}
                    options={{
                        drawerIcon: (drawerConfig) => (
                            <Ionicons
                                name={
                                    Platform.OS === "android"
                                        ? "md-create"
                                        : "ios-create"
                                }
                                size={23}
                                color={drawerConfig.color}
                            />
                        ),
                    }}
                />
            </ShopDrawerNavigator.Navigator>
        </NavigationContainer>
    );
};
