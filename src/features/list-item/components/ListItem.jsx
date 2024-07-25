import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Tag,
} from "@chakra-ui/react";

const ListItem = () => {
  return (
    <Card
      sx={{
        borderRadius: "3xl",
      }}
    >
      <CardBody
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        <Tag size={"sm"} variant="solid" colorScheme="yellow">
          Important
        </Tag>
        <Heading size="md">Design UI</Heading>
        <Text>
          {`React is a JavaScript library for building user interfaces. It allows
          developers to create reusable UI components and manage the state of
          these components in a declarative way.`.slice(0, 50)}
          ...
        </Text>
      </CardBody>
    </Card>
  );
};

export default ListItem;
