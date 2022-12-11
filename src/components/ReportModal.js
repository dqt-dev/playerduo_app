import React from 'react'

function ReportModal() {
    const [reportTypes, setReportTypes] = useState();
    const [loaded, setLoaded] = useState(false);

    const getReportType = () => {
        CategoryService.getAll()
          .then(response => {
            setCategories(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }
        setSkillDetail({ ...skillDetail, [event.target.id]: event.target.files[0] });
      };
    
      useEffect(() => {
        retrieveCategories();
      }, []);
    return (
        <div className="modal " id="exampleModalSkill" tabIndex="-1" aria-labelledby="exampleModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className='text-center text-24px pt-3 fw-bold pb-2'>{type ? "Đăng ký kĩ năng mới" : "Cập nhật thông tin kĩ năng"}</div>
                    <div className='container-fluid mt-2'>
                        {type && <select value={skillDetail?.categoryId} onChange={(e) => setSkillDetail({ ...skillDetail, categoryId: e.target.value })} className="form-select mb-3" aria-label="Default select example">
                            <option selected value='0'>Chọn thể loại game mà bạn muốn đăng ký...</option>
                            {
                                categories && categories.filter(category => !skillIds.includes(category.categoryId)).map((category) => (
                                    <option value={category.categoryId}>{category.categoryName}</option>
                                ))
                            }
                        </select>}
                        {
                            skillDetail?.categoryName &&
                            <div className='row mb-3'>
                                <div className='col-3'>
                                    <label>Tên Game:</label>
                                </div>
                                <label className='col-9'>{skillDetail?.categoryName}</label>
                            </div>
                        }
                        <div className='row mb-3'>
                            <div className='col-3'>
                                <label>Mô tả:</label>
                            </div>
                            <div className='col-9'>
                                <textarea
                                    className='form-control'
                                    value={skillDetail?.description}
                                    onChange={(e) => setSkillDetail({ ...skillDetail, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-3'>
                                <label>Giá tiền:</label>
                            </div>
                            <div className='col-9 '>
                                <div className='input-group'>
                                    <input
                                        className='form-control'
                                        type="number"
                                        value={skillDetail?.price}
                                        min="50"
                                        max="1000"
                                        step="50"
                                        aria-describedby="basic-addon2"
                                        onChange={(e) => setSkillDetail({ ...skillDetail, price: e.target.value })}
                                    />
                                    <div className='input-group-append'>
                                        <span className='input-group-text' id="basic-addon2"><img className='h-20 ' style={{ marginTop: "2px" }} src={coin} />  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-3'>
                                <label>Giọng nói:</label>
                            </div>
                            <div className='col-9'>
                                <input
                                    ref={audioRef}
                                    id='audioUrl'
                                    className='form-control'
                                    type="file"
                                    onChange={(e) => handleFileChange(e)}>
                                </input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-3'>
                                <label>Hình ảnh:</label>
                            </div>
                            <div className='col-9'>
                                <input
                                    ref={imageRef}
                                    id='imageUrl'
                                    className='form-control'
                                    type="file"
                                    onChange={(e) => handleFileChange(e)} />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center pb-2'>
                            <button type="button" className="btn btn-secondary me-4" style={{ width: "90px", height: '35px' }}>Hủy</button>
                            {type ? <button type="button" onClick={() => handleRegisterSkill(skillDetail)} className="btn btn-success" style={{ width: "90px", height: '35px' }}>Đăng ký</button> :
                                <button onClick={() => handleUpdateSkill(skillDetail?.skillId, skillDetail)} type="button" className="btn btn-success" style={{ width: "90px", height: '35px' }}>Cập nhật</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportModal