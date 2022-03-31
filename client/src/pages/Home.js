//! Import Dependencies
import React from 'react';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

import Auth from '../utils/auth';

//! MAKE HOME COMPONENT
const Home = () => {
  //* use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS); //* Apollo/client library provides a loading property to indicate the request isnt done and when it is finished, the information is stored in the data property
  //* use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  //* if data exists, store it in the thoughts constraint. If data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.info(thoughts);

  //* if logged in, loggedIn will be true, otherwise it will be false
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
