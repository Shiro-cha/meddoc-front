import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { axiosPrivate } from '../../api/axios';
import Cookies from 'js-cookie';
import { toast } from '../Toast/Toast';

export default function BasicMenu({ messages, refreshNotifications }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Modify_notif = "/notification/seen"


    const mark_view_button = async (notificationId) => {
        try {
            const accessToken = Cookies.get('jwtToken'); // Remove the extra '<' character

            await axiosPrivate.put(`${Modify_notif}/${notificationId}`, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            refreshNotifications();

        } catch (error) {
            console.log("error", "Une erreur est survenue !");
        }
    };

    return (
        <>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{}}
                >
                    <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg ">
                        {messages?.length > 0 ? (
                            <>
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM1.866 8.832a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z" />
                                </svg>
                                <div class={`absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white ${messages.length > 0 ? 'bg-red-500' : 'bg-gray-500'} border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900`}>
                                    {messages?.length}
                                </div>
                            </>
                        ) : (
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z" />
                            </svg>
                        )}


                    </button>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    style={{
                        padding: 0,

                    }}

                >
                    <div
                        class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                    >
                        Notifications
                    </div>
                    {messages?.length > 0 ? (
                        messages?.map((message, index) => (
                            <div key={index} className="flex items-center w-full p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                <div className="ml-3 text-sm font-normal">{message.message}</div>
                                <button
                                    type="button"
                                    className="ml-auto bg-white text-gray-400 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                    data-collapse-toggle={`toast-${index}`}
                                    aria-label="Close"
                                    onClick={() => {
                                        mark_view_button(message?.id)
                                    }}
                                >

                                    <span className="sr-only">Close</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center w-full p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="ml-3 text-sm font-normal">Pas de notification(s)</div>
                        </div>
                    )}

                    {/* <button

                        className="w-full py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline flex items-center justify-center"
                    >
                        <div class="inline-flex items-center mx-auto">
                            <svg
                                aria-hidden="true"
                                class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                <path
                                    fill-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            Voir tous
                        </div>
                    </button> */}

                </Menu >
            </div >
        </>
    );
}