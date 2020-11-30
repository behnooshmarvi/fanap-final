import React from "react";
import AuthService from "services/auth.service";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(AuthService.currentUser);

  React.useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const Register = (name, userName, password) => {
    return AuthService
      .createUserWithEmailAndPassword(userName, password)
      .then(async user => {
        if (!!user) {
          await AuthService.currentUser.updateProfile({ displayName: name });
        }
        return user;
      });
  };

  const Login = (email, password) => {
    return AuthService.signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    return AuthService.signOut();
  };

  const value = React.useMemo(() => ({ user, Register, Login, logOut }), [
    user
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
