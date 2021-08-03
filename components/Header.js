import React, { useState } from "react";
import { useDataLayerContextValue } from "../configurations/DataLayer";
import Popover from "@material-ui/core/Popover";
import { actionTypes } from "../configurations/reducer";
import { auth } from "../configurations/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {navigate} from "../utils/utility"
import {BASE, ENV} from "../configurations/environments"

toast.configure();

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const [user, dispatch] = useDataLayerContextValue();
    const [{ }, dispatch_signOut] = useDataLayerContextValue();
    const closeAccountPopOver = (event) => {
        setAnchorEl(null);
    };
    const signOutUser = (e) => {
        e.preventDefault();
        auth
            .signOut()
            .then(function () {
                dispatch_signOut({
                    type: actionTypes.SET_USER,
                    user: null,
                });
                dispatch({
                    type: actionTypes.SET_USER,
                    user: null,
                });
                toast.success("You are now signed out!!", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });

            })
            .catch(function (error) {
                toast.error("Some error occured during sign out", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });
            });
    };
    const openAccountPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (<header className="header fixed flex h-12 top-0 w-full z-10 justify-between ">
        <img
            onClick={(e) => navigate(BASE, ENV)}
            className="fixed object-contain cursor-pointer w-36 left-0 top-1"
            src="/logo-hindi-2-removebg-preview.png"
            alt="#सुनलो-Logo"
        />

{user?.user && (
    <div>
        <img onClick={(e) => openAccountPopOver(e)}

            className="fixed right-5 w-8 object-contain mt-2 cursor-pointer"
            src={user?.user?.photoURL} title={user?.user?.displayName}
            alt={user?.user?.displayName}
        />

        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={(e) => closeAccountPopOver(e)}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >

            <li onClick={e => signOutUser(e)} className="header__userAccountOptions" role="presentation">
                Sign out
            </li>


        </Popover>
        </div>
)}
    </header>);
}

export default Header;