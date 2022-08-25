import React, { useState } from 'react';
import UserForm from './UserForm';
import { User } from '../../utils/constants';
import Loading from '../Loading';
/**
 * Interface for EditUser
 *
 * @interface Props
 */
interface Props {
    onSuccess: () => void;
    userId: string;
    data?: User;
    onClose: () => void;
}
/**
 * EditUser component
 *
 * @param {Props} props EditUser Props
 * @returns EditUser
 */
const EditUser = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    /**
     * To update a user details into DB
     *
     * @param {User} data User data to be updated
     */
    const updateUser = async (data: User) => {
        setIsLoading(true);

    }

    return (
        <>
            <UserForm
                modalTitle={'Update'}
                callbackFn={updateUser}
                userData={props.data}
                onClose={props.onClose}
            />
            {
                isLoading &&
                <Loading loadingText='Updating user...' />
            }
        </>
    );
}

export default EditUser;