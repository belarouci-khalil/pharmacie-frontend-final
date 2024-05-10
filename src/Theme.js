import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material";
export const tokens = (mode )=>({
    ...(mode==='dark'
    ? {
        grey: {
            100: "#2D4A53",
            200: "#c2c2c2",
            300: "#a3a3a3",
            400: "#9BA1C1",
            500: "#666666",
            600: "#525252",
            700: "#3d3d3d",
            800: "#292929",
            900: "#141414",

        },

        primary: {
            100: "#45624E",
            200: "#0D1F23",
            300: "#727681",
            400: "#434957",
            500: "#141b2d",
            600: "#101624",
            700: "#0c101b",
            800: "#080b12",
            900: "#040509",
        },
        greenAccent: {
            100: "#6D8777",
            200: "#b7ebde",
            300: "#94e2cd",
            400: "#70d8bd",
            500: "#4cceac",
            600: "#BEC3DF",
            700: "#2e7c67",
            800: "#1e5245",
            900: "#0f2922",
        },
        redAccent: {
            100: "#C7CBE3",
            200: "#7BE495",
            300: "#ffffff",
            400: "#e2726e",
            500: "#db4f4a",
            600: "#af3f3b",
            700: "#832f2c",
            800: "#58201e",
            900: "#2c100f",
        },
        BleuAccent: {
            100: "#ADAAE2",
            200: "#c3c6fd",
            300: "#ADAAE2",
            400: "#B5BADA",
            500: "#6870fa",
            600: "#535ac8",
            700: "#3e4396",
            800: "#2a2d64",
            900: "#151632",
        },
    } : {
        grey: {
            100: "#9BA986",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#666666",
            600: "#858585",
            700: "#a3a3a3",
            800: "#c2c2c2",
            900: "#e0e0e0",
        },
        primary: {
            100: "#F3F3EA",
            200: "#080b12",
            300: "#0c101b",
            400: "#101624",
            500: "#141b2d",
            600: "#434957",
            700: "#727681",
            800: "#a1a4ab",
            900: "#d0d1d5",
        },
        greenAccent: {
            100: "#9BA986",
            200: "#1e5245",
            300: "#2e7c67",
            400: "#3da58a",
            500: "#4cceac",
            600: "#70d8bd",
            700: "#94e2cd",
            800: "#b7ebde",
            900: "#dbf5ee",
        },
        redAccent: {
           100: "#8A212B",
           200: "#58201e",
           300: "#832f2c",
           400: "#af3f3b",
           500: "#db4f4a",
           600: "#e2726e",
           700: "#e99592",
           800: "#f1b9b7",
           900: "#f8dcdb",
        },
        BleuAccent: {
            100: "#8A212B",
            200: "#2a2d64",
            300: "#3e4396",
            400: "#535ac8",
            500: "#6870fa",
            600: "#868dfb",
            700: "#a4a9fc",
            800: "#c3c6fd",
            900: "#e1e2fe",
             },
            }
        ) 
    }
)
// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.BleuAccent[200],
                    },
                    secondary: {
                        main: "#F3F3EA",
                    },
                    neutral: {
                        dark: "#C0CFB2",
                        main: "##C0CFB2",
                        light: "#C0CFB2",
                    },
                    background: {
                        default: "#0D1F23",
                    },
                }
                : {
                    primary: {
                        main: "# 9BA986",
                    },
                    secondary: {
                        main: "#F3F3EA",
                    },
                    neutral: {
                        dark: "#DDDFD1",
                        main: "#DDDFD1",
                        light: "#DDDFD1",
                    },
                    background: {
                        default: "#EDEAE5",
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    // Create the theme outside of the useMode hook
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};
