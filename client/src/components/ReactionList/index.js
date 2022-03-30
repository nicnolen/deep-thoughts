//TODO: REACTION COMPONENT WITH
//! Import dependencies
import React from 'react';
import { Link } from 'react-router-dom';

//! Create the ReactionList component
const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Reactions</span>
      </div>
      <div className="card-body">
        {reactions &&
          reactions.map(reaction => (
            <p className="pill mb-3" key={reaction._id}>
              {reaction.reactionBody} {'// '}
              <Link
                to={`/profile/${reaction.username}`}
                style={{ fontWeight: 700 }}>
                {reaction.username} on {reaction.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

//! Export ReactionList component
export default ReactionList;
