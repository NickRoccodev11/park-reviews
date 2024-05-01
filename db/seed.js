const { prisma } = require("./index.cjs");
const  { faker } = require("@faker-js/faker");

const fetchParks = async () => {
  try {
    const res = await fetch(
      "https://developer.nps.gov/api/v1/parks?limit=471",
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "EX6guCGAk4p1zEepoaEJV55yINFTDKSDzl9YlrWn",
        },
      }
    );
    const parkData = await res.json();
    return parkData;
  } catch (error) {
    console.log(error);
  }
};

const seed = async () => {
  const { data } = await fetchParks();
  for (let i = 0; i < data.length; i++) {
    await prisma.park.create({
      data: {
        name: data[i].fullName,
        description: data[i].description,
        contact: data[i].contacts.emailAddresses[0].emailAddress,
        hours: data[i].operatingHours[0]?.description,
        state: data[i].states,
        image: data[i].images[0].url
      }
    })
  }
};
seed();