const Form = () => {

  const [imgURL, setImgURL] = React.useState("http://localhost:3335/img-uploads/placeholder.png");

  const formSubmit = async (ev) => {

    ev.preventDefault();

    const formData = new FormData(ev.target);

    const res = await fetch("http://localhost:3335/api-img",
    {
        method: "POST",
        header: { 'Content-Type': 'multipart/form-data' },
        body: formData
    });

    const responseBody = await res.json();

    if (res.status === 200) {
      setImgURL(`http://localhost:3335/${responseBody.imgURL}`);
    }
  }
  
  return (
    <form onSubmit={formSubmit}>
      <label htmlFor='username'>Username</label>
      <input type='text' id='username' name="Username" />
      <label htmlFor='image'>Logo</label>
      <input type="file" id="image" name="logo" accept=".png,.jpg,.jpeg"  />
      <input type='submit' />
      <img src={imgURL} />
    </form>
  )
}

ReactDOM.render(<Form />, document.querySelector(`#root`));