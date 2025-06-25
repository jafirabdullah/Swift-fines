import React, { createContext, useState } from 'react';

export const FineContext = createContext();

export const FineProvider = ({ children }) => {
  const [fineDetails, setFineDetails] = useState(null);

  return (
    <FineContext.Provider value={{ fineDetails, setFineDetails }}>
      {children}
    </FineContext.Provider>
  );
};
