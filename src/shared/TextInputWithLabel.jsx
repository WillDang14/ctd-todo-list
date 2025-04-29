/* 
Week 06:
*/
/* ============================================= */
function TextInputWithLabel({ labelText, elementId, ref, value, onChange }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>

      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

/* ============================================= */
export default TextInputWithLabel;
