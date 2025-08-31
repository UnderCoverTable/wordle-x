import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      colors: {
        correct: {
          light: { value: "#538d4e" },
          dark: { value: "#538d4e" },
        },
        maybe: {
          light: { value: "#b59f3b" },
          dark: { value: "#b59f3b" },
        },
        wrong: {
          light: { value: "#3a3a3c" },
          dark: { value: "#3a3a3c" },
        },
      },
    },
  },
});
