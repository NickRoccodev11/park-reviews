const { prisma } = require("./index");

const getAllParks = async () => {
  const allParks = await prisma.park.findMany({
    include: {
      Review: true,
      Tag: true,
    },
  });
  return allParks;
};

const getParkDetails = async (id) => {
  try {
    const parkDetails = await prisma.park.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Review: {
          include: {
            Comment: {
              include: {
                review: true,
                user: true,
              },
            },
            user: true,
          },
        },
        Tag: true,
      },
    });
    return parkDetails;
  } catch (error) {
    console.error(`error fetching park details for ID${id}: ${error}`);
    throw error;
  }
};

const createPark = async (name, description, contact, state, image, hours) => {
  try {
    const newPark = await prisma.park.create({
      data: {
        name,
        description,
        contact,
        state,
        image,
        hours,
      },
    });
    console.log(newPark);
    const id = newPark.id;
    const newParkWithReviews = await prisma.park.findFirst({
      where: {
        id,
      },
      include: {
        Review: true,
        Tag: true,
      },
    });
    return newParkWithReviews;
  } catch (error) {
    console.error(error);
  }
};

const updatePark = async (
  name,
  description,
  contact,
  state,
  image,
  hours,
  tags,
  park_id
) => {
  try {
    for (tag of tags) {
      const existingTag = await prisma.tag.findFirst({
        where: {
          category: tag,
          park_id,
        },
      });
      if (!existingTag) {
        await prisma.tag.create({
          data: {
            category: tag,
            park: {
              connect: {
                id: park_id,
              },
            },
          },
        });
      }
    }

    await prisma.park.update({
      where: {
        id: park_id,
      },
      data: {
        name,
        description,
        contact,
        state,
        image,
        hours,
      },
    });
    const updatedPark = await prisma.park.findFirst({
      where: {
        id: park_id,
      },
      include: {
        Review: {
          include: {
            Comment: {
              include: {
                review: true,
                user: true,
              },
            },
            user: true,
          },
        },
        Tag: true,
      },
    });
    return updatedPark;
  } catch (error) {
    console.error("error editing park in db", error);
  }
};

const deletePark = async (id) => {
  try {
    const deletedPark = await prisma.park.delete({
      where: {
        id,
      },
      include: {
        Tag: true,
        Review: {
          include: {
            Comment: true,
          },
        },
      },
    });
    return deletedPark;
  } catch (error) {
    console.error("error delting park", error);
  }
};

const createReview = async (title, content, stars, user_id, park_id) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    const newReview = await prisma.review.create({
      data: {
        title,
        content,
        stars,
        user_id,
        park_id,
      },
    });
    newReview.user = user;
    return newReview;
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (content, review_id, user_id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    const newComment = await prisma.comment.create({
      data: {
        content,
        review_id,
        user_id,
      },
    });
    newComment.user = user;
    return newComment;
  } catch (error) {
    console.error("error putting new comment in db", error);
  }
};

module.exports = {
  getAllParks,
  getParkDetails,
  createPark,
  updatePark,
  createReview,
  createComment,
  deletePark,
};
