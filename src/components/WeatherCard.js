//material components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import SelectCities from "./SelectCities";
import { useEffect, useState } from "react";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";
import SnackBar from "./SnackBar";
import { useLoader } from "../contexts/LoaderContext";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

export default function WeatherCard() {
  const { t, i18n } = useTranslation();
  moment.locale("ar");
  const { setMessage, setOpenToast, openToast } = useToast();
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temp: null,
    minTemp: null,
    maxTemp: null,
    description: "",
    icon: null,
  });
  const { setOpenLoader } = useLoader();
  const [dateAndTime, setDataAndTime] = useState("");
  const [locales, setLocales] = useState("ar");
  const direction = locales == "ar" ? "rtl" : "ltr";
  useEffect(() => {
    setDataAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    i18n.changeLanguage("ar");
  }, []);
  function handleTranslateBtn() {
    if (locales == "ar") {
      i18n.changeLanguage("en");
      setLocales("en");
      moment.locale("en");
    } else {
      i18n.changeLanguage("ar");
      setLocales("ar");
      moment.locale("ar");
    }
    setDataAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  function handelCityChange(e) {
    setCity(e);
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${e}&appid=f3b737260d578514bb4c57bc28e96e33`
      )
      .then((response) => {
        let temp = Math.round(response.data.main.temp - 273.15);
        let max = Math.round(response.data.main.temp_max - 273.15);
        let min = Math.round(response.data.main.temp_min - 273.15);
        let desc = response.data.weather[0].description;
        let icon = response.data.weather[0].icon;
        setWeatherData({
          temp: temp,
          minTemp: min,
          maxTemp: max,
          description: desc,
          icon: icon,
        });
        setOpenToast(false);
      })
      .catch((error) => {
        setTimeout(() => {
          setOpenToast(false);
        }, 2000);
        setOpenToast(true);
        setMessage("The city does not exist");
      })
      .finally(() => {
        setOpenLoader(false);
      });
    setOpenLoader(true);
  }
  return (
    <>
      <Container maxWidth="sm" style={{}}>
        {/* container */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            direction: direction,
          }}
        >
          {/* card */}
          <div
            style={{
              backgroundColor: " rgba(28, 86, 205, 0.2)",
              direction: direction,
              width: "100%",
              borderRadius: "15px",
              boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              padding: "10px",
            }}
          >
            {/*content*/}
            <div>
              {/* city and date */}
              <div
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Typography
                  // variant={}
                  component="h2"
                  style={{ marginRight: "10px", width: "50%", fontSize: "4vw" }}
                >
                  {t(city ?? "choos your city")}
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ marginRight: "15px", fontWeight: "400" }}
                >
                  {dateAndTime}
                </Typography>
              </div>

              {/* ==city and date== */}
              <hr />
              {/* section two hot details and icon */}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {/* hot degree and hot detail */}
                <div style={{ color: "white" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Typography
                      variant="h1"
                      component="h2"
                      style={{
                        marginRight: "15px",
                        fontWeight: "400",
                        marginTop: "20px",
                      }}
                    >
                      {weatherData.temp ?? 0}
                    </Typography>
                    {/* weather icon */}
                    {weatherData.icon && (
                      <img
                        src={`http://openweathermap.org/img/w/${weatherData.icon}.png`}
                        style={{ width: "130px" }}
                        alt="weather status"
                      />
                    )}
                    {/* ==weather icon== */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      style={{ marginLeft: "20px", fontWeight: "400" }}
                    >
                      {t(weatherData.description)}
                    </Typography>
                  </div>

                  {/* ==hot degree and hot detail== */}

                  {/* min and max degree */}
                  {weatherData.temp && (
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ marginRight: "15px", fontWeight: "400" }}
                      >
                        {t("min")}:{weatherData.minTemp}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ marginRight: "15px", fontWeight: "400" }}
                      >
                        |
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ marginRight: "15px", fontWeight: "400" }}
                      >
                        {t("max")}:{weatherData.maxTemp}
                      </Typography>
                    </div>
                  )}
                  {/* ==min and max degree== */}
                </div>

                {/* cloud icon */}
                <div>
                  <CloudIcon style={{ color: "white", fontSize: "200px" }} />
                </div>
                {/* ==cloud icon== */}
              </div>
              {/* ==section two hot details and icon== */}
            </div>
            {/*== content== */}
          </div>
          {/* ==card== */}
          {/* translate button */}
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              variant="text"
              style={{ color: "white" }}
              onClick={handleTranslateBtn}
            >
              {locales == "ar" ? "إنجليزي" : "Arabic"}
            </Button>
          </div>
          {/*== translate button ==*/}

          {/* countary select */}
          <SelectCities handelCityChange={handelCityChange} />
          <SnackBar locale={direction} />
        </div>

        {/* ==container== */}
      </Container>
    </>
  );
}
