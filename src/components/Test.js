import React from 'react'
import '../styles/test.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function Test() {
    return (
        <>
        <FontAwesomeIcon icon="fa-brands fa-twitter" /> abc
            <h2>Video Player</h2>
            <p>Hover over to play the video</p>
            <div class="container-card">
                <div href="#" class="like-button" title="Like Button">
                <div class="fa fa-heart fa-1x" style={{background: "green", width: "10px", height: "10px", borderRadius: "50%"}}></div>
                </div>
                <img src="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/38782965_1075605335940980_4601407912579956736_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=dVcw-RkvMF8AX_2QIqM&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCd8aXghjplciQQq5gBWw0sNA0brTien1H7nPAexDnP2g&oe=6386C7CF" alt="Beautiful Image" class="image"/>
                    <div class="overlay">
                        <button href="#" class="play-icon" title="Video Play">
                        
                        </button>
                    </div>
            </div>
        </>
    )
}

export default Test