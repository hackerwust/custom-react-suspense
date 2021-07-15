import React from 'react';
import { createFetcher } from '../Suspense/context';


const fetchData = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve('display the real content: hello world');
    }, 3000);
  });
};

const fetchDataFetcher = createFetcher(fetchData);

export function Example() {
    const containerStyle = {
      height: '100px',
      lineHeight: '100px',
      fontSize: '20px',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
      color: 'red'
    }
    return (
        <React.Fragment>
            <div style={containerStyle}>
              {fetchDataFetcher()}
            </div>
        </React.Fragment>
    );
}