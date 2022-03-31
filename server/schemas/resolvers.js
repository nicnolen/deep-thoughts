//TODO: CREATE RESOLVERS TO PERFORM CRUD ACTIONS ON QUERIES AND MUTATIONS
// Import dependencies
const { User, Thought } = require('../models'); // Import User and Thought models
const { AuthenticationError } = require('apollo-server-express'); // Authentication
const { signToken } = require('../utils/auth'); // Import signToken() function from utils/auth.js

// Create resolvers
const resolvers = {
  // QUERIES
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('thoughts')
          .populate('friends');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    // get all thoughts
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {}; // ternary operator to check if username exists
      return Thought.find(params).sort({ createdAt: -1 });
    }, // parent used as a placeholder so we can access the username argument from the second parameter
    // get thought by identifier
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
  },

  // MUTATIONS
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // add thought
    addThought: async (parent, args, context) => {
      // only allow logged in users to use this mutation
      if (context.user) {
        const thought = await Thought.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true } // make Mongo return updated document
        );
        return thought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    // add reaction
    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedThought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    // add friend
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } }, // user cant be friends with the same person twice so use $addToSet instead of $push
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

// Export resolvers
module.exports = resolvers;
