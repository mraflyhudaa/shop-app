import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id='email'
            lamel='E-Mail'
            keyboardType='email-address'
            required
            email
            autoCapitalize='none'
            errorMessage='Please enter a valid email address'
            onValueChange={() => {}}
            initialValue=''
          />
          <Input
            id='password'
            lamel='Password'
            keyboardType='default'
            secureTextEntry
            required
            minLength={5}
            autoCapitalize='none'
            errorMessage='Please enter a valid password'
            onValueChange={() => {}}
            initialValue=''
          />
          <Button title='Login' color={Colors.primary} onPress={() => {}} />
          <Button title='Signup' color={Colors.accent} onPress={() => {}} />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
