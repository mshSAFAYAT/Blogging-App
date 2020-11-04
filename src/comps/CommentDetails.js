import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";

const CommentDetails = ({ content }) => {
  return (
    <Card>
      <Text>{content.author}</Text>
      <Text>{content.comment}</Text>
    </Card>
  );
};

export default CommentDetails;