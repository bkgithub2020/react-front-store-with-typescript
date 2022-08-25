import React, { useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { User } from '../../utils/constants';
import Loading from '../Loading';
/**
 * Interface for AddUser
 *
 * @interface Props
 */
interface Props {
    onSuccess: () => void;
    onClose: () => void;
}
/**
 * AddUser component
 *
 * @param {Props} props AddUser Props
 * @returns AddUser Form
 */
const AddUser = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    /**
     * To store a new user to DB
     *
     * @param {User} data User data
     */
    const addUser = async (data: User) => {
        setIsLoading(true);
        await axios.post('/users/add', data)
            .then(function (response) {
                // setOpen(false);//Close popup
                // callback(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <>
            <UserForm
                modalTitle={'Add'}
                callbackFn={addUser}
                onClose={props.onClose}
            />
            {
                isLoading &&
                <Loading loadingText='Adding user...' />
            }
        </>
    );
}

export default AddUser;