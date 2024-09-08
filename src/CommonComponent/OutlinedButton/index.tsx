import { Button, ButtonProps, styled } from "@mui/material";
import { PropsWithChildren } from "react";

export default function OutlinedButton({
    children,
    ...props
}: PropsWithChildren<ButtonProps>) {
    const ColorButton = styled(Button)<ButtonProps>(() => ({
        borderColor: "#e91e63",
        color: "#e91e63",
        backgroundColor: "#ffff",
        "&:hover": {
            backgroundColor: "#ffff",
        },
        "&:focus": {
            outlineColor: "#e91e63",
        },
        "&:focus-visible": {
            outlineColor: "#e91e63",
        },
    }));
    return (
        <ColorButton {...props} variant="outlined">
            {children}
        </ColorButton>
    );
}
