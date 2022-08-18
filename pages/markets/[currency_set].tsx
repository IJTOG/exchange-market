import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Tabs, Card } from "antd";
import { pairs } from "utils/constants";

const Market: React.FC<any> = () => {
  const router = useRouter();
  const [active, setActive] = useState<string>("");

  const onTabChange = (key: string) => {
    router.replace({ pathname: `/markets/${key}` }, undefined, {
      shallow: true
    });
  };

  useEffect(() => {
    const query = router.query;
    if (typeof query.currency_set === "string") {
      setActive(query.currency_set);
    }
  }, [router.query]);

  return (
    <div className="container">
      <Tabs
        type="card"
        tabPosition="left"
        onChange={onTabChange}
        activeKey={active}
        style={{ marginTop: "24px" }}
      >
        {pairs.map((pair) => (
          <Tabs.TabPane
            tab={
              <div style={{ width: "100px", textAlign: "center" }}>
                {pair.label}
              </div>
            }
            key={pair.key}
          >
            <Card>
              <h4>{pair.label}</h4>
              <div>33.45</div>
              <small>Volume: 414,172.32</small>
            </Card>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Market;
