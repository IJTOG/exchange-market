import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { pairs } from "utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectPairState } from "store/pairSlice";
import { fetch24hrsTicker } from "store/saga/pair";
import Head from "next/head";
import styles from "./styles.module.scss";
import { priceFormat } from "@/utils/formatNumber";
import CurrencyCard from "./card";
import { TabsPosition } from "antd/lib/tabs";

const CurrencyPair: React.FC<any> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pairState = useSelector(selectPairState);
  const [active, setActive] = useState<string>("");
  const [position, setPosition] = useState<TabsPosition>("left");

  const handleResize = () => {
    if (window.innerWidth <= 700 && position === "left") {
      setPosition("top");
    } else if (window.innerWidth > 700 && position === "top") {
      setPosition("left");
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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
        {pairState.symbol && (
          <title>{`${priceFormat(Number(pairState.lastPrice))} ${headerFormat(
            pairState.symbol
          )}`}</title>
        )}
      </Head>

      <Tabs
        type="card"
        tabPosition={position}
        onChange={onTabChange}
        activeKey={active}
        className={styles.currencyTabs}
      >
        {pairs.map((pair) => (
          <Tabs.TabPane tab={Tab(pair.label)} key={pair.key}>
            <div className={styles.currencyCardContainer}>
              <CurrencyCard
                symbol={pair.label}
                lastPrice={pairState.lastPrice}
                volume={pairState.volume}
              />
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CurrencyPair;
