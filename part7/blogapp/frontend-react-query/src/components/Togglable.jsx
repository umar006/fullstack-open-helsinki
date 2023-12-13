import { useImperativeHandle } from "react";
import { useState, forwardRef } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenNotVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="px-4 py-2 bg-sky-500 my-2 text-slate-100 font-medium"
        >
          {props.buttonLabelShow}
        </button>
      </div>
      <div style={showWhenNotVisible} className="togglableContent">
        {props.children}
        <button
          onClick={toggleVisibility}
          className="px-4 py-2 bg-red-500 my-2 text-slate-100 font-medium"
        >
          {props.buttonLabelHide}
        </button>
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabelShow: PropTypes.string.isRequired,
  buttonLabelHide: PropTypes.string.isRequired,
};

export default Togglable;
