import express from "express";
import { setCookie } from "../setups/cookie_sessoin.js";
export const logoutRoute = express.Router();
logoutRoute.get('/logout', (req, res) => {
    let logout_req = req.query;
    if (logout_req.logout === 'true') {
        let getUserEmailCookie = decodeURIComponent(req.cookies.userEmail || '');
        if (getUserEmailCookie) {   
            setCookie('userEmail', '', true, process.env.SECURE === 'production', -1 * (3600 * 5), res);
            setCookie('userName', '', true, process.env.SECURE === 'production', -1 * (3600 * 5), res);
            return res.status(200).json({ success: true, message: 'Logout successful' });
        } else if(req.session.loginData?.loginStatus){
            return req.session.destroy((err) => {
                if (err) return res.status(500).json({ success: false, message: 'Logout Failed' });
                return res.status(200).json({ success: true, message: 'Logout successful' });
            });
        }
        return res.status(200).json({ success: false, message: 'You are already log out' });
    } else{
        return res.status(200).json({ success: false, message: 'Logout Failed' });
    }
})