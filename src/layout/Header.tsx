import React, { ComponentProps } from "react";

type Props = {
  start?: React.ReactNode;
  middle?: React.ReactNode;
  end?: React.ReactNode;
};
const Header = ({
  start,
  middle,
  end,
  ...props
}: ComponentProps<"header"> & Props) => {
  return (
    <header {...props}>
      {start ?? <span></span>}
      {middle ?? <span></span>}
      {end ?? <span></span>}
    </header>
  );
};

export default Header;
