import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Market: React.FC<any> = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/markets/BTC_THB`);
  }, []);

  return <></>;
};

export default Market;
