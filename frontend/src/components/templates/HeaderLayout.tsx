import { ReactNode, memo } from "react";

import Header from "../organisms/Header";

type Props = {
  children: ReactNode;
};

const HeaderLayout = memo(({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
});

export default HeaderLayout;
