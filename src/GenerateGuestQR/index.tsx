import axios from "axios";
import {
    Button,
    ButtonProps,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    styled,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import style from "./GenerateGuestQR.module.css";
import { useParams } from "react-router-dom";
import CenteredContainer from "../CommonComponent/CenteredContainer";

export default function GenerateGuestQR() {
    const { id } = useParams();
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    const generateQRCode = useCallback(async () => {
        try {
            const urlVerification = `${
                import.meta.env.VITE_VERIFICATION_INVITE_URL
            }/${id}`;
            const response = await axios.get(
                `https://quickchart.io/qr?text=${encodeURIComponent(
                    urlVerification
                )}&ecLevel=H&size=200`
            );
            setQrCodeUrl(response.request.responseURL); // La URL de la imagen QR generada
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            generateQRCode();
        }
        return () => {
            setQrCodeUrl("");
        };
    }, [id, generateQRCode]);

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText("#e91e63"),
        backgroundColor: "#e91e63",
        "&:hover": {
            backgroundColor: "#e91e63",
        },
        "&: focus": {
            outlineColor: "#e91e63",
        },
        "&:focus-visible": {
            outlineColor: "#e91e63",
        },
    }));

    return (
        <CenteredContainer>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <Grid>
                        <Grid item xs={12}>
                            <h1 className={style.titleText}>
                                Birthday 15 Party
                            </h1>
                        </Grid>
                        <Grid item xs={12} className={style.textCenter}>
                            <h2>Tu entrada</h2>
                            {qrCodeUrl ? (
                                <img src={qrCodeUrl} alt="QR Code" />
                            ) : (
                                <CircularProgress
                                    size={24}
                                    className={style.titleText}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} className={style.textCenter}>
                            <a
                                href={qrCodeUrl}
                                download={`QRCodeBithday15Party.png`}
                            >
                                <ColorButton>
                                    <strong>Download QR Code</strong>
                                </ColorButton>
                            </a>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </CenteredContainer>
    );
}
