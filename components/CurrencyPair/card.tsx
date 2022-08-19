import { priceFormat } from "@/utils/formatNumber";
import { Card } from "antd";
import styles from "./styles.module.scss";

const CurrencyCard = ({
  symbol,
  volume,
  lastPrice
}: {
  symbol: string;
  volume: string;
  lastPrice: string;
}) => (
  <Card className={styles.currencyCard}>
    <h4>{symbol}</h4>
    <h2 className={styles.currencyPrice}>{priceFormat(Number(lastPrice))}</h2>
    <span>Volume: {volume}</span>
  </Card>
);

export default CurrencyCard;
