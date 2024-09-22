
// import React, { useState, useLayoutEffect, useCallback } from 'react';
// import { TouchableOpacity, View, KeyboardAvoidingView, Platform, Image, Text, ImageBackground } from 'react-native';
// import { GiftedChat, InputToolbar, Actions, Bubble, Send } from 'react-native-gifted-chat';
// import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from 'firebase/firestore';
// import { signOut } from 'firebase/auth';
// import { auth, database, storage } from '../config/firebase';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { AntDesign, FontAwesome } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import colors from '../colors';
// import Background from '../assets/Background.jpg';

// const ChatRoom = () => {
//   const [messages, setMessages] = useState([]);
//   const navigation = useNavigation();
//   const route = useRoute();

//   const onSignOut = () => {
//     signOut(auth).catch(error => console.log('Error logging out: ', error));
//   };

//   useLayoutEffect(() => {
//     const user = route.params.user;
//     const lastMessageTime = messages.length > 0 ? messages[0].createdAt.toLocaleTimeString() : '';
//     console.log("userr ", user)
//     navigation.setOptions({
//       headerTitle: () => (
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Image
//             source={{ uri: user.image }}
//             style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
//           />
//           <View>
//             <Text style={{ fontWeight: 'bold', fontSize : 20 }}>{user.name}</Text>
//             <Text style={{ color: colors.gray, fontSize: 12 }}>{lastMessageTime}</Text>
//           </View>
//         </View>
//       ),
//       headerRight: () => (
//         <TouchableOpacity
//           style={{ marginRight: 10 }}
//           onPress={onSignOut}
//         >
//           <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation, messages]);

//   useLayoutEffect(() => {
//     if (route.params) {
//       const chatRef = collection(database, 'chats', `${route.params.id}_${route.params.user.userId}`, 'messages');
//       const q = query(chatRef, orderBy('createdAt', 'desc'));

//       const subscribe = onSnapshot(q, querySnapshot => {
//         const loadedMessages = querySnapshot.docs.map(doc => ({
//           _id: doc.id,
//           createdAt: doc.data()?.createdAt?.toDate() || new Date(),
//           text: doc.data().text || '',
//           user: doc.data().user || {},
//           image: doc.data().image || null,
//           file: doc.data().file || null,
//         }));
//         setMessages(loadedMessages);
//       }, error => {
//         console.error('Error fetching messages:', error);
//       });

//       return () => subscribe();
//     }
//   }, [route.params]);

//   const onSend = useCallback(async (messages = []) => {
//     try {
//       const msg = messages[0];
//       const myMsg = {
//         _id: msg._id,
//         text: msg.text || '',
//         createdAt: serverTimestamp(),
//         user: msg.user,
//         image: msg.image || null,
//         file: msg.file || null,
//         sendBy: route.params.id,
//         sendTo: route.params.user.userId,
//       };

//       // Add message to both chat collections
//       const chatRef1 = collection(database, 'chats', `${route.params.id}_${route.params.user.userId}`, 'messages');
//       const chatRef2 = collection(database, 'chats', `${route.params.user.userId}_${route.params.id}`, 'messages');

//       await addDoc(chatRef1, myMsg);
//       await addDoc(chatRef2, myMsg);

//       // Update local state with new messages
//       setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
//     } catch (error) {
//       console.error("Error sending message: ", error);
//     }
//   }, [route.params]);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const { uri } = result.assets[0];
  //     const imageUrl = await uploadFile(uri, 'images');
  //     onSend([{ _id: new Date().getTime(), createdAt: new Date(), text: '', user: { _id: auth.currentUser.email }, image: imageUrl }]);
  //   }
  // };

  // const pickDocument = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({
  //     type: '*/*',
  //   });

  //   if (result.type !== 'cancel') {
  //     const { uri } = result;
  //     const fileUrl = await uploadFile(uri, 'files');
  //     onSend([{ _id: new Date().getTime(), createdAt: new Date(), text: '', user: { _id: auth.currentUser.email }, file: fileUrl }]);
  //   }
  // };

  // const uploadFile = async (uri, folder) => {
  //   try {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     const fileRef = ref(storage, `${folder}/${new Date().getTime()}_${auth.currentUser.email}`);
  //     await uploadBytes(fileRef, blob);
  //     const downloadURL = await getDownloadURL(fileRef);
  //     return downloadURL;
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw error;
  //   }
  // };

  // const renderActions = (props) => (
  //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //     <TouchableOpacity onPress={pickImage} style={{ marginRight: 10 }}>
  //       <AntDesign name="paperclip" size={26} color={colors.gray} />
  //     </TouchableOpacity>
  //     <Actions
  //       {...props}
  //       options={{
  //         ['Send Image']: pickImage,
  //         ['Send Document']: pickDocument,
  //       }}
  //       icon={() => null} 
  //     />
  //   </View>
  // );

  // const renderMessageImage = (props) => {
  //   const { currentMessage } = props;
  //   return (
  //     <View style={{ padding: 5 }}>
  //       <Image
  //         source={{ uri: currentMessage.image }}
  //         style={{ width: 200, height: 200, borderRadius: 10 }}
  //       />
  //     </View>
  //   );
  // };

  // const renderBubble = (props) => (
  //   <Bubble
  //     {...props}
  //     wrapperStyle={{
  //       right: { backgroundColor: colors.primary },
  //       left: { backgroundColor: colors.lightGray }
  //     }}
  //   />
  // );

  // const renderInputToolbar = (props) => (
  //   <InputToolbar
  //     {...props}
  //     containerStyle={{
  //       borderTopColor: colors.gray,
  //       borderTopWidth: 1,
  //       padding: 5,
  //       backgroundColor: '#fff',
  //       alignItems: 'center',
  //     }}
  //   />
  // );

  // const renderSend = (props) => (
  //   <Send {...props}>
  //     <View style={{ marginRight: 10 }}>
  //       <FontAwesome name="send" size={24} color={colors.primary} />
  //     </View>
  //   </Send>
  // );

//   return (
   
//       <ImageBackground  
//       source={Background}
//       resizeMode=' cover'
//       style={{flex:1, backgroundColor : 'red', height: '100%'}}>
//          <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         messagesContainerStyle={{
//           backgroundColor: 'transparent', // Make the background of messages transparent to show the ImageBackground
//         }}
//         showAvatarForEveryMessage={true}
//         showUserAvatar={true}
//         onSend={messages => onSend(messages)}
//         isTyping={true}
       
//         textInputStyle={{
//           backgroundColor: '#fff',
//           borderRadius: 20,
//         }}
//         user={{
//           _id: auth?.currentUser?.email,
//           avatar: 'https://i.pravatar.cc/300'
//         }}
//         renderActions={renderActions}
//         renderMessageImage={renderMessageImage}
//         renderBubble={renderBubble}
//         renderInputToolbar={renderInputToolbar}
//         renderSend={renderSend}
//       />
//       {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
//     </View>
//       </ImageBackground>
//   );
// };

// export default ChatRoom;



import React, { useState, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, View, KeyboardAvoidingView, Platform, Image, Text, ImageBackground, Alert } from 'react-native';
import { GiftedChat, InputToolbar, Actions, Bubble, Send } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database, storage } from '../config/firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import colors from '../colors';
import Background from '../assets/Background.jpg';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    const user = route.params.user;
    const lastMessageTime = messages.length > 0 ? messages[0].createdAt.toLocaleTimeString() : '';
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: user.image }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.name}</Text>
            <Text style={{ color: colors.gray, fontSize: 12 }}>{lastMessageTime}</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, messages]);

  useLayoutEffect(() => {
    if (route.params) {
      const chatId = [route.params.id, route.params.user.userId].sort().join('_');
      const chatRef = collection(database, 'chats', chatId, 'messages');
      const q = query(chatRef, orderBy('createdAt', 'desc'));

      const subscribe = onSnapshot(q, querySnapshot => {
        const loadedMessages = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data()?.createdAt?.toDate() || new Date(),
          text: doc.data().text || '',
          user: doc.data().user || {},
          image: doc.data().image || null,
          file: doc.data().file || null,
        }));
        setMessages(loadedMessages);
      }, error => {
        console.error('Error fetching messages:', error);
        Alert.alert('Error', 'Failed to load messages. Please try again later.');
      });

      return () => subscribe();
    }
  }, [route.params]);

  const onSend = useCallback(async (messages = []) => {
    try {
      const msg = messages[0];
      const myMsg = {
        _id: msg._id,
        text: msg.text || '',
        createdAt: serverTimestamp(),
        user: msg.user,
        image: msg.image || null,
        file: msg.file || null,
      };

      const chatId = [route.params.id, route.params.user.userId].sort().join('_');
      const chatRef = collection(database, 'chats', chatId, 'messages');

      await addDoc(chatRef, myMsg);

      // Update local state with new messages
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    } catch (error) {
      console.error("Error sending message: ", error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  }, [route.params]);

    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const imageUrl = await uploadFile(uri, 'images');
      onSend([{ _id: new Date().getTime(), createdAt: new Date(), text: '', user: { _id: auth.currentUser.email }, image: imageUrl }]);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    });

    if (result.type !== 'cancel') {
      const { uri } = result;
      const fileUrl = await uploadFile(uri, 'files');
      onSend([{ _id: new Date().getTime(), createdAt: new Date(), text: '', user: { _id: auth.currentUser.email }, file: fileUrl }]);
    }
  };

  const uploadFile = async (uri, folder) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = ref(storage, `${folder}/${new Date().getTime()}_${auth.currentUser.email}`);
      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const renderActions = (props) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={pickImage} style={{ marginRight: 10 }}>
        <AntDesign name="paperclip" size={26} color={colors.gray} />
      </TouchableOpacity>
      <Actions
        {...props}
        options={{
          ['Send Image']: pickImage,
          ['Send Document']: pickDocument,
        }}
        icon={() => null} 
      />
    </View>
  );

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    return (
      <View style={{ padding: 5 }}>
        <Image
          source={{ uri: currentMessage.image }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      </View>
    );
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: colors.primary },
        left: { backgroundColor: colors.lightGray }
      }}
    />
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        borderTopColor: colors.gray,
        borderTopWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}
    />
  );

  const renderSend = (props) => (
    <Send {...props}>
      <View style={{ marginRight: 10 }}>
        <FontAwesome name="send" size={24} color={colors.primary} />
      </View>
    </Send>
  );

  return (
    <ImageBackground  
      source={Background}
      resizeMode='cover'
      style={{flex: 1, height: '100%'}}>
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          messagesContainerStyle={{
            backgroundColor: 'transparent',
          }}
          showAvatarForEveryMessage={true}
          showUserAvatar={true}
          onSend={messages => onSend(messages)}
          isTyping={true}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: auth?.currentUser?.uid,
            avatar: 'https://i.pravatar.cc/300'
          }}
          renderActions={renderActions}
          renderMessageImage={renderMessageImage}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
        />
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
      </View>
    </ImageBackground>
  );
};

export default ChatRoom;