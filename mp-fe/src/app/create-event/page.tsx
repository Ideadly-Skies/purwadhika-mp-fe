"use client"
import React, { useState } from 'react';
import instance from '@/utils/axiosinstance';
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';

// Formik
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';

export default function CreateEventPage() {
    // const [title, setTitle] = useState('');
    // const [type, setType] = useState('');
    // const [category, setCategory] = useState('');
    // const [price, setEventPrice] = useState('')
    // const [capacity, setCapacity] = useState('')
    // const [startDate, setStartDate] = useState('')
    // const [startTime, setStartTime] = useState('')
    // const [endDate, setEndDate] = useState('')
    // const [endTime, setEndTime] = useState('')
    // const [timezone, setTimezone] = useState('')
    // const [language, setLanguage] = useState('')

    // const [tags, setTags] = useState<string[]>([]); // Define tags as an array of strings
    // const [tagInput, setTagInput] = useState('');
    
    const EventTypeButtons = () => {
        const { values, setFieldValue } = useFormikContext<any>();
        return (
            <div className="flex space-x-3 mb-6">
                <button
                    type="button"
                    onClick={() => setFieldValue('eventType', 'Single Event')}
                    className={`py-2 px-4 rounded-lg ${
                        values.eventType === 'Single Event' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Single Event
                </button>
                <button
                    type="button"
                    onClick={() => setFieldValue('eventType', 'Recurring Event')}
                    className={`py-2 px-4 rounded-lg ${
                        values.eventType === 'Recurring Event' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Recurring Event
                </button>
            </div>
        );
    };

    // State to hold form values and initialize Formik
    const initialValues = {
        title: '',
        type: '',
        category: '',
        eventPrice: '',
        capacity: '',
        tags: [],
        tagInput: '',
        venue: '',
        eventType: 'Single Event',
        eventStartDate: '',
        eventStartTime: '',
        eventEndDate: '',
        eventEndTime: '',
        displayStartTime: false,
        displayEndTime: false,
        timeZone: '',
        eventPageLanguage: '',
        locationType: 'Venue', // Add default for locationType
    };

    // set isSaved to false
    const [isSaved, setIsSaved] = useState(false);

    // event detail page
    const [summary, setSummary] = useState('');

    const validationSchema = Yup.object({
        title: Yup.string().required('Event title is required').max(75, 'Title cannot exceed 75 characters'),
        type: Yup.string().required('Please select an event type'),
        category: Yup.string().required('Please select a category'),
        eventPrice: Yup.number().required('Price is required').min(0, 'Price cannot be negative'),
        capacity: Yup.number().required('Capacity is required').min(1, 'Capacity must be at least 1'),
    });

    // mutateCreateEvent
    // const {mutate: mutateCreateEvent} = useMutation({
    //     mutationFn: async(fd: any) => {
    //         return await instance.post('/event/create-event', fd)
    //     },

    //     onSuccess: (res) => {
    //         toast.success("Create event success", {
    //             position: "top-center"
    //         })
    //         console.log(res);
    //     },

    //     onError: (err) => {
    //         toast.error("create event failed", {
    //             position: "top-center"
    //         })
    //         console.log(err);
    //     }
    // })

    return (
        <>
            {!isSaved ? (
                <div className="min-h-screen bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Basic Info</h2>
                        <p className="text-gray-600 mb-8">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
                        
                        <Formik
                            initialValues = {initialValues}
                            validationSchema = {validationSchema}
                            onSubmit={(values) => {
                                console.log(values)
                                // setFormValues(values)
                                setIsSaved(true);
                            }}
                        >
                            {({ values, setFieldValue }) => (
                                <Form>
                                    {/* Event Title */}
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
                                            Event Title <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            name="title"
                                            id="title"
                                            type="text"
                                            placeholder="Mixology Class"
                                            maxLength={75}
                                            // value={title}
                                            // onChange={(e: any) => setTitle(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage name="title" component="p" className="text-red-500 text-sm" />
                                        <p className="text-right text-sm text-gray-500">{values.title.length}/75</p>
                                    </div>
                    
                                    {/* Type and Category */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">Type</label>
                                            <Field
                                                as="select"
                                                name="type"
                                                // value={type}
                                                // onChange={(e: any) => {
                                                //     setType(e.target.value)
                                                // }}
                                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Conference">Conference</option>
                                                <option value="Seminar">Seminar</option>
                                                <option value="Workshop">Workshop</option>
                                            </Field>
                                            <ErrorMessage name="type" component="p" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">Category</label>
                                            <Field
                                                as="select"
                                                name="category"
                                                // value={category}
                                                // onChange={(e: any) => setCategory(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Education">Education</option>
                                                <option value="Business">Business</option>
                                                <option value="Health">Health</option>
                                            </Field>
                                            <ErrorMessage name="category" component="p" className="text-red-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Event Price and Capacity */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">Event Price ($)</label>
                                            <Field
                                                name="eventPrice"
                                                type="number"
                                                min={0}
                                                placeholder="Enter price"
                                                // value={price}
                                                // onChange={(e: any) => setEventPrice(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                                            />
                                            <ErrorMessage name="eventPrice" component="p" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">Capacity</label>
                                            <Field
                                                name="capacity"
                                                type="number"
                                                min={1}
                                                placeholder="Enter capacity"
                                                // value={capacity}
                                                // onChange={(e: any) => setCapacity(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                                            />
                                            <ErrorMessage name="capacity" component="p" className="text-red-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Tags Section */}
                                    <div className="mb-8">
                                        <label className="block text-gray-700 text-sm font-semibold mb-2">Tags</label>
                                        <p className="text-gray-500 mb-2">Improve discoverability of your event by adding tags relevant to the subject matter.</p>
                                        <div className="flex items-center mb-4">
                                            <Field
                                                name="tagInput"
                                                placeholder="Add search keywords to your event"
                                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const { tagInput, tags } = values;
                                                    if (tagInput && tags.length < 25) {
                                                        setFieldValue("tags", [...tags, tagInput]);
                                                        setFieldValue("tagInput", ''); // Clear input
                                                    }
                                                }}
                                                className="bg-gray-200 text-gray-700 ml-2 px-4 py-2 rounded-lg hover:bg-gray-300"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <ErrorMessage name="tags" component="p" className="text-red-500 text-sm" />
                                        <div className="flex flex-wrap gap-2">
                                            {values.tags.map((tag: any, index: any) => (
                                                <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">{values.tags.length}/25 tags</p>
                                    </div>

                                    {/* Location Section */}
                                    <div className="mb-12">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Location</h3>
                                        <p className="text-gray-600 mb-6">Help people in the area discover your event and let attendees know where to show up.</p>
                                        <div className="flex space-x-3 mb-6">
                                            <button
                                                type="button"
                                                onClick={() => setFieldValue('locationType', 'Venue')}
                                                className={`py-2 px-4 rounded-lg ${values.locationType === 'Venue' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                            >
                                                Venue
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFieldValue('locationType', 'Online event')}
                                                className={`py-2 px-4 rounded-lg ${values.locationType === 'Online event' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                            >
                                                Online event
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFieldValue('locationType', 'To be announced')}
                                                className={`py-2 px-4 rounded-lg ${values.locationType === 'To be announced' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                            >
                                                To be announced
                                            </button>
                                        </div>
                                        {values.locationType === 'Venue' && (
                                            <div className="relative">
                                                <Field
                                                   name="venue"
                                                   type="text"
                                                   placeholder="Search for a venue or address"
                                                   className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:border-blue-500" 
                                                />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Event Type Selection */}
                                    <EventTypeButtons />

                                    {/* Conditionally Render Date and Time Details */}
                                    {values.eventType === 'Single Event' && (
                                        <>
                                            <p className="text-gray-500 mb-6">Single event happens once and can last multiple days.</p>

                                            {/* Event Date and Time Inputs */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">Event Starts</label>
                                                    <div className="flex space-x-2">
                                                        <Field
                                                            type="date"
                                                            name="eventStartDate"
                                                            // value={startDate}
                                                            // onChange={(e: any) => {setStartDate(e)}}
                                                            className="w-full border border-gray-300 rounded-lg p-2"
                                                        />
                                                        <Field
                                                            type="time"
                                                            name="eventStartTime"
                                                            // value={startTime}
                                                            // onChange={(e: any) => {setStartTime(e)}}
                                                            className="w-full border border-gray-300 rounded-lg p-2"
                                                        />
                                                    </div>
                                                    <ErrorMessage name="eventStartDate" component="p" className="text-red-500 text-sm" />
                                                    <ErrorMessage name="eventStartTime" component="p" className="text-red-500 text-sm" />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">Event Ends</label>
                                                    <div className="flex space-x-2">
                                                        <Field
                                                            type="date"
                                                            name="eventEndDate"
                                                            // value={endDate}
                                                            // onChange={(e: any) => {setEndDate(e)}}
                                                            className="w-full border border-gray-300 rounded-lg p-2"
                                                        />
                                                        <Field
                                                            type="time"
                                                            name="eventEndTime"
                                                            // value={endTime}
                                                            // onChange={(e: any) => {setEndTime(e)}}
                                                            className="w-full border border-gray-300 rounded-lg p-2"
                                                        />
                                                    </div>
                                                    <ErrorMessage name="eventEndDate" component="p" className="text-red-500 text-sm" />
                                                    <ErrorMessage name="eventEndTime" component="p" className="text-red-500 text-sm" />
                                                </div>
                                            </div>

                                            {/* Display Time Checkboxes */}
                                            <div className="flex items-center space-x-4 mb-6">
                                                <label className="flex items-center text-gray-700">
                                                    <Field type="checkbox" name="displayStartTime" className="mr-2" />
                                                    Display start time
                                                </label>
                                                <label className="flex items-center text-gray-700">
                                                    <Field type="checkbox" name="displayEndTime" className="mr-2" />
                                                    Display end time
                                                </label>
                                            </div>

                                            {/* Time Zone Selection */}
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-medium mb-2">Time Zone</label>
                                                <Field
                                                    as="select"
                                                    name="timeZone"
                                                    // value={timezone}
                                                    // onChange={(e: any) => {setTimezone(e)}}
                                                    className="w-full border border-gray-300 rounded-lg p-2"
                                                >
                                                    <option value="">Select Time Zone</option>
                                                    <option value="GMT-0400">GMT-0400 United States (New York)</option>
                                                    <option value="GMT+0100">GMT+0100 United Kingdom (London)</option>
                                                    <option value="GMT+0900">GMT+0900 Japan (Tokyo)</option>
                                                </Field>
                                                <ErrorMessage name="timeZone" component="p" className="text-red-500 text-sm" />
                                            </div>

                                            {/* Event Page Language Selection */}
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-medium mb-2">Event Page Language</label>
                                                <Field
                                                    as="select"
                                                    name="eventPageLanguage"
                                                    // value={language}
                                                    // onChange={(e: any) => {setLanguage(e)}}
                                                    className="w-full border border-gray-300 rounded-lg p-2"
                                                >
                                                    <option value="">Select Language</option>
                                                    <option value="English">English (US)</option>
                                                    <option value="Spanish">Spanish</option>
                                                    <option value="French">French</option>
                                                </Field>
                                                <ErrorMessage name="eventPageLanguage" component="p" className="text-red-500 text-sm" />
                                            </div>
                                        </>
                                    )}

                                    {/* Buttons */}
                                    <div className="flex justify-between">
                                        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                                            Discard
                                        </button>
                                        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                                            Save & Continue
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

            ) : 
            
            (
                <>
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
                                        // value={summary}
                                        // onChange={(e) => setSummary(e.target.value)}
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

                                {/* Action Buttons */}
                                <div className="mt-8 flex justify-between items-center">
                                    {/* Go Back Button */}
                                    <button
                                        onClick={() => setIsSaved(false)}
                                        className="text-blue-500 font-semibold hover:text-blue-700"
                                    >
                                        Go Back
                                    </button>

                                    {/* Submit Now Button */}
                                    <button
                                        className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-500"
                                    >
                                        Submit Now
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>                
                </>
            )};
        </>
    )
}