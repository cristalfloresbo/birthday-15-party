import { Button, ButtonProps, styled } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ContainedButton({
    children,
    ...props
}: PropsWithChildren<ButtonProps>) {
    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText("#e91e63"),
        backgroundColor: "#e91e63",
        "&:hover": {
            backgroundColor: "#e91e63",
        },
        "&:focus": {
            outlineColor: "#e91e63",
        },
        "&:focus-visible": {
            outlineColor: "#e91e63",
        },
    }));
    return <ColorButton {...props}>{children}</ColorButton>;
}
