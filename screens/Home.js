// import React, { useEffect } from "react";
// import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FontAwesome } from '@expo/vector-icons';
// import colors from '../colors';
// import { Entypo } from '@expo/vector-icons';
// const cowImage = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F320107485984677497%2F&psig=AOvVaw2Mi-87GNdfZPz8xUO5ai06&ust=1723754964225000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDogu2t9YcDFQAAAAAdAAAAABAE";

// const Home = () => {

//     const navigation = useNavigation();

//     useEffect(() => {
//         navigation.setOptions({
//             headerLeft: () => (
//                 <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
//             ),
//             headerRight: () => (
//                 <Image
//                     source={{ uri: cowImage+"" }}
//                     style={{
//                         width: 40,
//                         height: 40,
//                         marginRight: 15,
//                     }}
//                 />
//             ),
//         });
//     }, [navigation]);

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity
//                 onPress={() => navigation.navigate("Chat")}
//                 style={styles.chatButton}
//             >
//                 <Entypo name="chat" size={24} color={colors.lightGray} />
//             </TouchableOpacity>
//         </View>
//     );
//     };

//     export default Home;

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             justifyContent: 'flex-end',
//             alignItems: 'flex-end',
//             backgroundColor: "#fff",
//         },
//         chatButton: {
//             backgroundColor: colors.primary,
//             height: 50,
//             width: 50,
//             borderRadius: 25,
//             alignItems: 'center',
//             justifyContent: 'center',
//             shadowColor: colors.primary,
//             shadowOffset: {
//                 width: 0,
//                 height: 2,
//             },
//             shadowOpacity: .9,
//             shadowRadius: 8,
//             marginRight: 20,
//             marginBottom: 50,
//         }
//     });


// import React, { useEffect, useState } from "react";
// import { View, TouchableOpacity, Text, Image, FlatList, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FontAwesome } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';
// import { collection, getDocs, query, where, orderBy, limit, getDoc, doc } from "firebase/firestore";
// import { database } from '../config/firebase';
// import colors from '../colors';

// const cowImage = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F320107485984677497%2F&psig=AOvVaw2Mi-87GNdfZPz8xUO5ai06&ust=1723754964225000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDogu2t9YcDFQAAAAAdAAAAABAE";

// const Home = () => {
//     const navigation = useNavigation();
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
    

//         const fetchUsers = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(database, 'users'));
//                 const usersList = querySnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));
//                 setUsers(usersList);
//             } catch (error) {
//                 if (error.code === 'firestore/failed-precondition') {
            
//                     Alert.alert("Error", "The required index is still being built. Please try again later.");
//                 } else {
//                     console.error("Error fetching users: ", error);
//                     Alert.alert("Error", "An error occurred while fetching users.");
//                 }
//             }
//         };
        

//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         navigation.setOptions({
//             headerLeft: () => (
//                 <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
//             ),
//             headerRight: () => (
//                 <Image
//                     source={{ uri: cowImage }}
//                     style={{
//                         width: 40,
//                         height: 40,
//                         marginRight: 15,
//                     }}
//                 />
//             ),
//         });
//     }, [navigation]);

//     const getLastMessage = async (userId) => {
//         const userMessagesQuery = query(
//             collection(database, 'messages'),
//             where('receiverId', '==', userId),
//             orderBy('createdAt', 'desc'),
//             limit(1)
//         );
//         const querySnapshot = await getDocs(userMessagesQuery);
//         const lastMessageDoc = querySnapshot.docs[0];
//         return lastMessageDoc ? lastMessageDoc.data() : {};
//     };

//     const handleUserPress = (user) => {
//         navigation.navigate("Chat", { user });
//     };

//     const renderUser = ({ item }) => (
//         <TouchableOpacity
//             onPress={() => handleUserPress(item)}
//             style={styles.userItem}
//         >
//             <Image
//                 source={{ uri: item.avatar || 'https://i.pravatar.cc/300' }}
//                 style={styles.userAvatar}
//             />
//             <View style={styles.userInfo}>
//                 <Text style={styles.userName}>{item.name}</Text>
//                 <Text style={styles.userLastMessage}>
//                     {item.lastMessage}
//                 </Text>
// {!item.lastMessageTime ?  
//     <Text>{""}</Text>
// :<Text style={styles.userLastMessageTime}>
//                     {item.lastMessageTime.toDate().toLocaleTimeString()} {/* Format time as needed */}
//                 </Text> 
                
//                 }
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={users}
//                 renderItem={renderUser}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.userList}
//             />
//             <TouchableOpacity
//                 onPress={() => navigation.navigate("Chat")}
//                 style={styles.chatButton}
//             >
//                 <Entypo name="chat" size={24} color={colors.lightGray} />
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     userList: {
//         padding: 10,
//     },
//     userItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: colors.gray,
//     },
//     userAvatar: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     userInfo: {
//         flex: 1,
//     },
//     userName: {
//         fontSize: 18,
//         color: colors.black,
//         fontWeight: 'bold',
//     },
//     userLastMessage: {
//         fontSize: 14,
//         color: colors.gray,
//     },
//     userLastMessageTime: {
//         fontSize: 12,
//         color: colors.lightGray,
//     },
//     chatButton: {
//         backgroundColor: colors.primary,
//         height: 50,
//         width: 50,
//         borderRadius: 25,
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: colors.primary,
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: .9,
//         shadowRadius: 8,
//         marginRight: 20,
//         marginBottom: 50,
//     },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FontAwesome, Entypo } from '@expo/vector-icons';
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { database } from '../config/firebase';
// import colors from '../colors';
// import AsyncStorage from "@react-native-async-storage/async-storage";


// const Home = () => {
//     const navigation = useNavigation();
//     const [users, setUsers] = useState([]);
//     let loggedInUserId = "";

//     const fetchUserIdAndUsers = async () => {
           
//          loggedInUserId = await AsyncStorage.getItem("USERID");            
//         const usersCollection = collection(database, 'users');
//         const q = query(usersCollection, where("userId", "!=", loggedInUserId));

//         try{
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.empty) {
//             Alert.alert("No Users Found");
//         } else {
//             const usersList = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setUsers(usersList);
//         }}catch(error){
//             console.log("Error fetchng users !")
//         }
    
// };

//     useEffect(() => {
//         fetchUserIdAndUsers();
//     }, []);



//     const handleUserPress = (user) => {
//         navigation.navigate("Chat", { user : user, id : loggedInUserId});
//     };

//     const renderUser = ({ item }) => (
//         <TouchableOpacity
//             onPress={() => handleUserPress(item)}
//             style={styles.userItem}
//         >
//             <Image
//                 source={{ uri: item.avatar || 'https://i.pravatar.cc/300' }}
//                 style={styles.userAvatar}
//             />
//             <View style={styles.userInfo}>
//                 <Text style={styles.userName}>{item.name}</Text>
                
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={users}
//                 renderItem={renderUser}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.userList}
//             />
           
//         </View>
//     );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, database } from '../config/firebase';
import colors from '../colors';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState("");

    const fetchUserIdAndUsers = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("User not authenticated");
            }
            const userId = user.uid;
            setLoggedInUserId(userId);

            const usersCollection = collection(database, 'users');
            const q = query(usersCollection, where("userId", "!=", userId));

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                Alert.alert("No Users Found", "There are no other users to display.");
            } else {
                const usersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            if (error.code === 'permission-denied') {
                Alert.alert("Access Denied", "You don't have permission to access this data. Please check your Firebase security rules.");
            } else {
                Alert.alert("Error", "Failed to fetch users. Please try again later.");
            }
        }
    };

    useEffect(() => {
        fetchUserIdAndUsers();
    }, []);

    const handleUserPress = (user) => {
        navigation.navigate("Chat", { user: user, id: loggedInUserId });
    };

    const renderUser = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleUserPress(item)}
            style={styles.userItem}
        >
            <Image
                source={{ uri: item.avatar || 'https://i.pravatar.cc/300' }}
                style={styles.userAvatar}
            />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.userList}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    userList: {
        padding: 10,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        color: colors.black,
        fontWeight: 'bold',
    },
    userLastMessage: {
        fontSize: 14,
        color: colors.gray,
    },
    userLastMessageTime: {
        fontSize: 12,
        color: colors.lightGray,
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    },
});
