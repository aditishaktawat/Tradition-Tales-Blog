
import {Box, Typography,styled} from '@mui/material';

const Image= styled(Box)`
   background: url(https://1.bp.blogspot.com/-IpHz_zajXjY/WxCpU42VbnI/AAAAAAAA6mE/MpHE69hmolY04lC8Bg_GNJ8qCU0xq7hxACLcBGAs/s1600/ancientart.jpg) center/100% repeat-x #000;
   width: 100%;
   height: 50vh;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;
const Heading = styled(Typography)`
   font-size: 60px;
   color:white ;
   line-height:1;
   background: black;

`;

const SubHeading = styled(Typography)`
font-size: 20px;
background: black;
color:white ;
top: 9rem;
`


const Banner = () =>{
    return (
        <Image>
            <Heading>Tradition Tales</Heading>
            <SubHeading>"Discovering India's Vintage Charms"</SubHeading>
        </Image>
    )
}
export default Banner;