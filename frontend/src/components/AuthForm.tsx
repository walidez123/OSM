import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore"; 
import { LogIn, UserPlus, Mail, Lock, User } from "lucide-react";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@gmail.com"); 
  const [password, setPassword] = useState("12345678");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { login, register, isLoggingIn, isRegistering } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await register(name, email, password, passwordConfirmation);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-6">
            {isLogin ? (
              <>
                <LogIn className="w-6 h-6 mr-2" /> Login
              </>
            ) : (
              <>
                <UserPlus className="w-6 h-6 mr-2" /> Sign Up
              </>
            )}
          </h2>

          {/* <div className="alert alert-info mb-4">
            <div>
              <span>Demo Account:</span>
              <ul className="list-disc list-inside ml-2">
                <li>Email: demo@example.com</li>
                <li>Password: demo123</li>
              </ul>
            </div>
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </label>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <input
                  type="email"
                  className="grow"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <input
                  type="password"
                  className="grow"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>

            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <input
                    type="password"
                    className="grow"
                    placeholder="Confirm password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required={!isLogin}
                  />
                </label>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn || isRegistering}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="btn btn-outline w-full" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
