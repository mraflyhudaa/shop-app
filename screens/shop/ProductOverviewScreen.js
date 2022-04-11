import {StyleSheet, FlatList, Platform, Button} from "react-native";
import React, {useLayoutEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = ({navigation}) => {
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        navigation.navigate("ProductDetail", {
            productId: id,
            productTitle: title,
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "All Products",
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
    }, [navigation, HeaderButton]);
    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(
                            itemData.item.id,
                            itemData.item.title
                        );
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(
                                itemData.item.id,
                                itemData.item.title
                            );
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
