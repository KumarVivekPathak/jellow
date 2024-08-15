// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, database } from '../config/firebase'; // Ensure you have exported database from your firebase config
// const backImage = require("../assets/backImage.png");

// const SignupPage = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState(''); // Add a state for the user's name

//   const onHandleSignup = async () => {
//     if (email !== '' && password !== '' && name !== '') {
//       try {
//         // Create user with email and password
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         // Store additional user data in Firestore
//         await setDoc(doc(database, 'users', user.uid), {
//           name: name,
//           email: email,
//         });

//         console.log('Signup success');
//       } catch (err) {
//         Alert.alert("Signup error", err.message);
//       }
//     } else {
//       Alert.alert("Missing fields", "Please fill in all fields.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={backImage} style={styles.backImage} />
//       <View style={styles.whiteSheet} />
//       <SafeAreaView style={styles.form}>
//         <Text style={styles.title}>SIGN UP</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           autoCapitalize="words"
//           value={name}
//           onChangeText={(text) => setName(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter email"
//           autoCapitalize="none"
//           keyboardType="email-address"
//           textContentType="emailAddress"
//           autoFocus={true}
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter password"
//           autoCapitalize="none"
//           autoCorrect={false}
//           secureTextEntry={true}
//           textContentType="password"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//         />
//         <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
//           <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Sign Up</Text>
//         </TouchableOpacity>
//         <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
//           <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an account? </Text>
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//             <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> Log In</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//       <StatusBar barStyle="light-content" />
//     </View>
//   );
// };

// export default SignupPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: "orange",
//     alignSelf: "center",
//     paddingBottom: 24,
//   },
//   input: {
//     backgroundColor: "#F6F7FB",
//     height: 58,
//     marginBottom: 20,
//     fontSize: 16,
//     borderRadius: 10,
//     padding: 12,
//   },
//   backImage: {
//     width: "100%",
//     height: 340,
//     position: "absolute",
//     top: 0,
//     resizeMode: 'cover',
//   },
//   whiteSheet: {
//     width: '100%',
//     height: '75%',
//     position: "absolute",
//     bottom: 0,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 60,
//   },
//   form: {
//     flex: 1,
//     justifyContent: 'center',
//     marginHorizontal: 30,
//     marginTop: 50,
//   },
//   button: {
//     backgroundColor: '#f57c00',
//     height: 58,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 40,
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase'; // Ensure you have exported database from your firebase config
import uuid from 'react-native-uuid'; // Import uuid
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const backImage = require("../assets/backImage.png");

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Add a state for the user's name

  const onHandleSignup = async () => {
    if (email !== '' && password !== '' && name !== '') {
      try {
        // Generate a unique user ID

        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(database, 'users', user.uid), {
          userId: user.uid, 
          name: name,
          email: email,
        });

        await AsyncStorage.setItem("USERID", user.uid);

        console.log('Signup success');
        navigation.navigate("Home");
      } catch (err) {
        Alert.alert("Signup error", err.message);
      }
    } else {
      Alert.alert("Missing fields", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>SIGN UP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 50,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
