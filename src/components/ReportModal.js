import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ReportService from '../services/ReportService';

function ReportModal({reportedUserId}) {
    const [reportTypes, setReportTypes] = useState();
    const [loaded, setLoaded] = useState(false);

    const [request, setRequest] = useState(
        {
            reportType : 0,
            content : "",
            imageReport: null,
            reportedUserId : reportedUserId
        }
    );

    const handleReport = (request) => {
        let data = new FormData();
        if (request.reportType !== 0 && request.content !== "" && request.imageReport !== null && request.reportedUserId !== 0 ) {
          data.append('reportType', request.reportType);
          data.append('content', request.content);
          data.append('imageReport', request.imageReport);
          data.append('reportedUserId', request.reportedUserId);

          setLoaded(true);

          ReportService.createReport(data)
            .then(response => {
              setLoaded(false);
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
              });
            })
            .catch(error => {
              setLoaded(false);
              toast.error(error.data, {
                position: toast.POSITION.TOP_RIGHT
              });
            });
        }
        else {
          toast.error("Vui lòng đảm bảo nhập đủ các thông tin...", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
    }

    const getReportType = () => {
        setLoaded(true);
        ReportService.getReportTypes()
            .then(response => {
                setLoaded(false);
                setReportTypes(response.data);
            })
            .catch(e => {
                setLoaded(false);
                console.log(e);
            });
    };

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        setRequest({...request, imageReport : event.target.files[0]});
    };

    useEffect(() => {
        getReportType();
    }, []);
    return (
        <div className="modal " id="exampleModalReport" tabIndex="-1" aria-labelledby="exampleModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className='text-center text-24px pt-3 fw-bold pb-2'>Tố cáo vi phạm</div>
                    <div className='container-fluid mt-2'>
                        <select value={request?.reportType} onChange={(e) => setRequest({...request, reportType : e.target.value})} className="form-select mb-3" aria-label="Default select example">
                            <option selected value='0'>Bạn muốn tố cáo về gì...</option>
                            {
                                reportTypes && reportTypes.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>

                        <div className='row mb-3'>
                            <div className='col-3'>
                                <label>Báo cáo tài khoản:</label>
                            </div>
                            <div className='col-9' >
                                <textarea
                                    placeholder='Nội dung tố cáo...'
                                    style={{ height: "200px" }}
                                    className='form-control'
                                    value={request?.reportContent}
                                    onChange={(e) => setRequest({...request, content: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className='col-3'>
                                <label>Hình ảnh:</label>
                            </div>
                            <div className='col-9'>
                                <input
                                    className='form-control'
                                    type="file"
                                    onChange={(e) => handleFileChange(e)} />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center pb-2'>
                            <button type="button" className="btn btn-secondary me-4" style={{ width: "90px", height: '35px' }}>Hủy</button>
                            <button onClick={() => handleReport(request)} type="button" className="btn btn-success" style={{ width: "120px", height: '35px' }}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportModal