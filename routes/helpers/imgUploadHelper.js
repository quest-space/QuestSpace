const getImgUploadURL = () => `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/uploaded-img/`
const getFileUploadURL = () => `http://localhost:4333/uploaded-file/`

module.exports = { getImgUploadURL, getFileUploadURL };