import styled from 'styled-components';

/* ============================================= */
function TextInputWithLabel({ labelText, elementId, ref, value, onChange }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>

      {/* <input */}
      <StyledInput
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
const StyledInput = styled.input`
  padding: 8px 14px;

  margin: 0;
  margin-left: 10px;
  margin-right: 20px;
`;

/* ============================================= */
export default TextInputWithLabel;
