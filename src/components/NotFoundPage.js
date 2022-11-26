import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/not-found.scss';

function NotFoundPage() {

    const navigate = useNavigate();
    const backToPreviousPage = () => {
        navigate('/');
    }

    return (
        <div className='not-found-page-wrapper'>
            <h1 className='not-found-text'>404 NOT FOUND</h1>
            <p className='not-found-back' onClick={backToPreviousPage}>Back to home page</p>
        </div>
    )


}


export default withRouter(NotFoundPage);