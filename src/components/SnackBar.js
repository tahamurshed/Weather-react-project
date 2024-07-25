import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useToast } from "../contexts/ToastContext";
import { useTranslation } from "react-i18next";
export default function SnackBar({ locale }) {
  const { t, i18n } = useTranslation();
  const { message, openToast } = useToast();

  return (
    <div style={{ width: "100vw" }}>
      <Snackbar
        open={openToast}
        style={{
          position: locale == "ltr" ? "absolute" : "",
          right: "5%",
          bottom: "5%",
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
          style={{ width: "14%" }}
        >
          {t(message)}
        </Alert>
      </Snackbar>
    </div>
  );
}
