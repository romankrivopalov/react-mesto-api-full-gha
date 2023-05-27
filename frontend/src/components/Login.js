import AuthForm from "./AuthForm";
import auth from "../utils/auth";

function Login({ setUserEmail, setLoggedIn, navigate, onInfoTooltipOpen }) {
  function handleAuthorizationUser(userData) {
    auth.getAuthorizationUser(userData)
      .then(data => {
        if (data._id) {
          localStorage.setItem('userId', data._id);
          setLoggedIn(true);
          setUserEmail(userData.email)
          navigate("/");
        }
      })
      .catch(() => onInfoTooltipOpen({ isOpen: true, status: false }))
  }

  return (
    <AuthForm title='Вход' btnText='Войти' handleSubmit={handleAuthorizationUser} />
  )
}

export default Login
