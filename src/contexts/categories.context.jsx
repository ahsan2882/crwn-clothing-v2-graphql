import { createContext, useEffect, useState } from "react";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
// import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const COLLECTIONS = gql`
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const { loading, error, data } = useQuery(COLLECTIONS);
  console.log({ loading, error, data });

  useEffect(() => {
    // const getCategoriesMap = async () => {
    //   const categoryMap = await getCategoriesAndDocuments();
    //   setCategoriesMap(categoryMap);
    // };

    // getCategoriesMap();
    if (data) {
      const { collections } = data;
      const collectionsMap = collections.reduce((acc, collection) => {
        const { title, items } = collection;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {});
      setCategoriesMap(collectionsMap);
    }
  }, [data]);

  const value = { categoriesMap, loading };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
