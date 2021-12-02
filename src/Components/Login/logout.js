
const logout = () => {

    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('tokenTime');

    window.location.assign('/loginpage');
}

export default logout;