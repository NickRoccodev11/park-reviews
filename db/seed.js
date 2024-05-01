const { prisma } = require("./index.cjs");
const { faker } = require("@faker-js/faker");

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

//create new tags
//create users
//create reviews
//add comments

const createPark = async () => {
  const { data } = await fetchParks();
  for (let i = 0; i < data.length; i++) {
    await prisma.park.create({
      data: {
        name: data[i].fullName,
        description: data[i].description,
        contact: data[i].contacts.emailAddresses[0].emailAddress,
        hours: data[i].operatingHours[0]?.description,
        state: data[i].states,
        image: data[i].images[0].url,
      },
    });
  }
};
const createUser = async (
  email,
  username,
  password,
  first_name,
  last_name,
  is_admin
) => {
  await prisma.user.create({
    data: {
      email,
      username,
      password,
      first_name,
      last_name,
      is_admin,
    },
  });
};

const createReview = async (title, content, stars, user_id, park_id) => {
  await prisma.review.create({
    data: {
      title,
      content,
      stars,
      user_id,
      park_id,
    },
  });
};

const createTag = async (category, park_id) => {
  await prisma.tag.create({
    data: {
      category,
      park_id,
    },
  });
};

const createComment = async (content, review_id, user_id) => {
  await prisma.comment.create({
    data: {
      content,
      review_id,
      user_id,
    },
  });
};

const seed = async () => {
  console.log("starting seed");
  console.log("adding parks");
  await createPark();
  console.log("adding users");
  await createUser("tyler@gmail", "tylerF", "abc", "Tyler", "Frame", true);
  await createUser("eli@gmail", "eliT", "abc", "Eli", "Thode", true);
  await createUser("nick@gmail", "nickR", "abc", "Nick", "Rocco", true);
  await createUser(
    "garble@gmail",
    "LuisG",
    "dglokshjdgl",
    "Luis",
    "Garble",
    false
  );
  await createUser(
    "teddyB@gmail",
    "teddyB",
    "23947sdkgh",
    "Teddy",
    "Bruckner",
    false
  );
  await createUser(
    "Marie3@gmail",
    "Marie3",
    "asdkfh3df39",
    "Marie",
    "Alanso",
    false
  );
  console.log("adding tags")
  for (let i = 1; i < 470; i++) {
    await createTag(faker.animal.bird(), i);
  }
  console.log("adding reviews")
  await createReview("a wonderful time", "Best hikes, great views!", 4, 4, 1);
  await createReview("complete misery", "It rained the whole time", 1, 5, 2);
  await createReview(
    "interesting birds",
    "the widest variety of birds I've seen yet",
    3,
    6,
    3
  );
  console.log("adding comments")
  await createComment("well, I didn't like it", 1, 5);
  await createComment("You should'nt have gone in April", 2, 4);
  await createComment("I agree, I loved the birds", 3, 4);

  console.log("seed complete");
};
seed();
