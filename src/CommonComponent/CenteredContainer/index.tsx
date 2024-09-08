import { Container, styled } from "@mui/material";

interface CenteredContainerProps {
    children: React.ReactNode;
}

export default function CenteredContainer({
    children,
}: CenteredContainerProps) {
    const CenteredContainer = styled(Container)({
        position: "fixed",
        inset: 0,
        width: "fit-content",
        height: "fit-content",
        margin: "auto",
    });
    return <CenteredContainer>{children}</CenteredContainer>;
}
