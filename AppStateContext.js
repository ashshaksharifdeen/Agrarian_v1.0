import React, { createContext, useState } from "react";
import { colors } from "./colors";

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [ActiveScreen, SetActiveScreen] = useState(1);
  const [theme, SetTheme] = useState("dark");
  const [IsSignup, SetIsSignup] = useState(false);
  const [userId, setUserId] = useState("")
  // const [theme, SetTheme] = useState("light");

  const themeColors = theme === "dark" ? colors.dark[0] : colors.light[0];

  return (
    <AppStateContext.Provider
      value={{
        ActiveScreen,
        SetActiveScreen,
        theme,
        SetTheme,
        IsSignup,
        SetIsSignup,
        colors: themeColors,
        userId, setUserId // Pass the theme-specific colors to the context value
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
