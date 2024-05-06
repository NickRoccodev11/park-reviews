const { prisma } = require("./index");

const registerUser = async (
  email,
  username,
  password,
  first_name,
  last_name
) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password,
        first_name,
        last_name,
        is_admin: false,
      },
    });
    return newUser;
  } catch (error) {
    console.error("error registering new user", error);
  }
};

const loginUser = async (username, password) => {
  try {
    const loggedUser = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });
    return loggedUser;
  } catch (error) {
    console.error("error finding user", error);
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany({});
    return allUsers;
  } catch (error) {
    console.error("error getting users from db", error);
  }
};

const getReviewsByUser = async (id) => {
  try {
    const userReviews = await prisma.review.findMany({
      where: {
        user_id: id,
      },
      include: {
        park: true,
      },
    });
    return userReviews;
  } catch (error) {
    console.error("error getting user reviews from db", error);
  }
};

const updateReview = async (userId, parkId, id, updateData) => {
  try {
    const updatedReview = await prisma.review.update({
      where: {
        id,
        user_id: userId,
        park_id: parkId,
      },
      data: updateData,
    });
    return updatedReview;
  } catch (error) {
    console.error("error updating review", error);
  }
};

const deleteReview = async (id) => {
  try {
    await prisma.comment.deleteMany({
      where: {
        review_id: id,
      },
    });
    const deletedReview = await prisma.review.delete({
      where: {
        id,
      },
    });
    return deletedReview;
  } catch (error) {
    console.error("error deleting review from db", error);
  }
};

const getCommentsByUser = async (user_id) => {
  try {
    const userComments = await prisma.comment.findMany({
      where: {
        user_id,
      },
      include: {
        review: {
          select: {
            title: true,
          },
        },
      },
    });
    return userComments;
  } catch (error) {
    console.error("error getting user comments from db", error);
  }
};

const editComment = async (id, content) => {
  try {
    const editedComment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });
    return editedComment;
  } catch (error) {
    console.error("error updating a comment in db", error);
  }
};

const deleteComment = async (id) => {
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id,
      },
    });
    return deletedComment;
  } catch (error) {
    console.error("error deleting comment from db", error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getReviewsByUser,
  getAllUsers,
  updateReview,
  deleteReview,
  getCommentsByUser,
  editComment,
  deleteComment,
};
