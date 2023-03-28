import Login from './modules/Login/Login';
import Main from './modules/Main/Main';
import * as constants from './constants/constants';

export const publicRoutes = [
    {
        path: constants.LOGIN_ROUTE,
        Component: Login,
    }
];

export const privateRoutes = [
    {
        path: constants.MAIN_ROUTE,
        Component: Main,
    }
];
