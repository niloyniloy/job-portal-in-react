import { useNavigate } from "react-router-dom";


function Logout() {

	localStorage.clear(); // clears all keys
	window.location.replace("/");
}

export default Logout
