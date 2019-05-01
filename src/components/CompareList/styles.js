import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  width: 900px;
  flex-wrap: wrap;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px 20px 10px;

  header {
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .actions {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      button {
        border: 0;
        color: #666;
        background: #fff;
        font-size: 14px;
        width: 40px;
        &:first-child {
          border-top-left-radius: 3px;
        }
        &:last-child {
          border-top-right-radius: 3px;
        }
        &:hover {
          color: #fff;
          background: #666;
        }
      }
    }
    img {
      width: 64px;
    }
    strong {
      font-size: 24px;
      margin-top: 10px;
    }
    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;
    li {
      font-weight: bold;
      padding: 12px 20px;
      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }
      &:nth-child(2n -1) {
        background: #f5f5f5;
      }
    }
  }
`;
