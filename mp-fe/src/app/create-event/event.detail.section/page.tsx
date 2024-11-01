import React, {useState} from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";

function EventDetailsSection({setIsSaved}: any) {
    const [summary, setSummary] = useState('');

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                {/* Main Event Image Section */}
                <section className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Main Event Image</h3>
                    <p className="text-gray-600 mb-6">
                        This is the first image attendees will see at the top of your listing. Use a high-quality image: 2160x1080px (2:1 ratio). 
                        <a href="#" className="text-blue-500 underline ml-1">Learn more</a>
                    </p>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <label className="flex flex-col items-center cursor-pointer">
                            <svg
                                className="w-12 h-12 text-gray-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 7v4m0 0a2 2 0 002 2h4m10-6V5a2 2 0 00-2-2h-4m0 0a2 2 0 00-2 2v4m0 0h4m0 4v4m0 0a2 2 0 002 2h4m0-10h-4m0 0H9m10 10V5a2 2 0 00-2-2H9m0 0H7a2 2 0 00-2 2v10a2 2 0 002 2h4m4 0h2a2 2 0 002-2v-4m-6 0h4"
                                ></path>
                            </svg>
                            <span className="text-gray-500">Drag & drop or click to add main event image.</span>
                            <span className="text-gray-400 text-sm">JPEG or PNG, no larger than 10MB.</span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                </section>

                {/* Description Section */}
                <section>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Description</h3>
                    <p className="text-gray-600 mb-4">
                        Add more details to your event like your schedule, sponsors, or featured guests.
                        <a href="#" className="text-blue-500 underline ml-1">Learn more</a>
                    </p>

                    {/* Summary Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Summary <span className="text-red-500">*</span></label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 resize-none"
                            placeholder="Write a short event summary to get attendees excited..."
                            maxLength={140}
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            rows={3}
                        />
                        <p className="text-right text-gray-500 text-sm mt-1">{summary.length}/140</p>
                    </div>

                    {/* Detailed Description Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 resize-none"
                            placeholder="Provide a detailed description for your event here..."
                            rows={6}
                        />
                        
                        <div className="flex justify-end mt-2 text-gray-500 space-x-2">
                            <button className="text-gray-500 hover:text-gray-700">B</button>
                            <button className="text-gray-500 hover:text-gray-700">I</button>
                            <button className="text-gray-500 hover:text-gray-700">U</button>
                            <button className="text-gray-500 hover:text-gray-700">•</button>
                            <button className="text-gray-500 hover:text-gray-700">List</button>
                        </div>
                    </div>

                    {/* Go Back Button */}
                    <div className="mt-8">
                        <button
                            onClick={() => setIsSaved(false)}
                            className="text-blue-500 font-semibold hover:text-blue-700"
                        >
                            Go Back
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default EventDetailsSection