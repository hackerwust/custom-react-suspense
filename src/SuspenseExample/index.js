import React from 'react';
import { createFetcher } from '../Suspense/context';


const fetchData = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve('this is the content');
    }, 5000);
  });
};

const fetchDataFetcher = createFetcher(fetchData);

export function Content() {
    return (
        <React.Fragment>
            <div>{fetchDataFetcher()}</div>
        </React.Fragment>
    );
}