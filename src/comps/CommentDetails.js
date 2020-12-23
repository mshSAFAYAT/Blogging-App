import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";

const CommentDetails = ({ content }) => {
  return (
    <Card>
      <Text>{content.sender}</Text>
      <Text>{content.comments}</Text>
    </Card>
  );
};

export default CommentDetails;