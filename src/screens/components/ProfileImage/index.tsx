import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

interface ProfileImageProps {
  photo: string | null;
  onPress: () => void;
}

export default function ProfileImage({ photo, onPress }: ProfileImageProps) {
  return (
    <TouchableOpacity style={styles.profileImageContainer} onPress={onPress}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.profileImage} />
      ) : (
        <MaterialIcons name="person" size={40} color="gray" />
      )}
    </TouchableOpacity>
  );
}
