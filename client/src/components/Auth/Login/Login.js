import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  Select,
  Input,
  FormControl,
  MenuItem,
  Button,
} from "@material-ui/core";
import { LockOpen } from "@material-ui/icons";
import axios from "../../../api/axios";

const Login = (props) => {
  const [countryInput, setCountryInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("+");

  useEffect(() => {
    axios
      .get("/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const countrySelectHandler = async (e) => {
    const [code, name, flag] = e.target.value.split("_");
    await setCountryInput(name);
    await setCountryCode(code);
    document.querySelector('.MuiSelect-select.MuiSelect-selectMenu').innerHTML = `<span><img class="login__formcontrol__image__icon" src=${flag} alt=${name} height="16" width="20">${name}</span>`
  };

  return (
    <div className="login">
      <div className="login__body">
        <h2>Sign Up Form</h2>
        <form className="login__form">
          <FormControl className="login__formControl">
            <Select
              labelId="country_label"
              value={countryInput}
              id="country_select"
              onChange={countrySelectHandler}
              displayEmpty
              className="login__formcontrol__select"
            >
              <MenuItem value="">
                <em>Select a Country</em>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem
                  key={country._id}
                  name={country.name}
                  flag={country.flag}
                  value={
                    country.dial_code + "_" + country.name + "_" + country.flag
                  }
                  className="label__formControl__option"
                >
                  <span>
                    <img
                      className="login__formcontrol__image__icon"
                      src={country.flag}
                      alt={country.name}
                      height="16"
                      width="20"
                    />
                    {country.name}
                  </span>
                  <span>{country.dial_code}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="login__formControl__group">
            <Input
              className="login__formControl small"
              value={countryCode}
              disabled
            />
            <Input className="login__formControl " placeholder="Phone Number" />
          </div>
          <Input className="login__formControl " placeholder="Display Name" />
          <Input className="login__formControl " placeholder="Password" />
          <Input
            className="login__formControl "
            placeholder="Confirm Password"
          />
          <div className="login__form__buttonGroup">
            <Button
              variant="contained"
              color="primary"
              className="login__form__button"
              startIcon={<LockOpen />}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="login__form__button__link"
            >
              Login Instead
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
