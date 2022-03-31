//TODO: PAGE FOR SINGLE THOUGHTS
//! Import dependencies
import React from 'react';
import { useParams } from 'react-router-dom'; //? React hook to access parameters of a current route

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import { useQuery } from '@apollo/client'; //? useQuery hook lets you fetch GraphQL data in React
import { QUERY_THOUGHT } from '../utils/queries';

import Auth from '../utils/auth';

//! Create a SingleThought component
const SingleThought = props => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }, // the `id` property becomes the `$id` parameter in the GraphQL query
  });

  //* If data is there, populate the thought object with it, otherwise return an empty object
  const thought = data?.thought || {};

  //* Briefly show the loading `div` when loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}

      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
