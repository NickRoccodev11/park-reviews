const { prisma } = require("./index");

const getAllParks = async () => {
  const allParks = await prisma.park.findMany({
    include: {
      Review: true,
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
        Review: true,
      }
    });
    return parkDetails;
  } catch (error) {
    console.error(`error fetching park details for ID${id}: ${error}`);
    throw error;
  }
};

const createPark = async (
  name, description, contact, state, image, hours
) => {
   try {
    const newPark = prisma.park.create({
      data:{
        name,
        description,
        contact, 
        state, 
        image, 
        hours
      }
    })
    return newPark;
   } catch (error) {
    console.error(error);    
   }
};

module.exports = {
  getAllParks,
  getParkDetails,
  createPark,
};
