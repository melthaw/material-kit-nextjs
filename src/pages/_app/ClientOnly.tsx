import React, { useEffect, useState } from 'react';

export const ClientOnly = ({ children, ...delegated }: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // server-side rendering
  if (!hasMounted) return null;

  // client-side rendering
  return <React.Fragment {...delegated}>{children}</React.Fragment>;
};
