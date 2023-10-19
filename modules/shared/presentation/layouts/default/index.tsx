import { classNames } from "@/modules/shared/domain/helper/tailwind";
import { PropsWithChildren } from "react";

export interface BottomTabLayoutProps {}

const DefaultLayout = ({
  children,
}: PropsWithChildren<BottomTabLayoutProps>) => {
  return (
    <>
      <div className="flex h-screen">
        <div
          className={classNames(
            "relative",
            "flex-1 justify-between flex flex-col h-full w-full bg-green-100 dark:bg-green-900"
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
