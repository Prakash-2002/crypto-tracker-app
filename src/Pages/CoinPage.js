import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { getSingleCoin } from "../config/api";
import "./CoinPage.css";
import CoinInfo from "../component/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";
import { numberWithCommas } from "../component/Carousel";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoins] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(getSingleCoin(id));

    setCoins(data);
  };
  console.log(coin);

  useEffect(() => {
    fetchCoins();
  }, []);
  const description = coin?.description.en.split(". ")[0];

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="container">
      <div className="sidebar">
        {/* Chart Info*/}
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="heading">
          {coin?.name}
        </Typography>
        <Typography className="description">
          {typeof description === "string" ? parse(description) : null}
        </Typography>

        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              {` M`}
            </Typography>
          </span>
        </div>
      </div>
      <div  className="chart-container">
   <CoinInfo coin={coin} />
</div>
 
  

      
    </div>
  );
};

export default CoinPage;
