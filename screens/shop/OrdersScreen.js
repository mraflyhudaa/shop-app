import {StyleSheet, Text, Platform, FlatList} from "react-native";
import React, {useLayoutEffect} from "react";
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = ({navigation}) => {
    const orders = useSelector((state) => state.orders.orders);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Your Orders",
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Menu"
                        iconName={
                            Platform.OS === "android" ? "md-menu" : "ios-menu"
                        }
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Cart"
                        iconName={
                            Platform.OS === "android" ? "md-cart" : "ios-cart"
                        }
                        onPress={() => {
                            navigation.navigate("Cart");
                        }}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
