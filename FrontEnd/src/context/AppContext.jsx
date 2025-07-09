import { createContext, useState ,useEffect} from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true   // if i will referse also now it will not get logged out 
    const backendUrl = import.meta.env.VITE_BACKENDURL
    const [isLoggedin, setLogedIn] = useState(false);
    const [userdata, setUserData] = useState(false);

    const getAuthState = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/auth/is-auth', {
            withCredentials: true
            });

            // console.log(res.data, "these line");

            if (res.data.success) {
            setLogedIn(true);
            getUserData(res.data); // Pass actual data
            }
        } catch (error) {
            console.log(error.response?.data || error.message, "error line");
            toast.error(error.message + " Sdff");
        }
        };


    const getUserData = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + '/api/user/userdata',{})
            data.success ? setUserData(data.userData) :  toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getAuthState();
    }, [])
    const value = {
        backendUrl,
        isLoggedin,
        userdata,
        setLogedIn,
        setUserData,getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {
                props.children
            }
        </AppContext.Provider>
    )
}