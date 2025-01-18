import { Link , useNavigate} from "react-router-dom";
import useAuth from "../../Utils/useAuth";
import styles from "./NavBar.module.css";
import { FaUser , FaSignOutAlt} from "react-icons/fa";
import logo from "../../assets/readThis_purple.svg";


const NavBar: React.FC = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/signin")
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <h1 className={styles.title}>ReadThis</h1>
      {isAuthenticated && (
        <>
          <Link to="/profile">
            <FaUser className={styles.userIcon} />
          </Link>
          <FaSignOutAlt className={styles.logoutIcon} onClick={logout} />
        </>
      )}
    </nav>
  );
};

export default NavBar;