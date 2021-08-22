<form className="flex items-center sm:justify-center">
  <input
    ref={textMessageRef}
    type="text"
    placeholder="Message"
    className=" w-full sm:w-2/3 py-1 focus:outline-none focus:ring-1 rounded-lg focus:ring-pink-500 p-1 border-2 text-white border-pink-500 bg-gray-800 placeholder-pink-400"
  />

  <input
    type="file"
    accept="image/gif, image/jpeg, image/png"
    id="file"
    onChange={addImageToPost}
    ref={filePickerRef}
    style={{ display: "none" }}
  />
  <h1>
    <label htmlFor="file" className="text-white text-sm px-1">
      <ImageIcon fontSize="large" className="text-pink-400 cursor-pointer" />
    </label>
  </h1>
  <button className="hidden" onClick={submitData}>
    some
  </button>
  <SendIcon onClick={submitData} className="text-pink-400" fontSize="large" />
</form>;
