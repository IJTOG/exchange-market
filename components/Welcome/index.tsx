import type { NextPage } from "next";
import { Button, Space } from "antd";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const Welcome: NextPage = () => {
  const router = useRouter();

  const onClickMarket = () => {
    router.push("/markets");
  };

  return (
    <div className="container">
      <div className={styles.welcome}>
        <h2>
          Welcome to Exchange Market Example using{" "}
          <a href="https://nextjs.org">Next.js!</a>
        </h2>

        <Space direction="vertical">
          <Button type="primary" onClick={onClickMarket}>
            Go to Market
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Welcome;
