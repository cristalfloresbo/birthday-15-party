import ErrorIcon from "@mui/icons-material/Error";
import CenteredContainer from "../CommonComponent/CenteredContainer";
import StyledCard from "../CommonComponent/StyledCard";
import style from "./NotFound.module.css"

export default function NotFound() {
    return (
        <CenteredContainer>
            <StyledCard>
                <h1 className={style.styledCardTitle}>
                    <span>4</span>
                    <ErrorIcon fontSize="large" />
                    <span>4</span>
                </h1>
                <h2 className={style.styledCardSubtitle}>Oops! Estas perdido.</h2>
                <strong className={style.styledCardText}>
                    La pagina que estas buscando no fue encontrado.
                </strong>
            </StyledCard>
        </CenteredContainer>
    );
}
