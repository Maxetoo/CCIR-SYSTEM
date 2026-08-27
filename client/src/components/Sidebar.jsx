import {} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, FileText, Users, Settings, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import toast from 'react-hot-toast';
import ccirLogo from '../assets/images/CCIR LOGO.svg';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    console.log('User in Sidebar:', user); // Debugging line to check the user object
    const isStaff = user?.role === 'admin' || user?.role === 'agency';

    const handleLogout = async () => {
        await dispatch(logout());
        toast.success('Logged out');
        navigate('/login');
    };

    const initials = (user?.name || '?')
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span className="brand-mark"><img src={ccirLogo} alt="" /></span>
                CCIR System
            </div>

            <NavLink to="/dashboard/report" className="btn btn-primary btn-block sidebar-create">
                <PlusCircle size={17} /> Report Issue
            </NavLink>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                    <Home size={18} /> Home
                </NavLink>
                <NavLink to="/dashboard/reports" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                    <FileText size={18} /> {isStaff ? 'All Reports' : 'My Reports'}
                </NavLink>
                {user?.role === 'admin' && (
                    <NavLink to="/dashboard/users" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                        <Users size={18} /> Users
                    </NavLink>
                )}
                <NavLink to="/dashboard/profile" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                    <Settings size={18} /> Profile
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="avatar">
                        {user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : <span className="avatar-initials">{initials}</span>}
                    </div>
                    <div className="sidebar-user-meta">
                        <div className="name">{user?.name}</div>
                        <div className="role">{user?.role}</div>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} /> Log out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
