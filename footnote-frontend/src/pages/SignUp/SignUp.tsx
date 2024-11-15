import React, { useState } from "react";
import "./SignUp.css";
import user_icon from "../../assets/person.png";
import password_icon from "../../assets/password.png";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface IUserModel {
  username: string;
  password: string;
  confirmPassword: string;
}

/**
 * SignUp Component
 *
 * This component provides a form for signing up. It displays inputs for
 * username, password, and a "confirm password" input field for
 * sign-up mode.
 *
 * @returns {TSX.Element} The rendered Login/Signup form.
 */
export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<IUserModel>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;

    setData({ ...data, [id]: value });
  };

  // const [message, setMessage] = useState<string>("")

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // console.log(data)

    const newUser: IUserModel = {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response: AxiosResponse<string> = await axios.post(
        "http://localhost:3000/users/create-user",
        newUser,
        { withCredentials: true } // to send cookies with the request
      );

      if (response.data === "Created user " + newUser.username.toLowerCase()) {
        console.log(response.data); // Creation successful message
        navigate("/home"); // Redirect to home page
      } else {
        alert(response.data); // Error message
      }
    } catch (err) {
      console.log("Error on signup request: ", err);
    }
  };

  return (
    <div className="container">
      {/* Header section with current action text and underline */}
      <div className="form-container">
      <form action="POST">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline" />
        </div>

        {/* Input fields for username and password */}
        <div className="inputs">
          {/* Username input */}
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input
              type="text"
              placeholder="username"
              id="username"
              value={data.username}
              onChange={handleInputChange}
            />
          </div>

          {/* Password input */}
          <div className="input">
            <img src={password_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder="password"
              id="password"
              value={data.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="Confirm Password Icon" />
            <input
              type="password"
              placeholder="confirm password"
              id="confirmPassword"
              value={data.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Conditional "Forgot your password?" link, only in Login mode */}
        <div className="forgot-password text-center">
          Already have an account? <Link to="/"> Click Here!</Link>
        </div>

        {/* Buttons to toggle between "Login" and "Sign Up" */}
        <div className="submit-container">
          {/* Button to switch to Sign Up mode */}

          {/* Button to switch to Login mode */}
          <button className="submit">
            <div
              className={"submit"}
              role="button"
              tabIndex={0}
              onClick={handleSubmit}
            >
              Submit
            </div>
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default SignUp;
