export default function Homepage() {
  // enctype="multipart/form-data"
  return (
    <div className="container_box">
      Homepage
      <form
        action="http://localhost:3000/upload"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="image" />
        <button type="submit">upload</button>
        <img src="" alt="s" />
      </form>
    </div>
  );
}
// server\public\images\6b1baa6d9cf6f5d31565.jpg
