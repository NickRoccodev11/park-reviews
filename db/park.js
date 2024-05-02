const { prisma } = require("./index");

const getAllParks = async () => {
  const allParks = await prisma.park.findMany({
    include: {
      Review: true,
    },
  });
  return allParks;
};

module.exports = {
  getAllParks,
};
