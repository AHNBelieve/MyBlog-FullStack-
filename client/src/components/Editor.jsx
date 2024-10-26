import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch } from "react-redux";

const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    title: "",
    content: "",
  });
  useEffect(() => {
    if (initData) {
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
  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={onChangeInput}
          className="form-control"
          id="exampleFormControlInput1"
        />
      </div>
      <div>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Content
        </label>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        />
        <Button onClickHandler={onClickSubmitButton} text="SAVE"></Button>
      </div>
    </>
  );
};

export default Editor;
