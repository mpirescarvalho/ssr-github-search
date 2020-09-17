import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #fff;
`;

export const StyledRepo = styled.div`
  padding: 12px 0;

  span {
    font-weight: bold;
    font-size: 16px;
  }

  p {
    margin-top: 5px;
  }
`;

export const BackToHome = styled.div`
  align-self: flex-start;

  margin-bottom: 5px;

  a {
    text-decoration: none;

    color: #55f;
    font-weight: bold;

    :hover {
      color: #44f;
    }
  }
`;
