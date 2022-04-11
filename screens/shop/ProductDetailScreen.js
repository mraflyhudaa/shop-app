import {StyleSheet, Text, ScrollView, View, Image, Button} from "react-native";
import React, {useLayoutEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = ({route, navigation}) => {
    const {productId, productTitle} = route.params;
    const selectedProduct = useSelector((state) =>
        state.products.availableProducts.find((prod) => prod.id === productId)
    );
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: productTitle,
        });
    }, [navigation, productTitle]);

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{uri: selectedProduct.imageUrl}}
            />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}
                />
            </View>
            <Text style={styles.price}>
                $ {selectedProduct.price.toFixed(2)}
            </Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
        </ScrollView>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    actions: {
        marginVertical: 10,
        alignItems: "center",
    },
    price: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
    },
    description: {
        fontFamily: "open-sans",
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20,
    },
});
