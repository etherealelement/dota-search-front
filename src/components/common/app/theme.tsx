import {createTheme} from "@mui/material/styles";

export const darkTheme = createTheme({
        components: {
            MuiFormGroup: {
                styleOverrides: {
                    root: {
                        flexWrap: "nowrap"
                    }
                }
            }
        },
        palette: {
            mode: 'dark',
        },
    },
);