import React from 'react';
import './Loading.css';
/**
 * Interface for Loading
 *
 * @interface Props
 */
interface Props {
    loadingText: string;
}
/**
 * Loading component
 *
 * @param {Props} props Loading Props
 * @returns Loading
 */
const Loading = (props: Props) => {
    return (
        <div className='Loading-overlay'>
            <div className='Loader'>
                {/* <span className='Loading-text'>{props.loadingText}</span> */}
            </div>
        </div>
    )
};

export default Loading;