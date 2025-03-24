import axios from "axios"

const LoginApi = async (formData, setIsError, setMessage) => {
    const response = await axios.post(`https://varjinth.pythonanywhere.com/login/`, formData, { withCredentials: true });
    if (response.status === 200) {
        return response.data
    }
    else {
        setIsError(true);
        setMessage("An error occurred while logging in. Please try again later.");
        return false
    }
}
export default LoginApi;

