import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="Editor">
      <h1>제목</h1>
      <input
        type="text"
        name="title"
        value={input.title}
        onChange={onChangeInput}
      />
      <h2>내용</h2>
      <textarea name="content" value={input.content} onChange={onChangeInput} />
      <button onClick={onClickSubmitButton}>저장</button>
    </div>
  );
};

export default Editor;
