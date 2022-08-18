import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

const { Header, Content } = Layout;

const menuItems = [
  {
    key: "/markets",
    label: `Markets`
  }
];

const DefaultLayout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const [active, setActive] = useState<string[]>([]);

  const onNavigate = (value: any) => {
    if (value.key === "/markets") {
      router.push(`${value.key}/BTC_THB`);
    } else {
      router.push(`${value.key}`);
    }
  };

  useEffect(() => {
    const activeRoute = menuItems.find((menu) =>
      router.pathname.includes(menu?.key)
    );

    if (activeRoute?.key && activeRoute?.key !== "/") {
      setActive([activeRoute.key]);
    } else {
      setActive([]);
    }
  }, [router.pathname]);

  return (
    <Layout>
      <Header className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>Exchange Market</div>
        </Link>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={active}
          selectedKeys={active}
          items={menuItems}
          onClick={onNavigate}
        />
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content className="site-layout-background">
            <div className="main">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
