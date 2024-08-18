import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPosts();
                if (posts) {
                    setPosts(posts.documents);
                }
            } catch (err) {
                setError('You are not Logged in!');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-transparent mt-16">
                <Container>
                    <div className="flex flex-col items-center bg-red-600 bg-opacity-50 p-6 rounded-lg shadow-md">
                        <div className="animate-spin h-8 w-8 border-t-4 bg-red-600 border-solid rounded-full mb-4"></div>
                        <p className="text-lg font-semibold">Loading posts...</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-transparent mt-16">
                <Container>
                    <div className="flex flex-col items-center bg-red-700 bg-opacity-50 p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-red-700">{error}</h1>
                        <p className="text-lg">Login to view blogs.</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-transparent mt-16">
                <Container>
                    <div className="flex flex-col items-center bg-red-600 bg-opacity-50 p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-red-700 mb-4">No Posts Available</h1>
                        <p className="text-lg">Sorry! No posts available..</p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-transparent mt-16">
            <Container>
                <h1 className="text-3xl font-bold text-center mb-6 bg-red-600 bg-opacity-50 p-4 rounded-lg shadow-md">
                    Latest Posts
                </h1>
                <div className="flex flex-wrap justify-center">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                            <div className="bg-red-600 bg-opacity-50 p-6 rounded-lg shadow-md">
                                <PostCard {...post} />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
