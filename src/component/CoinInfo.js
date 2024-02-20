import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { getHistoricalChart } from "../config/api";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, createTheme } from "@mui/material";
import "./CoinInfo.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricChart = async () => {
    const { data } = await axios.get(
      getHistoricalChart(coin.id, days, currency)
    );

    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricChart();
  }, [currency, days]); // only run when the currency or days change
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },

      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="chartcontainer">
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date((0));
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12} :${date.getMinutes()} PM`
                      : `${date.getHours()}: ${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (past ${days} Days)in ${currency}`,
                  },
                ],
              }}
            />

            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  onClick={() => setDays(day.value)}
                  Selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
