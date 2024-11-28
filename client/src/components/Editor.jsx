import { useEffect, useState } from "react";
import Button from "./Button";

const Editor = ({ initData, onSubmit, onClickDelete }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    title: "",
    content: "",
  });
  useEffect(() => {
    if (initData && onClickDelete) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };
  const onClickSubmitButton = (event) => {
    event.preventDefault();
    onSubmit(input);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {initData ? "Edit Post" : "Create New Post"}
          </h2>
          <form onSubmit={onClickSubmitButton}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={input.title}
                onChange={onChangeInput}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-gray-700 font-bold mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                value={input.content}
                name="content"
                onChange={onChangeInput}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                rows="8"
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                text={initData ? "Save Changes" : "Create Post"}
                onClickHandler={onClickSubmitButton}
                className="bg-blue-500 text-white hover:bg-blue-600"
              />
              {initData ? (
                <Button
                  onClickHandler={onClickDelete}
                  text="DELETE"
                  className="bg-red-500 text-white hover:bg-red-800"
                />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editor;
