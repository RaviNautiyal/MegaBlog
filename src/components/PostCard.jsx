import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, Title, FeaturedImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl p-6 border border-gray-200">
                <div className="w-full justify-center mb-4">
                    <img
                        src={appwriteService.getFilePreview(FeaturedImage)}
                        alt={Title}
                        className="rounded-lg object-cover w-full h-48"
                    />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{Title}</h2>
                <p className="text-gray-600">Click to read more...</p>
            </div>
        </Link>
    );
}

export default PostCard;
