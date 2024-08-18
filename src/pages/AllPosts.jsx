import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import service from '../appwrite/auth';
function AllPosts() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchUserData = async () => {
            const data = await service.getCurrentUser();
            console.log("The data is:", data);
            console.log(data.$id)
            console.log(user)
            setUser(data.$id);
            console.log(user)
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (user) {
            appwriteService.getPosts(user.$id).then((posts) => {
                if (posts) {
                    console.log(posts);
                    console.log(posts.documents);
                    setPosts(posts.documents);
                }
            });
        }
    }, [user]);
    
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        {console.log(post)}
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts