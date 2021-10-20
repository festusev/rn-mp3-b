import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import firebase from "firebase";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}

export default function SignUpScreen({ navigation }: Props) {
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign In Button (goes to Sign In Screen)
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/start
  */
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [snackbarContent, setSnackbarContent] = useState("")
  
    const onDismissSnackBar = () => setSnackbarContent("");
  
    return (
      <>
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Button mode="contained" onPress={() => {
              console.log("Signing up, email="+email+", password = " + password)
              firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
                let user = userCredential.user;
                console.log("User signed up");
                navigation.navigate("RootStackScreen");
              }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorMessage)
                setSnackbarContent(errorMessage);
              });
            }}>
              Create Account
            </Button>
            <Button mode="contained" onPress={() => {navigation.navigate("SignInScreen")}}>
              Sign In
            </Button>
          </SafeAreaView>
        </ScrollView>
        <Snackbar
              visible={snackbarContent}
              onDismiss={onDismissSnackBar}
              >
              {snackbarContent}
          </Snackbar>
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
});
