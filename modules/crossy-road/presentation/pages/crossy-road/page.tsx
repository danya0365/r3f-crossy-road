import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./container/view"), {
  ssr: false,
});

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crossy Road",
};

const CrossyRoadIndexPage = async () => {
  return <DynamicComponentWithNoSSR />;
};

export default CrossyRoadIndexPage;
