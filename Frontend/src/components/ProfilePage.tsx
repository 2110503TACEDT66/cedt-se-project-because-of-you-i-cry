// import React, { useState } from "react";

// const ProfilePage = ({ profile }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState(profile.name);
//   const [tel, setTel] = useState(profile.tel);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     // Logic to save the edited name and telephone number
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       <h1>Profile</h1>
//       <div>
//         <p>
//           Name:{" "}
//           {isEditing ? (
//             <input value={name} onChange={(e) => setName(e.target.value)} />
//           ) : (
//             name
//           )}
//         </p>
//         <p>
//           Telephone:{" "}
//           {isEditing ? (
//             <input value={tel} onChange={(e) => setTel(e.target.value)} />
//           ) : (
//             tel
//           )}
//         </p>
//         {isEditing ? (
//           <button onClick={handleSave}>Save</button>
//         ) : (
//           <button onClick={handleEdit}>Edit</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
