import { Grid } from "@mui/material";
// components

import Banner from "../banner/Banner.jsx";
import Categories from "./Categories.jsx";
import Posts from "./post/Posts.jsx";


const Home = () => {
    return (
        <>
           <Banner />
           <Grid container>
            <Grid item lg={2} sm={2} xs={12}>
               <Categories />
            </Grid>
            <Grid container item xs={12} sm={10} lg={10}>
                <Posts />
            </Grid>
           </Grid>
           
     </>
    )
 }
 
 export default Home;