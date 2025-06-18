import { Link } from 'react-router';

import styled from 'styled-components';

/* =========================================================== */
function NotFound() {
  return (
    <>
      <StyledContainer>
        <p>Page not found</p>

        <Link to="/">Go back home</Link>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  font-size: 1.5rem;

  gap: 2rem;
`;

/* =========================================================== */
export default NotFound;
