import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneGuest, Guest, updateGuest } from "../services/guest.service";

import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CardActions } from "@mui/material";
import CenteredContainer from "../CommonComponent/CenteredContainer";
import StyledCard from "../CommonComponent/StyledCard";
import ContainedButton from "../CommonComponent/ContainedButton";
import style from "./GuestVerification.module.css";

export default function GuestVerification() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const specificDateTime = new Date("2024-08-30T14:00:00");
    const [guest, setGuest] = useState<Guest>({
        name: "",
        lastname: "",
        ci: "",
        phone: "",
        photo: "",
        scannedInvite: false,
    });

    const fetchOneGuest = useCallback(async () => {
        setLoading(true);
        getOneGuest(id?.toString() || "")
            .then((data) => {
                setGuest(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchOneGuest();
        } else {
            setError("No se encontro el invitado");
        }
        return () => {
            setLoading(false);
            setError("");
            setGuest({
                name: "",
                lastname: "",
                ci: "",
                phone: "",
                photo: "",
                scannedInvite: false,
            });
        };
    }, [fetchOneGuest, id]);

    const validateInvite = () => {
        if (id && guest.scannedInvite === false) {
            updateGuest(id, { ...guest, scannedInvite: true })
                .then(() => {
                    console.log("Guest updated successfully");
                    fetchOneGuest();
                })
                .catch((error) => {
                    console.error("Error updating guest:", error);
                });
        }
    };

    const getDateInText = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return specificDateTime.toLocaleDateString("es-ES", options);
    };

    return (
        <CenteredContainer>
            <StyledCard>
                {loading ? (
                    <p className="text-center">Cargando...</p>
                ) : new Date() <= specificDateTime ? (
                    <>
                        <strong>El evento aun no ha comenzado</strong>
                        <p>
                            <strong>Fecha: </strong>
                            {getDateInText()}
                        </p>
                    </>
                ) : error !== "" ? (
                    <strong>Este invitado no esta existe en el sistema.</strong>
                ) : (
                    <>
                        <h2
                            className={`${style.textCenter} ${style.titleText}`}
                        >
                            Birthday 15 Party
                        </h2>
                        <Typography
                            level="title-lg"
                            className={style.textCenter}
                        >
                            Invitado
                        </Typography>
                        <CardOverflow>
                            <AspectRatio ratio="1">
                                <img src={guest.photo} loading="lazy" alt="" />
                            </AspectRatio>
                        </CardOverflow>
                        <CardContent>
                            <Typography level="title-lg">
                                {guest.name} {guest.lastname}
                            </Typography>
                            <Typography level="body-sm">
                                <strong>CI: </strong>
                                {guest.ci}
                            </Typography>
                            <Typography level="body-sm">
                                <strong>WhatsApp: </strong>
                                {guest.phone}
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{
                                justifyContent: "center",
                            }}
                        >
                            {Boolean(guest.scannedInvite) === false ? (
                                <ContainedButton
                                    type="submit"
                                    variant="contained"
                                    onClick={validateInvite}
                                >
                                    Marcar Invitacion
                                </ContainedButton>
                            ) : (
                                <Typography
                                    level="body-xs"
                                    textColor={"danger.400"}
                                >
                                    Esta invitacion ha sido marcada.
                                </Typography>
                            )}
                        </CardActions>
                    </>
                )}
            </StyledCard>
        </CenteredContainer>
    );
}
