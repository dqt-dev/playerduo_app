import React, { useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import '../styles/listuser.css';



function ListUser ()
{
    const [show, setShow] = useState(false)

    return (
        <>
            <Header />
            <div>
                <div className='gameName'>
                    <div >
                        <img style={{ width: "44px", height: "44px" }} scr = "https://data.lita.cool/mgr/skill/202210311709/20221031171552.jpeg"></img>
                    </div>
                    <div className='text-24'>
                        Liên quân Mobile
                    </div>
                </div>
                <div className='userFill'>
                    <div style={{color: "#999999"}}>
                        Lọc: 
                    </div>
                    <div onClick={() => setShow(!show) } className='suggestFill display-flex' style={{position: "relative"}}>
                        <div>
                            Đề cử
                        </div>
                        <img className='iconFill' src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAkxJREFUeF7tVs2K1EAQ/iqju46gB6/iYSE47EzSK4L7AKK+wepB0Gfw5+7Bqz/P4IIg6hOo+ACuh9lOJsNqwIN49SDCOOikJLMeRB3MJtOdhq6G3Kq6vvr6+6pC8PyQ5/1DCBAFeM6AWMBzAcgQFAuIBTxnQCzguQBkC4gFxAKeMyAW8FwAsgXEAmIBzxkQC3guANkCYgGTFujH8VUA5Xe0Th1mnhLRdpYkj+vkV8kxpoB1pc4S81ugsc14xry5l6blXUs/5giIoitE9GQZiIloa6T182Xc9ecdxgjo9XrHOisrIwCnGgL/iNmsn2XZ14b3/DPdGAFltYFS57koXoIoqAWeuaAguDjS+nWt/ApJRgko6/eVugfmWxWw/B1CdD/T+nat3IpJxgkIw3D1cLf7hgBVEdM8jAH9fTLZzPN8epC8g8YaJ6AEtK5UREWxA6IjlQAyf+MgODfWOq0U3yDICgHzeRDHNxh4UAUrATdHSfKwSmzTGGsElP8D/Th+AeDCf0C/ypLk0r4LzB+bBOD0xsbJQ0WhAZxY0NrnH0Gg3u3ufjLf+n4FqwTMt0IcbwF4uqDBy1mSPLPVfCsEzIdiFD0iomu/N8rM2+M0vW6z+dYICMPw+Gq3O2Rg7ReID9PJ5Eye51+8IGC+FQaDsCC6CyJGp3NnPBy+t918awpoo9FFNa0PQZeaFwW0sQZFAY4xIDPAsQexDkcUYJ1yxwqKAhx7EOtwRAHWKXesoCjAsQexDkcUYJ1yxwqKAhx7EOtwRAHWKXesoPcK+AkTeXtBw46RNwAAAABJRU5ErkJggg==">
                        </img>

                        {show && <div> </div>}
                        <div className='list_fill' style={{zIndex: "5", position: "absolute", top: "45px", left:"0"}}>
                        <div>
                            Đề cử
                        </div>
                        <div>
                            Mới tham gia
                        </div>
                        <div>
                            Đánh giá cao nhất
                        </div>
                        <div>
                            Giá thấp nhất
                        </div>
                        <div>
                            Giá cao nhất
                        </div>
                    </div>
                    </div>
                    <div style={{width: "3px", height: "24px", backgroundColor: "#E5E5E5", marginLeft: "18px", marginRight: "6px", borderRadius: "2px"}}>
                        
                    </div>
                    <div className='sexFill display-flex'>
                        <div>
                            Giới tính
                        </div>
                        <img className='iconFill' src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAkxJREFUeF7tVs2K1EAQ/iqju46gB6/iYSE47EzSK4L7AKK+wepB0Gfw5+7Bqz/P4IIg6hOo+ACuh9lOJsNqwIN49SDCOOikJLMeRB3MJtOdhq6G3Kq6vvr6+6pC8PyQ5/1DCBAFeM6AWMBzAcgQFAuIBTxnQCzguQBkC4gFxAKeMyAW8FwAsgXEAmIBzxkQC3guANkCYgGTFujH8VUA5Xe0Th1mnhLRdpYkj+vkV8kxpoB1pc4S81ugsc14xry5l6blXUs/5giIoitE9GQZiIloa6T182Xc9ecdxgjo9XrHOisrIwCnGgL/iNmsn2XZ14b3/DPdGAFltYFS57koXoIoqAWeuaAguDjS+nWt/ApJRgko6/eVugfmWxWw/B1CdD/T+nat3IpJxgkIw3D1cLf7hgBVEdM8jAH9fTLZzPN8epC8g8YaJ6AEtK5UREWxA6IjlQAyf+MgODfWOq0U3yDICgHzeRDHNxh4UAUrATdHSfKwSmzTGGsElP8D/Th+AeDCf0C/ypLk0r4LzB+bBOD0xsbJQ0WhAZxY0NrnH0Gg3u3ufjLf+n4FqwTMt0IcbwF4uqDBy1mSPLPVfCsEzIdiFD0iomu/N8rM2+M0vW6z+dYICMPw+Gq3O2Rg7ReID9PJ5Eye51+8IGC+FQaDsCC6CyJGp3NnPBy+t918awpoo9FFNa0PQZeaFwW0sQZFAY4xIDPAsQexDkcUYJ1yxwqKAhx7EOtwRAHWKXesoCjAsQexDkcUYJ1yxwqKAhx7EOtwRAHWKXesoPcK+AkTeXtBw46RNwAAAABJRU5ErkJggg==">

                        </img>
                    </div>
                    <div className='levelFill display-flex'>
                        <div>
                            Hạng
                        </div>
                        <img className='iconFill' src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAkxJREFUeF7tVs2K1EAQ/iqju46gB6/iYSE47EzSK4L7AKK+wepB0Gfw5+7Bqz/P4IIg6hOo+ACuh9lOJsNqwIN49SDCOOikJLMeRB3MJtOdhq6G3Kq6vvr6+6pC8PyQ5/1DCBAFeM6AWMBzAcgQFAuIBTxnQCzguQBkC4gFxAKeMyAW8FwAsgXEAmIBzxkQC3guANkCYgGTFujH8VUA5Xe0Th1mnhLRdpYkj+vkV8kxpoB1pc4S81ugsc14xry5l6blXUs/5giIoitE9GQZiIloa6T182Xc9ecdxgjo9XrHOisrIwCnGgL/iNmsn2XZ14b3/DPdGAFltYFS57koXoIoqAWeuaAguDjS+nWt/ApJRgko6/eVugfmWxWw/B1CdD/T+nat3IpJxgkIw3D1cLf7hgBVEdM8jAH9fTLZzPN8epC8g8YaJ6AEtK5UREWxA6IjlQAyf+MgODfWOq0U3yDICgHzeRDHNxh4UAUrATdHSfKwSmzTGGsElP8D/Th+AeDCf0C/ypLk0r4LzB+bBOD0xsbJQ0WhAZxY0NrnH0Gg3u3ufjLf+n4FqwTMt0IcbwF4uqDBy1mSPLPVfCsEzIdiFD0iomu/N8rM2+M0vW6z+dYICMPw+Gq3O2Rg7ReID9PJ5Eye51+8IGC+FQaDsCC6CyJGp3NnPBy+t918awpoo9FFNa0PQZeaFwW0sQZFAY4xIDPAsQexDkcUYJ1yxwqKAhx7EOtwRAHWKXesoCjAsQexDkcUYJ1yxwqKAhx7EOtwRAHWKXesoPcK+AkTeXtBw46RNwAAAABJRU5ErkJggg==">

                        </img>
                    </div>
                    <div className='positionFill display-flex'>
                        <div>
                            Vị trí sở trường
                        </div>
                        <img className='iconFill' src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAkxJREFUeF7tVs2K1EAQ/iqju46gB6/iYSE47EzSK4L7AKK+wepB0Gfw5+7Bqz/P4IIg6hOo+ACuh9lOJsNqwIN49SDCOOikJLMeRB3MJtOdhq6G3Kq6vvr6+6pC8PyQ5/1DCBAFeM6AWMBzAcgQFAuIBTxnQCzguQBkC4gFxAKeMyAW8FwAsgXEAmIBzxkQC3guANkCYgGTFujH8VUA5Xe0Th1mnhLRdpYkj+vkV8kxpoB1pc4S81ugsc14xry5l6blXUs/5giIoitE9GQZiIloa6T182Xc9ecdxgjo9XrHOisrIwCnGgL/iNmsn2XZ14b3/DPdGAFltYFS57koXoIoqAWeuaAguDjS+nWt/ApJRgko6/eVugfmWxWw/B1CdD/T+nat3IpJxgkIw3D1cLf7hgBVEdM8jAH9fTLZzPN8epC8g8YaJ6AEtK5UREWxA6IjlQAyf+MgODfWOq0U3yDICgHzeRDHNxh4UAUrATdHSfKwSmzTGGsElP8D/Th+AeDCf0C/ypLk0r4LzB+bBOD0xsbJQ0WhAZxY0NrnH0Gg3u3ufjLf+n4FqwTMt0IcbwF4uqDBy1mSPLPVfCsEzIdiFD0iomu/N8rM2+M0vW6z+dYICMPw+Gq3O2Rg7ReID9PJ5Eye51+8IGC+FQaDsCC6CyJGp3NnPBy+t918awpoo9FFNa0PQZeaFwW0sQZFAY4xIDPAsQexDkcUYJ1yxwqKAhx7EOtwRAHWKXesoCjAsQexDkcUYJ1yxwqKAhx7EOtwRAHWKXesoPcK+AkTeXtBw46RNwAAAABJRU5ErkJggg==">
                        
                        </img>
                    </div>
                    <div style={{marginLeft: "30px", fontSize: "20px", color: "#6B39FF"}}>Reset</div>
                </div>
                <div style={{display: "flex", flexWrap: "wrap", marginTop: "18px", paddingLeft: "40px", paddingRight: "40px"}}>
                <div className='towUser-inline' style={{}}>
                    <a style={{display: "flex"}}>
                        <div className='img-stateIcon-voiceIcon' style={{width:"200px", height: "200px"}}>
                            <div>
                                <img className='imgUser' src='https://data.lita.cool/user/1809766/album/photo_20220407_155201_524_R70158.jpg?t=1649317921524'>

                                </img>
                            </div>
                            <div className='stateIcon'>
                            </div>
                            <div className='voiceIcon-time'>
                                <img style={{width: "16px", height: "16px"}} src='data:image/png;base64,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'>
                                </img>
                                <div style={{width: "16px", height: "18px", fontSize: "12px", marginLeft: "15px"}}>
                                    10'
                                </div>

                            </div>
                        </div>
                        <div className='infoUser'>
                            <div className='display-flex1'>
                                <div style={{fontWeight: "700", fontSize: "18px", width: "100%"}}>
                                    BF • Na Gấu 🧸 
                                </div>
                                <div style={{width: "auto"}}>
                                </div>
                                <img style={{width:"14px", height: "14px", display: "block", objectFit: "cover", maxWidth: "100%", marginTop: "auto", marginBottom: "auto", }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAAXNSR0IArs4c6QAAAtFJREFUSEulVE1IVFEU/s4oKEHUoo39QKGTQeQfKFaLFlGQFARBCC1CmXEEscCCNi1mEa1DCZoCyUWI/bqqKC2VrMhVUEGEjVOmtonchPDuPSfu873nnTfTc6C7eT/33PN95zvfuYQSV7ZbdsofjIpGBZfjeHyIZks5SqUEmZivHfKMFY6IBiB4Hh+mo6WcLQkgm5BWdvBGGDAA5kmC/fERerseSGkAnfKYFY6xYc+A93xSe5/a/hvgW1KalYN3hrUNYCohQUvtQ5qJAomsQO5K2dxTjLPGIV8aWyZhTO4px2G6R6a2oisPQNJSubSMamcFcWHUgnFKKzS7SS39XTANsOkFY0ZrPIgxPgvjy4YqzO66TSs+Gkm/VCzlcE002lhjhzDIlUN5Sf3k3reRyez7vbArM3vEEBF8Z4WXsUr00OIlOS0ORvxAN4GXxNbdfw/2/Bgr1q3KPi9I0c+LUqc13vvMAjksxgHbIlIF52wgT4FyoNXtwWKf9LDCABt5LAZ5rrGSh//nEVi1spGpt3GKrgdNXjgvSe0gIwIK62++3SThRnugAaByrSvMSDVO0i1DPs9F8z1yVhiDWiHmu8ZuatAHk9hIKJ6b1hrP0Oisn6ChwEVh8+a6JcUKN6yJdV1jN89lLGv//FgSdNeNU8bOWXTQcklZYI0q3+th54Qn2lTCGosNY7Q1TLgowFxC5lljW4FdveEqmIFViX7Uj9P2dQF+dcmmZY3fxViHLWxPuKlqYwybq8doOVKiuaQcEI3pf1kxrL99hZQBB/e9oNeRALmEdDEjU6BzyJLB1OYPn7HnzWiApPRrhV776jCaC7tXdsa8a4WUMFoC9p5NmTHQNEnnoiVKyCArdFilfyTgcs0wjdoHP52Qk8rBFWjsta6ZkaYpao8EyCalQRw8gmBFO7hasxt3KE3m/ixYkpbYh2mcEY0LzNgCoL1hgl7ZgX8B2qSUB/vv33EAAAAASUVORK5CYII='>
                                </img>
                                <div style={{fontSize: "14px", color: "#333333", fontWeight: "700", textAlign: "center", marginLeft: "5px", paddingTop: "3px"}}>
                                    4.99
                                </div>
                                <div style={{fontSize: "14px", color: "#999999", textAlign: "center", marginLeft: "3px", paddingTop: "3px"}}>
                                    (1044)
                                </div>
                            </div>
                            <div className='display-flex1' style={{ height: "20px", marginTop: "16px"}}>
                                <img style={{width: "20px", height: "20px" }} src='data:image/png;base64,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'>
                                </img>
                                <div style={{position: "relative", bottom: "3px", marginLeft: "8px" }}>
                                    Level Rank
                                </div>
                            </div>
                            <div style={{marginTop: "16px"}}>
                                Chuyên đi mid và là một sp chân chính. etg kj bne erg kb nkj ng rgkoig ekjbjkwgn
                            </div>

                            <div style={{display: "flex", position: "absolute", bottom: "10px"}}>
                                <div >
                                    <img style={{width: "20px", height: "20px"}} src='data:image/png;base64,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'></img>
                                </div>
                                <div style={{color:"#FF9B00", fontSize: "18px", marginLeft: "4px" }}>
                                    150
                                </div>
                                <div style={{marginLeft: "2px"}}>
                                    /Trận
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className='towUser-inline' style={{ }}>
                    <a style={{display: "flex"}}>
                        <div className='img-stateIcon-voiceIcon' style={{width:"200px", height: "200px"}}>
                            <div>
                                <img className='imgUser' src='https://data.lita.cool/user/1809766/album/photo_20220407_155201_524_R70158.jpg?t=1649317921524'>

                                </img>
                            </div>
                            <div className='stateIcon'>
                            </div>
                            <div className='voiceIcon-time'>
                                <img style={{width: "16px", height: "16px"}} src='data:image/png;base64,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'>
                                </img>
                                <div style={{width: "16px", height: "18px", fontSize: "12px", marginLeft: "15px"}}>
                                    10'
                                </div>

                            </div>
                        </div>
                        <div className='infoUser'>
                            <div className='display-flex1'>
                                <div style={{fontWeight: "700", fontSize: "18px", width: "100%"}}>
                                    BF • Na Gấu 🧸 
                                </div>
                                <div style={{width: "auto"}}>
                                </div>
                                <img style={{width:"14px", height: "14px", display: "block", objectFit: "cover", maxWidth: "100%", marginTop: "auto", marginBottom: "auto", }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAAXNSR0IArs4c6QAAAtFJREFUSEulVE1IVFEU/s4oKEHUoo39QKGTQeQfKFaLFlGQFARBCC1CmXEEscCCNi1mEa1DCZoCyUWI/bqqKC2VrMhVUEGEjVOmtonchPDuPSfu873nnTfTc6C7eT/33PN95zvfuYQSV7ZbdsofjIpGBZfjeHyIZks5SqUEmZivHfKMFY6IBiB4Hh+mo6WcLQkgm5BWdvBGGDAA5kmC/fERerseSGkAnfKYFY6xYc+A93xSe5/a/hvgW1KalYN3hrUNYCohQUvtQ5qJAomsQO5K2dxTjLPGIV8aWyZhTO4px2G6R6a2oisPQNJSubSMamcFcWHUgnFKKzS7SS39XTANsOkFY0ZrPIgxPgvjy4YqzO66TSs+Gkm/VCzlcE002lhjhzDIlUN5Sf3k3reRyez7vbArM3vEEBF8Z4WXsUr00OIlOS0ORvxAN4GXxNbdfw/2/Bgr1q3KPi9I0c+LUqc13vvMAjksxgHbIlIF52wgT4FyoNXtwWKf9LDCABt5LAZ5rrGSh//nEVi1spGpt3GKrgdNXjgvSe0gIwIK62++3SThRnugAaByrSvMSDVO0i1DPs9F8z1yVhiDWiHmu8ZuatAHk9hIKJ6b1hrP0Oisn6ChwEVh8+a6JcUKN6yJdV1jN89lLGv//FgSdNeNU8bOWXTQcklZYI0q3+th54Qn2lTCGosNY7Q1TLgowFxC5lljW4FdveEqmIFViX7Uj9P2dQF+dcmmZY3fxViHLWxPuKlqYwybq8doOVKiuaQcEI3pf1kxrL99hZQBB/e9oNeRALmEdDEjU6BzyJLB1OYPn7HnzWiApPRrhV776jCaC7tXdsa8a4WUMFoC9p5NmTHQNEnnoiVKyCArdFilfyTgcs0wjdoHP52Qk8rBFWjsta6ZkaYpao8EyCalQRw8gmBFO7hasxt3KE3m/ixYkpbYh2mcEY0LzNgCoL1hgl7ZgX8B2qSUB/vv33EAAAAASUVORK5CYII='>
                                </img>
                                <div style={{fontSize: "14px", color: "#333333", fontWeight: "700", textAlign: "center", marginLeft: "5px", paddingTop: "3px"}}>
                                    4.99
                                </div>
                                <div style={{fontSize: "14px", color: "#999999", textAlign: "center", marginLeft: "3px", paddingTop: "3px"}}>
                                    (1044)
                                </div>
                            </div>
                            <div className='display-flex1' style={{ height: "20px", marginTop: "16px"}}>
                                <img style={{width: "20px", height: "20px" }} src='data:image/png;base64,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'>
                                </img>
                                <div style={{position: "relative", bottom: "3px", marginLeft: "8px" }}>
                                    Level Rank
                                </div>
                            </div>
                            <div style={{marginTop: "16px"}}>
                                Chuyên đi mid và là một sp chân chính.
                            </div>

                            <div style={{display: "flex", position: "absolute", bottom: "10px"}}>
                                <div >
                                    <img style={{width: "20px", height: "20px"}} src='data:image/png;base64,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'></img>
                                </div>
                                <div style={{color:"#FF9B00", fontSize: "18px", marginLeft: "4px" }}>
                                    150
                                </div>
                                <div style={{marginLeft: "2px"}}>
                                    /Trận
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className='towUser-inline' style={{ }}>
                    <a style={{display: "flex"}}>
                        <div className='img-stateIcon-voiceIcon' style={{width:"200px", height: "200px"}}>
                            <div>
                                <img className='imgUser' src='https://data.lita.cool/user/1809766/album/photo_20220407_155201_524_R70158.jpg?t=1649317921524'>

                                </img>
                            </div>
                            <div className='stateIcon'>
                            </div>
                            <div className='voiceIcon-time'>
                                <img style={{width: "16px", height: "16px"}} src='data:image/png;base64,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'>
                                </img>
                                <div style={{width: "16px", height: "18px", fontSize: "12px", marginLeft: "15px"}}>
                                    10'
                                </div>

                            </div>
                        </div>
                        <div className='infoUser'>
                            <div className='display-flex1'>
                                <div style={{fontWeight: "700", fontSize: "18px", width: "100%"}}>
                                    BF • Na Gấu 🧸 
                                </div>
                                <div style={{width: "auto"}}>
                                </div>
                                <img style={{width:"14px", height: "14px", display: "block", objectFit: "cover", maxWidth: "100%", marginTop: "auto", marginBottom: "auto", }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAAXNSR0IArs4c6QAAAtFJREFUSEulVE1IVFEU/s4oKEHUoo39QKGTQeQfKFaLFlGQFARBCC1CmXEEscCCNi1mEa1DCZoCyUWI/bqqKC2VrMhVUEGEjVOmtonchPDuPSfu873nnTfTc6C7eT/33PN95zvfuYQSV7ZbdsofjIpGBZfjeHyIZks5SqUEmZivHfKMFY6IBiB4Hh+mo6WcLQkgm5BWdvBGGDAA5kmC/fERerseSGkAnfKYFY6xYc+A93xSe5/a/hvgW1KalYN3hrUNYCohQUvtQ5qJAomsQO5K2dxTjLPGIV8aWyZhTO4px2G6R6a2oisPQNJSubSMamcFcWHUgnFKKzS7SS39XTANsOkFY0ZrPIgxPgvjy4YqzO66TSs+Gkm/VCzlcE002lhjhzDIlUN5Sf3k3reRyez7vbArM3vEEBF8Z4WXsUr00OIlOS0ORvxAN4GXxNbdfw/2/Bgr1q3KPi9I0c+LUqc13vvMAjksxgHbIlIF52wgT4FyoNXtwWKf9LDCABt5LAZ5rrGSh//nEVi1spGpt3GKrgdNXjgvSe0gIwIK62++3SThRnugAaByrSvMSDVO0i1DPs9F8z1yVhiDWiHmu8ZuatAHk9hIKJ6b1hrP0Oisn6ChwEVh8+a6JcUKN6yJdV1jN89lLGv//FgSdNeNU8bOWXTQcklZYI0q3+th54Qn2lTCGosNY7Q1TLgowFxC5lljW4FdveEqmIFViX7Uj9P2dQF+dcmmZY3fxViHLWxPuKlqYwybq8doOVKiuaQcEI3pf1kxrL99hZQBB/e9oNeRALmEdDEjU6BzyJLB1OYPn7HnzWiApPRrhV776jCaC7tXdsa8a4WUMFoC9p5NmTHQNEnnoiVKyCArdFilfyTgcs0wjdoHP52Qk8rBFWjsta6ZkaYpao8EyCalQRw8gmBFO7hasxt3KE3m/ixYkpbYh2mcEY0LzNgCoL1hgl7ZgX8B2qSUB/vv33EAAAAASUVORK5CYII='>
                                </img>
                                <div style={{fontSize: "14px", color: "#333333", fontWeight: "700", textAlign: "center", marginLeft: "5px", paddingTop: "3px"}}>
                                    4.99
                                </div>
                                <div style={{fontSize: "14px", color: "#999999", textAlign: "center", marginLeft: "3px", paddingTop: "3px"}}>
                                    (1044)
                                </div>
                            </div>
                            <div className='display-flex1' style={{ height: "20px", marginTop: "16px"}}>
                                <img style={{width: "20px", height: "20px" }} src='data:image/png;base64,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'>
                                </img>
                                <div style={{position: "relative", bottom: "3px", marginLeft: "8px" }}>
                                    Level Rank
                                </div>
                            </div>
                            <div style={{marginTop: "16px"}}>
                                Chuyên đi mid và là một sp chân chính.
                            </div>

                            <div style={{display: "flex", position: "absolute", bottom: "10px"}}>
                                <div >
                                    <img style={{width: "20px", height: "20px"}} src='data:image/png;base64,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'></img>
                                </div>
                                <div style={{color:"#FF9B00", fontSize: "18px", marginLeft: "4px" }}>
                                    150
                                </div>
                                <div style={{marginLeft: "2px"}}>
                                    /Trận
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className='towUser-inline' style={{ }}>
                    <a style={{display: "flex"}}>
                        <div className='img-stateIcon-voiceIcon' style={{width:"200px", height: "200px"}}>
                            <div>
                                <img className='imgUser' src='https://data.lita.cool/user/1809766/album/photo_20220407_155201_524_R70158.jpg?t=1649317921524'>

                                </img>
                            </div>
                            <div className='stateIcon'>
                            </div>
                            <div className='voiceIcon-time'>
                                <img style={{width: "16px", height: "16px"}} src='data:image/png;base64,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'>
                                </img>
                                <div style={{width: "16px", height: "18px", fontSize: "12px", marginLeft: "15px"}}>
                                    10'
                                </div>

                            </div>
                        </div>
                        <div className='infoUser'>
                            <div className='display-flex1'>
                                <div style={{fontWeight: "700", fontSize: "18px", width: "100%"}}>
                                    BF • Na Gấu 🧸 
                                </div>
                                <div style={{width: "auto"}}>
                                </div>
                                <img style={{width:"14px", height: "14px", display: "block", objectFit: "cover", maxWidth: "100%", marginTop: "auto", marginBottom: "auto", }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAAXNSR0IArs4c6QAAAtFJREFUSEulVE1IVFEU/s4oKEHUoo39QKGTQeQfKFaLFlGQFARBCC1CmXEEscCCNi1mEa1DCZoCyUWI/bqqKC2VrMhVUEGEjVOmtonchPDuPSfu873nnTfTc6C7eT/33PN95zvfuYQSV7ZbdsofjIpGBZfjeHyIZks5SqUEmZivHfKMFY6IBiB4Hh+mo6WcLQkgm5BWdvBGGDAA5kmC/fERerseSGkAnfKYFY6xYc+A93xSe5/a/hvgW1KalYN3hrUNYCohQUvtQ5qJAomsQO5K2dxTjLPGIV8aWyZhTO4px2G6R6a2oisPQNJSubSMamcFcWHUgnFKKzS7SS39XTANsOkFY0ZrPIgxPgvjy4YqzO66TSs+Gkm/VCzlcE002lhjhzDIlUN5Sf3k3reRyez7vbArM3vEEBF8Z4WXsUr00OIlOS0ORvxAN4GXxNbdfw/2/Bgr1q3KPi9I0c+LUqc13vvMAjksxgHbIlIF52wgT4FyoNXtwWKf9LDCABt5LAZ5rrGSh//nEVi1spGpt3GKrgdNXjgvSe0gIwIK62++3SThRnugAaByrSvMSDVO0i1DPs9F8z1yVhiDWiHmu8ZuatAHk9hIKJ6b1hrP0Oisn6ChwEVh8+a6JcUKN6yJdV1jN89lLGv//FgSdNeNU8bOWXTQcklZYI0q3+th54Qn2lTCGosNY7Q1TLgowFxC5lljW4FdveEqmIFViX7Uj9P2dQF+dcmmZY3fxViHLWxPuKlqYwybq8doOVKiuaQcEI3pf1kxrL99hZQBB/e9oNeRALmEdDEjU6BzyJLB1OYPn7HnzWiApPRrhV776jCaC7tXdsa8a4WUMFoC9p5NmTHQNEnnoiVKyCArdFilfyTgcs0wjdoHP52Qk8rBFWjsta6ZkaYpao8EyCalQRw8gmBFO7hasxt3KE3m/ixYkpbYh2mcEY0LzNgCoL1hgl7ZgX8B2qSUB/vv33EAAAAASUVORK5CYII='>
                                </img>
                                <div style={{fontSize: "14px", color: "#333333", fontWeight: "700", textAlign: "center", marginLeft: "5px", paddingTop: "3px"}}>
                                    4.99
                                </div>
                                <div style={{fontSize: "14px", color: "#999999", textAlign: "center", marginLeft: "3px", paddingTop: "3px"}}>
                                    (1044)
                                </div>
                            </div>
                            <div className='display-flex1' style={{ height: "20px", marginTop: "16px"}}>
                                <img style={{width: "20px", height: "20px" }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABgdJREFUWEfNmH1sE3UYx7/Xu971unZ929q94AYyYGxkDFQgQURFY0zEGP9AeYkzgSB/SZDgH/wnxiAmYmL0LxExgiyYGAMkJAQlSBCHOMgIjA1lEzfXtVvb9e3au+ud+bXbWNde15fN+Eua6x/Py+ee57nf7/c8FIpc2zr9yxmG3sDTWGNk6aVmlp5n45lyigL8QiIYjMuDETHRLchKR1xVf2xvtd0oxhWVS0lVVWpbl281C3qDgdGtKmOZxeUcXWM3MiYDo9MV4jAmK4pfkCNBIfFPWJJ7YrJyTVASF0+22q9SFKVq2UoCnlJV+kzX2HqOop5mGepxk55ebOGZKhvPGFlal/MlCoHMJislVNUnSNExQXaHpURvXFI6ReCnjS2WS5soKkEdHIhH7Ua9gdaR5Px/VkJRVV9UilFHAqpmeHPhxmUFw2ERw6Hx3/h/FSpcZg5VZhYuEwunmUWViQXHFFQRk65nBIyKCXgiItxB8SFQWIRfkAsKt5VnkqCucfCJp5Glc9rJALzSH4AnJMIdFuEOiQjFE5oGKB0FvZ4Fw3LQsyxo8uTYpLwUF5EQ45BEETJ5SiJUJTNZZo6ejDaBXjvfmuYvA/CdM/eyAjEsmwHD6BkA+ZauClmSM6BlUUzzd3jjovwATVYbklAsB0bPAnP1DakEXIQkxkFgD6yryA+w+tH0Nymo4EoQ3tecrqyZ4mIA7anygy89awXhzhlgFQd80pQqyT23AXe8IK5J4TkBZCjgUCPQUJbycy+iYt9tBaou9xaS7RXmBLCtFni1Ot3dNz1+tPtMYPT6gkI564At5cD7i7MxqNj9ixf9rPO/AawzAK9UAx1+oCOQ8mlmgE+bAbtGkEYEGTt+DUI125Pyq63AE1bgtBt4EMvOXXQEt9YAm2pSRgdiwM8+YJUVaDDmDlC3P4brIRrPOvWoNaRkTw0BJwZnGXCtDXh3YUHZ0hT+4E4M5/8KwmSxJg+DqavoCDpY4GjL7AC+dLYPnqgMk80Os80xO4DEypctQEX6CxdMPByVsPFsf1LP5qqGocw0e4AkxSTVpawLf4ew/6o7acJZtwA0Qy4cD1fRKSYmXnYB2x8pBQ84fNOL9t4AaEYPZ938DGMlAZKT4uOlpQG+eeEB7vji4E1mWJ1VswtIjrSTKwC2uNs74gkFz3z/J2QVsDgqYbSkX04JbUkRJAYONgJN6XWdd0hvegXsvDiQlHfU1oHluNmNILH2fAXwVj2gz/ciPY4gKSoO/e7B6b4gKEqHqgXZN9UZI7jv7D0kVGCm++Do0ABEQcg7elMFWZ6Ho3pehi6pnL0zXVhHIxLO9YxgiJt2PZlmTggFERjxAIV2rRQFa4UTvLk8zeKScmCdC7BN22c1204POW+Hgb5wUUHKW6muDFjvAqr47CrU2z2hS40VxnVaI44HkRToUHHZ1AStNKTAFmh8cGQk0j0SuZws9baboWYHT51sdJUt02n0kb1B4PJwaf0G8VWuB550Ak3W7I5UQL3rjd5xC+rmEy2mW2nf4ubO0Pp6K31skYOvV9XMhpe03bf8wBUvEJbyzmJSkKeB1RXASgdAa+wA90djA4Oh+PavW63nJ6xnFW27FdpUb6Y/r7Py6U3quJasAJ2jQMcIEFNyg5KRzEo7sKYC4DRalMGgGOjzRfcea7UdnW4t527W1uXf02A3Hqg2sVkrJZZIQXb6AAI9dRHDy2zA2krArHXjjkix3hHhw6PLLe9pvWZe2+2O24GPFtmMux1GMmLIXCTdJO0k/aQMGszAUy7AkXlQJJWD8YR81xs99lyzeReZAebKQV6AxMDO66qeMoaONDr4rWaOyZos0rCToVetRhsgyIrS7Ymc83Ly1u8W2sfyqeK8ASeMbekK2KyM7kSTs+yFfMfAZBjZ7Yn+5hbo19pX8Knbap6rYMAJu6/fEOa7DIn2pS7jKkZrOktB7fUKfwyEpW3ftlqu5cmUUcvF6E3qbOkKPFbDs8cbK/klU2dx/YHYcL8/tuv4CtsPpTgoOoLTnb7ROfbiPIv+C56jy+/7Yvu/arF8VgrYhO6/JtSkFnhyi2UAAAAASUVORK5CYII='>
                                </img>
                                <div style={{position: "relative", bottom: "3px", marginLeft: "8px" }}>
                                    Level Rank
                                </div>
                            </div>
                            <div style={{marginTop: "16px"}}>
                                Chuyên đi mid và là một sp chân chính.
                            </div>

                            <div style={{display: "flex", position: "absolute", bottom: "10px"}}>
                                <div >
                                    <img style={{width: "20px", height: "20px"}} src='data:image/png;base64,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'></img>
                                </div>
                                <div style={{color:"#FF9B00", fontSize: "18px", marginLeft: "4px" }}>
                                    150
                                </div>
                                <div style={{marginLeft: "2px"}}>
                                    /Trận
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className='towUser-inline' style={{}}>
                    <a style={{display: "flex"}}>
                        <div className='img-stateIcon-voiceIcon' style={{width:"200px", height: "200px"}}>
                            <div>
                                <img className='imgUser' src='https://data.lita.cool/user/1809766/album/photo_20220407_155201_524_R70158.jpg?t=1649317921524'>

                                </img>
                            </div>
                            <div className='stateIcon'>
                            </div>
                            <div className='voiceIcon-time'>
                                <img style={{width: "16px", height: "16px"}} src='data:image/png;base64,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'>
                                </img>
                                <div style={{width: "16px", height: "18px", fontSize: "12px", marginLeft: "15px"}}>
                                    10'
                                </div>

                            </div>
                        </div>
                        <div className='infoUser'>
                            <div className='display-flex1'>
                                <div style={{fontWeight: "700", fontSize: "18px", width: "100%"}}>
                                    BF • Na Gấu 🧸 
                                </div>
                                <div style={{width: "auto"}}>
                                </div>
                                <img style={{width:"14px", height: "14px", display: "block", objectFit: "cover", maxWidth: "100%", marginTop: "auto", marginBottom: "auto", }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAAXNSR0IArs4c6QAAAtFJREFUSEulVE1IVFEU/s4oKEHUoo39QKGTQeQfKFaLFlGQFARBCC1CmXEEscCCNi1mEa1DCZoCyUWI/bqqKC2VrMhVUEGEjVOmtonchPDuPSfu873nnTfTc6C7eT/33PN95zvfuYQSV7ZbdsofjIpGBZfjeHyIZks5SqUEmZivHfKMFY6IBiB4Hh+mo6WcLQkgm5BWdvBGGDAA5kmC/fERerseSGkAnfKYFY6xYc+A93xSe5/a/hvgW1KalYN3hrUNYCohQUvtQ5qJAomsQO5K2dxTjLPGIV8aWyZhTO4px2G6R6a2oisPQNJSubSMamcFcWHUgnFKKzS7SS39XTANsOkFY0ZrPIgxPgvjy4YqzO66TSs+Gkm/VCzlcE002lhjhzDIlUN5Sf3k3reRyez7vbArM3vEEBF8Z4WXsUr00OIlOS0ORvxAN4GXxNbdfw/2/Bgr1q3KPi9I0c+LUqc13vvMAjksxgHbIlIF52wgT4FyoNXtwWKf9LDCABt5LAZ5rrGSh//nEVi1spGpt3GKrgdNXjgvSe0gIwIK62++3SThRnugAaByrSvMSDVO0i1DPs9F8z1yVhiDWiHmu8ZuatAHk9hIKJ6b1hrP0Oisn6ChwEVh8+a6JcUKN6yJdV1jN89lLGv//FgSdNeNU8bOWXTQcklZYI0q3+th54Qn2lTCGosNY7Q1TLgowFxC5lljW4FdveEqmIFViX7Uj9P2dQF+dcmmZY3fxViHLWxPuKlqYwybq8doOVKiuaQcEI3pf1kxrL99hZQBB/e9oNeRALmEdDEjU6BzyJLB1OYPn7HnzWiApPRrhV776jCaC7tXdsa8a4WUMFoC9p5NmTHQNEnnoiVKyCArdFilfyTgcs0wjdoHP52Qk8rBFWjsta6ZkaYpao8EyCalQRw8gmBFO7hasxt3KE3m/ixYkpbYh2mcEY0LzNgCoL1hgl7ZgX8B2qSUB/vv33EAAAAASUVORK5CYII='>
                                </img>
                                <div style={{fontSize: "14px", color: "#333333", fontWeight: "700", textAlign: "center", marginLeft: "5px", paddingTop: "3px"}}>
                                    4.99
                                </div>
                                <div style={{fontSize: "14px", color: "#999999", textAlign: "center", marginLeft: "3px", paddingTop: "3px"}}>
                                    (1044)
                                </div>
                            </div>
                            <div className='display-flex1' style={{ height: "20px", marginTop: "16px"}}>
                                <img style={{width: "20px", height: "20px" }} src='data:image/png;base64,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'>
                                </img>
                                <div style={{position: "relative", bottom: "3px", marginLeft: "8px" }}>
                                    Level Rank
                                </div>
                            </div>
                            <div style={{marginTop: "16px"}}>
                                Chuyên đi mid và là một sp chân chính.
                            </div>

                            <div style={{display: "flex", position: "absolute", bottom: "10px"}}>
                                <div >
                                    <img style={{width: "20px", height: "20px"}} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAHV0lEQVRYR82ZTWxcVxXHf+fOe/Npe2zXX3UakpIECF+Fou7ZOClIgYZCBQsWSAg2ZZXugH7CAhTEpkvEAlARpTSQItqkEqXLNjRNoWma1C4OIY49jmM7tuOxZ9476L5nz5s3743HboTEkaxE995z7/+d73NG+ICklcP7feHL6uu9iI4qjAqM2usUpgSmUJkSI2eN8icZOjX+QZ6SnTBp5YsjdeoPozwA+omd8IKcR/ijg/O0DP1leru82wKos1/qrvurjwhyTNHSdi9POyfIiqI/c0zhuAyeXOp0V0eA9crY11B5WtGhTpftZF+QCqIPO0Mv/34rvrYAVVXqlfufAP+HbS+orqMLy0h1HWoe1OqBAZJ1wMlAPgvlEhRzW2AwTzlDLz0mIpYzQakAVY8UvcrabxQ9muDwfZi+AZUFsMC2QzkXBsowOgAZkwQhPJ8ZzH9T5IVbrZsJgFZy3uyh51T5SuKm2UW4UoH12nZgJc+4Gdg1AMP9IPGnJQB5+qutkkwArM0cfjKhViu1iSmYu9kemAhiJZXNgskgxoTSUgXfR32FWi3400IWDtwVmkGMzFPu8KlHm5diAK1DqPJsjGe9DpeuwPJqOjjXRUoFxALbLqmiXh390GBop00kwkPNjtMAaEOJ51fHY95qJffO5XRwTgYplZDcDoC1foAj+KN3gBPZpfXujMnv3wxBDYC1mbEngJh4GZ+C6wtJo87nkO4uMA6U70HK90BxD7hlUA/WKlCdQRf+DjfPby3XnIs/2gdxY3vSHX75McsYLNsM4WndSi8KwtcXYfxqElxXCSkWoPwZZNdRJDu4JQCtTqNTJ+DmP9ue094i2t/V2LfBPCPOfptxAoC1yqEfofr9xglr2OfGYS3urRKAKyKjDyBDY9u1uCA06vQLMP1iOo8I/u64qhH5sTt0+gchwJkxq4ePN7htnJuMp0spWLV2I6NHdwSuGZE/9RJUTqaC1O48OtjT7C7n3eHTnxRbldTVfy/G9dYErK5FS04G098L5c9i7v7OtiXXetBK0n/7p0h9MnmHgL93MBYfHTEHxJs9fMz3/eObHFqtIefieKW3B8kVkIOPptqczl/AnzyJ3nwfvCrSsw/Z9yCmLyp4gjy2NIl/9a9w/VWsuSQ+YLgHLeUby8aYR6Q+M/aMwjcaAGcWkH9NRQabdZHeMvTei9n77cSl/vvP44//LqwCY2QwB74OuX70xj/QubdgbTG6t6+MuG6MQ7vy6FCkZoHfSr0y9ooqn988KZdn0Gtz0UW9ZcSC3PMtpO+++IXzF/DOPB6Bs0G7WEBcJ1CV2syxshr+20yOg+TzSDGSVrCddfDv6o/eFv4mtcrYRZSPNCT43lVkbuNLRTCDdwRbcvBxJBevuLw3f4LOvhHuW2AparN7unwLfC9Ig/ZjsWkwjYzB3zsQ7QiXrASXVImC0IXLsLgSPmq/sifckk//HDHxsqn+6ndhbR5cF9NXTn90h6v+3UONoC3CchLg+UlYCqse6elG8iGorQBK2TrRbaS8po9IAEyo+MIVZDGsxK1zBCrpoGIz0N9ebYXdUBgNU159uaM8/Q83mdGGimNOouNTyEb+Nf19jZJoKycxA31tAcq+7yHdB0MfX/1PAFTnX4fqtSTYjMHfE9mgWCdJhJlrc1hPthQ4yGZhuUWY0dkXw1qwhWTkCDLyhcS6P/kLWDibWNdiFh3pbawL8kwyUC/dQqwdWoDNqpNM+0C98C564xVY/TeoD4XdyPAY0vXRJIjV63ivHUNcW+BmwXEaZ7SvhP3bpCBQJ1KdLRTOXgqaoCC9NV1gK5jbSXX2Ye/ccbTyesIJ7UIQA23DtUFBqrP/r80cejvWiFsVW1XbFNdSKd9OseBd/BV6+c/h8xlDYOObJmTrwl19TRKXsFgIALaWW7Z9fHMcKeSRUrHVsmD4CObO+zt6ZPMBb+JZdOK5yL5aQpO1PWuD0YGmciu1YL06C9MLbQOw5j6G2fsQUhjZEqhW5/Df/SVaORO93V1CCoXI9pLOES9YQzWnlPwXr2CMm9rLWh5dqUL3p5DB+5DyPshZFRlYn0cXxtHZM+jMa2EbsEFWIzGtuBn8XTaOxmr+eMkfPJbWNNU9ZOIa4rbPErq2ji6vgBeBSBWpMUEfE8s4tgYc7Ydc5BhtmyZ7aWrbeauKqSyB7Wu3IK2uwfo6au3XdoM2NNv+2FY2uSySaxl/2GpnsAftiq+3bTs3305t3Gsecn0JWd3mqKOT+zgZ/JFyLKSELB0a90DVdvRROfyHtLmM3FhGFhLjk05wYvtayqGD3YnUKMiJzNCpBzuOPkKQR4rebPXXqfOZtTqyuIIsW2lurfYYspyL9pfCsUdr4NrJ8GiTt+P4zfORlTVYrSF2mGTHb82UEdRWQnkXW8pjB0fp3rPz8VvzPTsaYFpHsqnShoyW6VVCarc7wGy+8P96BBwD2hiiB4PNqNHfnpu8g8iJ/8kQPe396GcI/3MId6b/DME1MeaN2/kZ4r9MCx34pKZ54gAAAABJRU5ErkJggg=='></img>
                                </div>
                                <div style={{color:"#FF9B00", fontSize: "18px", marginLeft: "4px" }}>
                                    150
                                </div>
                                <div style={{marginLeft: "2px"}}>
                                    /Trận
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                </div>
            </div>

        </>
    )
}

export default ListUser