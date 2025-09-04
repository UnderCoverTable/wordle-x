import { useAuth } from "@/context/AuthContext/AuthProvider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Menu, Portal, Text } from "@chakra-ui/react";
import type { User } from "@supabase/supabase-js";

export default function UserInfo() {
  const handleLogout = async () => {
    await fetch("/api/signOut", {
      method: "POST",
    });
  };

  const userData = useAuth();
  const userName = userData?.user
    ? userData?.user?.user_metadata?.display_name
    : "John Doe";

  return (
    <Flex as="nav" px={4} py={2} align="center" justify="space-between">
      {/* User Menu */}
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="ghost">
            <Flex align="center" gap={2}>
              <Text display={{ base: "none", md: "block" }}>{userName}</Text>
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
