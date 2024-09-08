import {
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadGuestPhoto from "./UploadGuestPhoto";
import { addGuest, Guest } from "../services/guest.service";
import ContainedButton from "../CommonComponent/ContainedButton";
import style from "./GuestForm.module.css";
import { useNavigate } from "react-router-dom";

export default function GuestForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const validationSchema = yup.object({
        name: yup.string().trim().required("El nombre es requerido"),
        lastname: yup.string().trim().required("El apellido es requerido"),
        ci: yup.string().trim().required("La CI es requerida"),
        phone: yup
            .number()
            .required("El número de whatsapp es requerida")
            .min(0, "No se permite numeros negativos"),
        photo: yup.string().required("La foto es requerida"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            lastname: "",
            ci: "",
            phone: "",
            photo: "",
            scannedInvite: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAddGuest(values as Guest);
        },
    });

    const handleAddGuest = async (values: Guest) => {
        setLoading(true);
        addGuest(values)
            .then((guestId) => {
                setLoading(false);
                formik.resetForm();
                navigate(`/confirm-invite/generate-qr/${guestId}`);
            })
            .catch((error) => {
                alert(error);
                setLoading(false);
            });
    };

    return (
        <div className={style.divGuestForm}>
            <Card sx={{ maxWidth: 600 }}>
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <div className="bg-[#f5d0d9] min-h-screen flex flex-col items-center justify-center">
                            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                                <div className={style.divCardContent}>
                                    <h1 className={style.titleText}>
                                        Birthday 15 Party
                                    </h1>
                                    <h2>Nuevo Invitado</h2>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="name"
                                                name="name"
                                                label="Nombre"
                                                variant="outlined"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.name &&
                                                    Boolean(formik.errors.name)
                                                }
                                                helperText={
                                                    formik.touched.name &&
                                                    formik.errors.name
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="lastname"
                                                name="lastname"
                                                label="Apellido"
                                                variant="outlined"
                                                value={formik.values.lastname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.lastname &&
                                                    Boolean(
                                                        formik.errors.lastname
                                                    )
                                                }
                                                helperText={
                                                    formik.touched.lastname &&
                                                    formik.errors.lastname
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="ci"
                                                name="ci"
                                                label="Cédula de Identidad"
                                                variant="outlined"
                                                value={formik.values.ci}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.ci &&
                                                    Boolean(formik.errors.ci)
                                                }
                                                helperText={
                                                    formik.touched.ci &&
                                                    formik.errors.ci
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="phone"
                                                type="number"
                                                name="phone"
                                                label="Número de Whatsapp"
                                                variant="outlined"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.phone &&
                                                    Boolean(formik.errors.phone)
                                                }
                                                helperText={
                                                    formik.touched.phone &&
                                                    formik.errors.phone
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl>
                                                <UploadGuestPhoto
                                                    setPhotoUrl={(
                                                        photo: string
                                                    ) =>
                                                        formik.setFieldValue(
                                                            "photo",
                                                            photo
                                                        )
                                                    }
                                                />
                                                {formik.touched.photo && (
                                                    <FormHelperText
                                                        id="my-helper-text"
                                                        error
                                                    >
                                                        {formik.errors.photo}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions
                        sx={{
                            justifyContent: "flex-end",
                            marginRight: "2rem",
                            marginBottom: "2rem",
                        }}
                    >
                        <ContainedButton
                            type="submit"
                            variant="contained"
                            disabled={!formik.isValid || loading}
                        >
                            {loading ? (
                                <>
                                    Registrando...{" "}
                                    <CircularProgress
                                        size={24}
                                        className={style.titleText}
                                    />
                                </>
                            ) : (
                                <strong>Registrar</strong>
                            )}
                        </ContainedButton>
                    </CardActions>
                </form>
            </Card>
        </div>
    );
}
