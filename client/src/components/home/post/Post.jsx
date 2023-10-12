
import { Box, Typography, styled} from '@mui/material';

import { addElipsis } from '../../../utils/common-utils';


const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  height: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Image = styled('img')({
   width: '100%',
   borderRadius: '10px 10px 0 0',
   objectFit: 'cover',
   height: 150
});

const Text = styled(Typography)`
   color: #878787;
   font-size: 12px;
`;

const Heading = styled(Typography)`
   font-size: 18px;
   font-weight: 600;
`;

const Details = styled(Typography)`
  font-size: 16px;
  word-break: break-word;
  max-height: 200px;
  overflow: hidden;
`;


const Post  = ({ post }) => {

  if (!post || !post.categories || !post.title || !post.username || !post.description) {
    return null; 
  }

  const url = post.picture ? post.picture : 'https://source.unsplash.com/random/600×400?healthy';

    return (
        <Container>
            <Image src={url} alt="blog"  />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title, 20)}</Heading>
            <Text>{post.username}</Text>
            <Details>{addElipsis(post.description, 100)}</Details>
        </Container>
    );
};

export default Post;