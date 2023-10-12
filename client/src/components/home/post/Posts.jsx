import { useState, useEffect } from "react";

import { Box, Grid} from '@mui/material';
import { useSearchParams , Link} from 'react-router-dom';

import { API } from '../../../service/api.js';

// compomemt
import Post from "./Post.jsx";

const Posts = () => {

    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
       const fetchData = async () => {
          let res = await API.getAllPosts({ category: category || ''});
          if(res.isSuccess) {
      
            setPosts(res.data);
          }
       }
       fetchData();
    }, [category])

    return (
        <>
           {
            posts && posts.length > 0 ? posts.map(post => (
                <Grid item lg={3} sm={4} xs={12} key={post._id}>
                    <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Post post={post}/>
                    </Link>
                </Grid>
            )) : <Box style={{ color:'#878787', margin: '30px 80px', fontSize: 18}}>
                 NO data available to display
                 </Box>
           }
        </>
    )
}
export default Posts;