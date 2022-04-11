import {StyleSheet, Text, View, FlatList, Button} from "react-native";
import React, {useLayoutEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

const CartScreen = ({navigation}) => {
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => {
        const transformCartItems = [];
        for (const key in state.cart.items) {
            transformCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Your Cart",
        });
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{" "}
                    <Text style={styles.amount}>
                        {"$" + Math.abs(cartTotalAmount.toFixed(2))}
                    </Text>
                </Text>
                <Button
                    color={Colors.accent}
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(
                            ordersActions.addOrder(cartItems, cartTotalAmount)
                        );
                    }}
                />
            </Card>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.productId}
                    renderItem={(itemData) => (
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            deletable
                            onRemove={() => {
                                dispatch(
                                    cartActions.removeFromCart(
                                        itemData.item.productId
                                    )
                                );
                            }}
                        />
                    )}
                />
            </View>
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
    },
});
