import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import uuid4 from "uuid4";
import { useLoader } from "../contexts/LoaderContext";

export default function SelectCities({ handelCityChange }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const { setOpenLoader } = useLoader();
  const [countryState, setCountryState] = useState("");
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("https://countriesnow.space/api/v0.1/countries", {
        cancelToken: source.token,
      })
      .then((response) => {
        let data = response.data.data;
        let countriesList = [];
        for (let i = 0; i < 227; i++) {
          countriesList.push(data[i].country);
        }
        setCountries(countriesList);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      source.cancel();
    };
  }, []);
  function handleCountryChange(e) {
    setCountryState((con) => {
      return e.target.value;
    });
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country: e.target.value,
      })
      .then((response) => {
        let citiesList = response.data.data;
        console.log(citiesList);

        setCities((c) => {
          return citiesList;
        });
        console.log(cities);
      })
      .finally(() => {
        setOpenLoader(false);
      });
    setOpenLoader(true);
  }

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, width: 300, border: "solid 1px white" }}>
          <InputLabel
            id="demo-multiple-name-label"
            style={{ color: "white", borderColor: "white" }}
          >
            Country
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            onChange={handleCountryChange}
            style={{ color: "white" }}
          >
            {/* {countriesList} */}
            {countries.map((country) => (
              <MenuItem key={uuid4} value={country}>
                {country}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 300, border: "solid 1px white" }}>
          <InputLabel
            id="demo-multiple-name-label"
            style={{ color: "white", borderColor: "white" }}
          >
            City
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            onChange={(e) => {
              handelCityChange(e.target.value);
            }}
            style={{ color: "white" }}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
