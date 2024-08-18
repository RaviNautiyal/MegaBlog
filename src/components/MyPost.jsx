import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import service from '../appwrite/auth';

function MyPost() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await service.getCurrentUser();
                setUser(data.$id);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchPosts = async () => {
                try {
                    setLoading(true);
                    const response = await appwriteService.getMyPosts(user);
                    setPosts(response);
                } catch (error) {
                    console.error("Failed to fetch posts", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPosts();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center min-h-screen flex justify-center items-center">
                <Container>
                    <div className="flex flex-col items-center">
                        <div className="animate-spin h-8 w-8 border-t-4 border-blue-500 border-solid rounded-full mb-4"></div>
                        <p className="text-lg font-semibold">Loading posts...</p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8 min-h-screen'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} 
                                 className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default MyPost;
