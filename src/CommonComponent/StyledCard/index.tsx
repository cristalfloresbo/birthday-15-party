import { Card } from "@mui/joy";
import { styled } from "@mui/material";

interface StyledCardProps {
    children: React.ReactNode;
}

export default function StyledCard({ children }: StyledCardProps) {
    const StyledCard = styled(Card)({
        maxWidth: 600,
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    });

    return <StyledCard>{children}</StyledCard>;
}
