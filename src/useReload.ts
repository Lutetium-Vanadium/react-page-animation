import { useState } from "react";

// Allows to trigger force reload in functional components
const useReload = () => {
  const [_, setReload] = useState(false);

  return () => {
    setReload((reload) => !reload);
  };
};

export default useReload;
