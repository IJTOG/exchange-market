import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Tabs, Card } from "antd";
import { pairs } from "utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectPairState } from "store/pairSlice";
import { fetch24hrsTicker } from "store/saga/pair";
import Head from "next/head";
import styles from "./styles.module.scss";
import { priceFormat } from "@/utils/formatNumber";

const CurrencyPair: React.FC<any> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pairState = useSelector(selectPairState);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const query = router.query;
    if (typeof query.currency_pair === "string") {
      setActive(query.currency_pair);
    }
  }, [router.query]);

  useEffect(() => {
    if (active) {
      dispatch(fetch24hrsTicker(active));
    }
  }, [active]);

  useEffect(
    () => () => {
      dispatch(fetch24hrsTicker(""));
    },
    []
  );

  const onTabChange = (key: string) => {
    router.replace({ pathname: `/markets/${key}` }, undefined, {
      shallow: true
    });
  };

  const headerFormat = (symbol: string) =>
    symbol.replace("_", "/").toUpperCase();

  const Tab = (label: string) => (
    <div className={styles.currencyLabel}>{label}</div>
  );

  return (
    <div className="container">
      <Head>
        <title>
          {pairState.symbol
            ? `${priceFormat(pairState.lastPrice)} ${headerFormat(
                pairState.symbol
              )}`
            : "Exchange Market"}
        </title>
      </Head>
      <Tabs
        type="card"
        tabPosition="left"
        onChange={onTabChange}
        activeKey={active}
        className={styles.currencyTabs}
      >
        {pairs.map((pair) => (
          <Tabs.TabPane tab={Tab(pair.label)} key={pair.key}>
            <Card>
              <h4>{pair.label}</h4>
              <h3 className={styles.currencyPrice}>
                {priceFormat(pairState.lastPrice)}
              </h3>
              <small>Volume: {pairState.volume}</small>
            </Card>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CurrencyPair;
