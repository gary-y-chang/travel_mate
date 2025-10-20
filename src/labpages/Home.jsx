import React from 'react';
import PageNav from '../components/PageNav';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div>
            <PageNav/>
            Home Page
         
            {/* <Outlet/> */}
        </div>
    );
}

export default Home;
