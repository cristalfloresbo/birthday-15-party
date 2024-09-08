import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import ContainedButton from "../../CommonComponent/ContainedButton";
import OutlinedButton from "../../CommonComponent/OutlinedButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { deleteOneGuest } from "../../services/guest.service";

interface IdentityCardProps {
    id: string | undefined;
    photo: string;
    name: string;
    lastname: string;
    ci?: string;
    phone?: string;
    scannedInvite: boolean;
    handleUpdateList: () => void;
}

export default function IdentityCard({
    id,
    photo,
    name,
    lastname,
    ci,
    phone,
    scannedInvite,
    handleUpdateList,
}: IdentityCardProps) {
    const [open, setOpen] = useState(false);
    ci = `${Math.floor(Math.random() * 900000000) + 100000000}`;
    phone = `${Math.floor(Math.random() * 900000000) + 100000000}`;

    const generarNombreAleatorio = (longitud: number) => {
        const caracteres =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let nombre = "";

        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            nombre += caracteres[indice];
        }

        return nombre;
    };

    name = generarNombreAleatorio(5);
    lastname = generarNombreAleatorio(5);

    const handleRemoveInvite = () => {
        if (id) {
            deleteOneGuest(id).then(() => {
                setOpen(false);
                handleUpdateList();
            });
        } else {
            handleUpdateList();
        }
    };

    return (
        <>
            <Card
                variant="outlined"
                orientation="horizontal"
                sx={{
                    "&:hover": {
                        boxShadow: "md",
                        borderColor: "neutral.outlinedHoverBorder",
                    },
                }}
            >
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img src={photo} loading="lazy" alt="" />
                </AspectRatio>
                <CardContent>
                    <Typography level="title-lg" id="card-description">
                        {`${name} ${lastname}`}
                    </Typography>

                    <Typography
                        level="body-sm"
                        aria-describedby="card-description"
                        mb={1}
                    >
                        <div>
                            <strong>CI:</strong>
                            {ci}
                        </div>
                        <div>
                            <strong>WhatsApp:</strong>
                            {phone}
                        </div>
                        <div>
                            <Chip
                                variant="solid"
                                color={scannedInvite ? "success" : "danger"}
                                size="sm"
                            >
                                {scannedInvite
                                    ? "Invitación escaneada"
                                    : "Invitación no escaneada"}
                            </Chip>
                        </div>
                    </Typography>
                </CardContent>
                <DeleteIcon onClick={() => setOpen(true)} />
            </Card>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`¿Quiere eliminar a ${name} ${lastname}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div>
                            Invitado: {name} {lastname}
                        </div>
                        <div>CI: {ci}</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ContainedButton onClick={handleRemoveInvite}>
                        Si
                    </ContainedButton>
                    <OutlinedButton onClick={() => setOpen(false)}>
                        No
                    </OutlinedButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
