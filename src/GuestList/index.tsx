import { CircularProgress, Grid } from "@mui/material";
import IdentityCard from "./IdentityCard";
import {
    fetchNextPage,
    fetchNumberTotalGuests,
    getAllGuests,
    getGuests,
    Guest,
} from "../services/guest.service";
import { useCallback, useEffect, useState } from "react";
import style from "./GuestList.module.css";
import ContainedButton from "../CommonComponent/ContainedButton";
import { useNavigate } from "react-router-dom";

export default function GuestList() {
    const navigate = useNavigate();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [numberTotalGuests, setNumberTotalGuests] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchGuests = useCallback(async () => {
        setLoading(true);
        await getGuests()
            .then((data) => {
                setLoading(false);
                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                    setGuests(data);
                }
            })
            .catch((error) => {
                alert("Recargue la pagina o vuelva a intentar mas tarde.");
                console.log(error);
            });
    }, [setGuests]);

    const loadMore = async () => {
        if (hasMore && !loading) {
            setLoading(true);
            await fetchNextPage().then((data) => {
                setLoading(false);
                if (data.length > 0) {
                    setGuests([...guests, ...data]);
                } else {
                    setHasMore(false);
                }
            });
        }
    };

    const fetchAllGuests = useCallback(async () => {
        setLoading(true);
        await getAllGuests().then((data) => {
            setLoading(false);
            setHasMore(false);
            setGuests(data);
        });
    }, [setGuests]);

    const getNumberTotalGuests = useCallback(async () => {
        await fetchNumberTotalGuests().then((data) => {
            setNumberTotalGuests(data);
        });
    }, [setNumberTotalGuests]);

    useEffect(() => {
        fetchGuests();
        getNumberTotalGuests();
        return () => {
            setGuests([]);
            setHasMore(true);
            setNumberTotalGuests(0);
            setLoading(false);
        };
    }, [fetchGuests, getNumberTotalGuests]);

    return (
        <div className={style.divGuestList}>
            <h1 className={style.titleText}>Birthday 15 Party</h1>
            <h2 className={style.titleTextBlack}>Lista de Invitados</h2>
            {guests.length > 0 && (
                <h3 style={{ color: "black" }}>
                    Total Invitados: {numberTotalGuests}
                </h3>
            )}
            {loading && (
                <div className={style.titleTextGray}>
                    Cargando lista de invitados...
                </div>
            )}
            {!loading && (
                <ContainedButton
                    style={{ marginBottom: "0.5rem" }}
                    onClick={() => navigate("/confirm-invite/")}
                >
                    Agregar invitado
                </ContainedButton>
            )}
            <Grid container spacing={2}>
                {guests.map((guest) => (
                    <Grid
                        item
                        xl={3}
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}
                        key={guest.id}
                    >
                        <IdentityCard
                            id={guest.id}
                            photo={guest.photo}
                            name={guest.name}
                            lastname={guest.lastname}
                            ci={guest.ci}
                            phone={guest.phone}
                            scannedInvite={guest.scannedInvite}
                            handleUpdateList={getAllGuests}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid
                item
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                }}
            >
                {guests.length > 0 && hasMore && !loading && (
                    <>
                        <ContainedButton
                            onClick={fetchAllGuests}
                            style={{ marginRight: "0.5rem" }}
                            disabled={loading}
                            variant="contained"
                        >
                            {loading ? (
                                <>
                                    Cargando...{" "}
                                    <CircularProgress
                                        size={24}
                                        className={style.titleText}
                                    />
                                </>
                            ) : (
                                <strong>Ver todos los invitados</strong>
                            )}
                        </ContainedButton>
                        <ContainedButton
                            onClick={loadMore}
                            disabled={loading}
                            variant="contained"
                        >
                            {loading ? (
                                <>
                                    Cargando...{" "}
                                    <CircularProgress
                                        size={24}
                                        className={style.titleText}
                                    />
                                </>
                            ) : (
                                <strong>Ver los próximos 10 invitados</strong>
                            )}
                        </ContainedButton>
                    </>
                )}
            </Grid>
            {!hasMore && <p>No hay mas invitados para mostrar.</p>}
        </div>
    );
}
