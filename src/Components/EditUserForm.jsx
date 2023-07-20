// import React, {useState} from "react";
// import "./EditUserForm.css";

// const EditUserForm = ({user, onUpdate}) => {
//   const [email, setEmail] = useState(user.Email);
//   const [password, setPassword] = useState(user.Password);
//   const [phoneNumber, setPhoneNumber] = useState(user.PhoneNumber);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(user._id, {
//       Email: email,
//       Password: password,
//       PhoneNumber: phoneNumber,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input
//           type="email"
//           name="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//           type="password"
//           name="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <label>
//         Phone Number:
//         <input
//           type="tel"
//           name="PhoneNumber"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//         />
//       </label>
//       <button type="submit">Update</button>
//     </form>
//   );
// };

// export default EditUserForm;

import React, {useState} from "react";
import "./EditUserForm.css";

const EditUserForm = ({user, onUpdate}) => {
  const [email, setEmail] = useState(user.Email);
  const [password, setPassword] = useState(user.Password);
  const [phoneNumber, setPhoneNumber] = useState(user.PhoneNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(user._id, {
      Email: email,
      Password: password,
      PhoneNumber: phoneNumber,
    });
  };

  return (
    <form className="edit-user-form" onSubmit={handleSubmit}>
      <label className="edit-user-label">
        Email:
        <input
          className="edit-user-input"
          type="email"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="edit-user-label">
        Password:
        <input
          className="edit-user-input"
          type="password"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="edit-user-label">
        Phone Number:
        <input
          className="edit-user-input"
          type="tel"
          name="PhoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button className="edit-user-button" type="submit">
        Update
      </button>
    </form>
  );
};

export default EditUserForm;
