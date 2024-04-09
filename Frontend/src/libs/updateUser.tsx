//const fetch = require("node-fetch");

export default async function updateUser(
  userid: string,
  userName: string,
  userEmail: string,
  userTel: string,
  token: string
) {
  const BACKEND_URL = process.env.BACKEND_URL;
  const response = await fetch(
    `${BACKEND_URL}/api-informations/users/update/${userid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        tel: userTel,
      }),
    }
  );

  let alertMessage = "";

  if (response.ok) {
    alertMessage = "User information saved successfully!";
  } else {
    alertMessage = `Failed to update user, try to use another email or telephone number.`;
  }

  alert(alertMessage);
  if (!response.ok) {
    return null;
  }

  return await response.json();
}
