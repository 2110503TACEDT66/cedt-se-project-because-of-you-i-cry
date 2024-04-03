const userRegister = async (
  name: string,
  email: string,
  password: string,
  tel: string
) => {
  const response = await fetch(
    "https://project-backend-eight.vercel.app/api-informations/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        tel: tel,
        role: "user",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return await response.json();
};

export default userRegister;
