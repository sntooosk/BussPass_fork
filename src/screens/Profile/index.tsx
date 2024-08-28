import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ProfileImage from "../components/ProfileImage";
import { getAuth, User } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "src/routes/types";

export default function Profile() {
  const auth = getAuth();
  const { signOut } = useAuth();
  const user: User | null = auth.currentUser;

  const { navigate } = useNavigation<propsStack>();

  const [photo, setPhoto] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  const formatBirthdateInput = (inputValue: string): string => {
    return inputValue
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})\d+?$/, "$1");
  };

  const formatNumberInput = (inputValue: string): string => {
    const cleaned = inputValue.replace(/\D/g, "").slice(0, 11);
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    return match
      ? `(${match[1] || ""})${match[2] || ""}-${match[3] || ""}`
      : inputValue;
  };

  const insertMaskInCpf = (cpf: string): string => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const userLogout = () => {
    signOut();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const userRef = doc(collection(db, "users"), user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username || "");
            setName(userData.name || "");
            setLastName(userData.lastName || "");
            setDob(userData.dob || "");
            setPhoto(userData.photo || null);
            setCpf(userData.cpf || "");
            setNumber(userData.number || "");
          }
        }
      } catch (error) {
        Alert.alert("Erro", "Houve um erro ao carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, [user]);

  const handleChoosePhoto = async () => {
    try {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!granted) {
        Alert.alert("Permissão negada");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const supportedFormats = ["jpeg", "png", "jpg"];
        const fileExtension =
          result.assets[0].uri.split(".").pop()?.toLowerCase() || "";

        if (supportedFormats.includes(fileExtension)) {
          setPhoto(result.assets[0].uri);
        } else {
          Alert.alert("Formato de imagem inválido");
        }
      }
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao escolher a imagem.");
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado");
        setLoading(false);
        return;
      }

      if (!username || !name || !lastName || !dob || !number || !cpf) {
        Alert.alert("Erro", "Preencha todos os campos");
        setLoading(false);
        return;
      }

      if (!photo) {
        Alert.alert("Erro", "Adicione uma foto");
        setLoading(false);
        return;
      }

      let photoUrl = photo;
      const storage = getStorage();

      if (!photo.startsWith("gs://busspass-21a6c.appspot.com")) {
        const storageRef = ref(storage, `profile_photos/${user.uid}`);
        const response = await fetch(photo);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        photoUrl = await getDownloadURL(storageRef);
      }

      const userRef = doc(collection(db, "users"), user.uid);
      await setDoc(
        userRef,
        {
          username,
          name,
          lastName,
          dob,
          number,
          cpf,
          photo: photoUrl,
        },
        { merge: true }
      );

      Alert.alert("Sucesso", "Dados atualizados com sucesso");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Houve um erro ao salvar os dados. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (


    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
      <View style={styles.header}>
                <Pressable
                    onPress={() => navigate("Home")}>
                    <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
                </Pressable>
            </View>
        <Text style={styles.formTitle}>Cadastrar Dados</Text>
        <ProfileImage photo={photo} onPress={handleChoosePhoto} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextInput
            style={styles.formInput}
            placeholder="Nome de usuário"
            placeholderTextColor="#fff" 
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu nome"
            placeholderTextColor="#fff" 
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu sobrenome"
            placeholderTextColor="#fff" 
            onChangeText={setLastName}
            value={lastName}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu CPF"
            placeholderTextColor="#fff" 
            keyboardType="numeric"
            value={cpf}
            onChangeText={(text) => setCpf(insertMaskInCpf(text))}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite sua data de nascimento"
            placeholderTextColor="#fff" 
            onChangeText={(text) => setDob(formatBirthdateInput(text))}
            value={dob}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu número de celular"
            placeholderTextColor="#fff"
            onChangeText={(text) => setNumber(formatNumberInput(text))}
            value={number}
            keyboardType="phone-pad"
          />
          <Pressable
            style={styles.formButton}
            onPress={handleSaveProfile}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.textButton}>Cadastrar Dados</Text>
            )}
          </Pressable>
          <Pressable
            style={styles.logoutButton}
            onPress={userLogout}
          >
            <Text style={styles.textButton}>Logout</Text>
          </Pressable>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
