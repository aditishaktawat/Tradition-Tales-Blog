import { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
});

const StyledFormContainer = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date(),
};

const Update = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null); // File state should start as null
  const [imageDataURL, setImageDataURL] = useState('');
  const { account } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let res = await API.getPostById(id);
      if (res.isSuccess) {
        setPost(res.data);
      }
    };
    fetchData();
  }, [id]);

useEffect(() => {
   const getImage = async() => {
      if (file) {
         const data = new FormData();
         data.append("name", file.name)
         data.append("file", file);

         // Api call
         const res = await API.uploadFile(data)
         post.picture = `https://tradition-tales-backend.vercel.app/file/${res.data}`;

          setImageDataURL(post.picture);
      }
   }
   getImage();
    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;
}, [file, account.username, location.search, post]);


  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageDataURL(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlogPost = async () => {
    let res =  await API.updatePost(post);
  if(res.isSuccess) {
   navigate(`/details/${id}`);
  }
    };
  

  return (
    <Container>
      <Image src={imageDataURL || post.picture || 'https://images.freecreatives.com/wp-content/uploads/2015/05/vintage-photography-backgrounds.jpg'} alt="banner" />

      <StyledFormContainer>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={(e) => handleFileChange(e)}
        />

        <InputTextField placeholder='Title' value={post.title} onChange={(e) => handleChange(e)} name="title" />
         <Button variant="contained" onClick={() => updateBlogPost()}>Update</Button>
      </StyledFormContainer>

      <TextArea
        minRows={5}
        placeholder="Share your experience...."
        onChange={(e) => handleChange(e)}
        name="description"
        value={post.description}
      />
    </Container>
  );
};

export default Update;
