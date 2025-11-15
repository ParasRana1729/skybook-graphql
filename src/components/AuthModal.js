import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useAuth } from "../context/AuthContext";
import { LOGIN_USER, REGISTER_USER } from "../graphql/mutations";

const AuthModal = ({ show, onClose }) => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  const handleClose = () => {
    setLoginData({ email: "", password: "" });
    setRegisterData({ name: "", email: "", password: "", confirm: "" });
    setLoginErrors({});
    setRegisterErrors({});
    setActiveTab("login");
    onClose();
  };

  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      login(data.login.user, data.login.token);
      handleClose();
      alert(`Welcome back, ${data.login.user.name}!`);
    },
    onError: (error) => {
      setLoginErrors({ email: error.message });
    },
  });

  const [registerMutation, { loading: registerLoading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      login(data.register.user, data.register.token);
      handleClose();
      alert(`Welcome, ${data.register.user.name}!`);
    },
    onError: (error) => {
      setRegisterErrors({ email: error.message });
    },
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setLoginErrors({});
    setRegisterErrors({});
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (loginErrors[name]) {
      setLoginErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (registerErrors[name]) {
      setRegisterErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLogin = (data) => {
    const errors = {};

    if (!data.email || !isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.password || data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const validateRegister = (data) => {
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long";
    }

    if (!data.email || !isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.password || data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (data.password !== data.confirm) {
      errors.confirm = "Passwords do not match";
    }

    return errors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const errors = validateLogin(loginData);

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    loginMutation({
      variables: {
        email: loginData.email,
        password: loginData.password,
      },
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const errors = validateRegister(registerData);

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    registerMutation({
      variables: {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      },
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal") {
      handleClose();
    }
  };

  return (
    <div className={`modal ${show ? "modal-show" : ""}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>

        <div className="auth-container">
          <div className="auth-tabs">
            <button
              className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabClick("login")}
            >
              Login
            </button>
            <button
              className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => handleTabClick("register")}
            >
              Register
            </button>
          </div>

          <form
            className={`auth-form ${activeTab === "login" ? "active" : ""}`}
            onSubmit={handleLoginSubmit}
          >
            <h3>Welcome Back</h3>

            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              {loginErrors.email && (
                <span className="error-message">{loginErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              {loginErrors.password && (
                <span className="error-message">{loginErrors.password}</span>
              )}
            </div>

            <button type="submit" className="auth-btn" disabled={loginLoading}>
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <form
            className={`auth-form ${activeTab === "register" ? "active" : ""}`}
            onSubmit={handleRegisterSubmit}
          >
            <h3>Create Account</h3>

            <div className="form-group">
              <label htmlFor="register-name">Full Name</label>
              <input
                type="text"
                id="register-name"
                name="name"
                placeholder="Enter your full name"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
              />
              {registerErrors.name && (
                <span className="error-message">{registerErrors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input
                type="email"
                id="register-email"
                name="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
              {registerErrors.email && (
                <span className="error-message">{registerErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                name="password"
                placeholder="Create a password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
              {registerErrors.password && (
                <span className="error-message">{registerErrors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="register-confirm">Confirm Password</label>
              <input
                type="password"
                id="register-confirm"
                name="confirm"
                placeholder="Confirm your password"
                value={registerData.confirm}
                onChange={handleRegisterChange}
                required
              />
              {registerErrors.confirm && (
                <span className="error-message">{registerErrors.confirm}</span>
              )}
            </div>

            <button type="submit" className="auth-btn" disabled={registerLoading}>
              {registerLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
