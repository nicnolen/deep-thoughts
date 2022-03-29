//! Import Dependencies
import React from 'react';
import ThoughtList from '../components/ThoughtList';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

//! MAKE HOME COMPONENT
const Home = () => {
  //* use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS); // Apollo/client library provides a loading property to indicate the request isnt done and when it is finished, the information is stored in the data property
  //* if data exists, store it in the thoughts constraint. If data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.info(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title='Some Feed for Thought(s)...'
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
