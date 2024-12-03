import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [InputValue, setInputValue] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get(`http://ipinfo.io/${InputValue}/json`)
      .then((response) => {
        const country = response.data.country;
        const region = response.data.region;
        const timezone = response.data.timezone;

        setCountry(country);
        setRegion(region);
        setTimezone(timezone);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    console.log(InputValue);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center mt-[10em] p-[5em] rounded-3xl bg-slate-850 w-[40em]">
          <div className="flex flex-col mt-[2em]flex-col gap-[2em] ">
            <h1 className="font-normal justify-center text-white w-[10em] text-3xl font-[Tahoma]">
              IP TRACKER
            </h1>

            <input
              className="flex w-[30em] h-[3.5em] justify-center p-[1em] rounded-full bg-black border-[1px] text-white"
              type="text"
              value={InputValue}
              onChange={handleInputChange}
              placeholder="Enter an IP address"
            />
            <div className="flex justify-center">
              <button
                className="flex w-[20em] h-[3.5em] justify-center items-center font-extralight mt-[1em] bg-sky-800 text-white rounded-sm"
                onClick={getData}
              >
                GET USER DATA
              </button>
            </div>
            <div className="bg-black w-[30em] h-[10em] rounded-fu3xl font-extralight text-white border-[1px] border-white justify-center p-[1em]">
              {country && region ? (
                <p className="flex justify-center">
                  Country: {country} <br></br> Region: {region} <br></br>
                  {timezone}
                </p>
              ) : (
                <p>Enter an IP address</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
