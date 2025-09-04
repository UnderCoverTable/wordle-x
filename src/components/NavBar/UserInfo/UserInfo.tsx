import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Menu, Portal, Text } from "@chakra-ui/react";

export default function UserInfo() {
  const handleLogout = async () => {
    await fetch("/api/signOut", {
      method: "POST",
    });
  };
  return (
    <Flex as="nav" px={4} py={2} align="center" justify="space-between">
      {/* User Menu */}
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="ghost">
            <Flex align="center" gap={2}>
              <Text display={{ base: "none", md: "block" }}>John Doe</Text>
            </Flex>
          </Button>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content color="black" shadow="lg" p={2} rounded="md">
              <Menu.Item value="profile">Profile</Menu.Item>

              {/* Logout Button */}
              <Menu.Item value="logout">
                <Button
                  colorScheme="red"
                  size="sm"
                  width="100%"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
}
