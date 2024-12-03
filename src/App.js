import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [InputValue, setInputValue] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get(`http://ipinfo.io/${InputValue}/json`)
      .then((response) => {
        const country = response.data.country;
        const region = response.data.region;

        setCountry(country);
        setRegion(region);
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
        <div className="flex justify-center mt-[10em] p-[5em] rounded-3xl bg-slate-700 w-[40em]">
          <div className="flex flex-col mt-[2em]flex-col gap-[2em] ">
            <h1 className="font-normal justify-center text-white w-[10em] ml-[3em] text-3xl font-[Tahoma]">
              IP ADRESS TRACKER
            </h1>

            <input
              className="flex w-[30em] h-[3.5em] justify-center p-[1em]"
              type="text"
              value={InputValue}
              onChange={handleInputChange}
              placeholder="Enter IP address"
            />
            <div className="flex justify-center">
              <button
                className="flex w-[20em] h-[3.5em] justify-center items-center font-extralight border-[0.2px] border-white mt-[1em] bg-slate-900 text-white rounded-sm"
                onClick={getData}
              >
                GET DATA
              </button>
            </div>
            <div className="bg-white w-[30em] h-[4em] rounded-sm font-extralight text-black justify-center p-[1em]">
              {country && region ? (
                <p className="flex justify-center">
                  Country: {country}, Region: {region}
                </p>
              ) : (
                <p>
                  Enter an IP address and click "GET DATA" to see the country
                  and region.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
