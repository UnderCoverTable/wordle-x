"use client";

import { ChakraProvider, Theme } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { system } from "@/components/ui/theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <Theme>
        <ColorModeProvider {...props} forcedTheme="dark" />
      </Theme>
    </ChakraProvider>
  );
}
