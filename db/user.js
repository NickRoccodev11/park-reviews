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

module.exports = { registerUser };
