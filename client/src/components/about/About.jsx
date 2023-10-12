
import { Box, styled, Typography } from '@mui/material';


const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Welcome to the About Page</Typography>
                <Text variant="h5">This is a full stack MERN project. 
                    
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me. 
                     
                        
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;