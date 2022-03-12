import React from "react";

const AuthContext = React.createContext({
	token: "",
	loggedIn: false,
	user: {},
	history: {},
	location: {},
});

export default AuthContext;
