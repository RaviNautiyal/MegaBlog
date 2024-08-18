import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).finally(() => setLoading(false));
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.FeaturedImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className="py-8 min-h-screen flex justify-center items-center">
                <Container>
                    <div className="flex flex-col items-center">
                        <div className="animate-spin h-8 w-8 border-t-4 border-red-500 border-solid rounded-full mb-4"></div>
                        <p className="text-lg font-semibold">Loading post...</p>
                    </div>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border-4 border-red-500 rounded-xl p-4 shadow-lg">
                    <img
                        src={appwriteService.getFilePreview(post.FeaturedImage)}
                        alt={post.title}
                        className="rounded-xl border-4 border-red-700 shadow-lg transition-transform transform hover:scale-105"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-red-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-3xl font-bold text-red-700">{post.Title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.Content)}
                </div>
            </Container>
        </div>
    ) : null;
}
    