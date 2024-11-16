import styled from 'styled-components';

interface CardProps {
    active: boolean;
}
  
export const SliderContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;

export const Card = styled.div<CardProps>`
  flex: ${({ active }) => (active ? '1.8' : '0.8')};
  height: 300px;
  background-color: ${({ active }) => (active ? '#ffffff' : '#d6c9fc')};
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  cursor: pointer;
`;

export const CardNumber = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardTitle = styled.h3`
  font-size: 28px;
  margin: 0;
`;

export const CardDescription = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  color: #555;

  li {
    margin-bottom: 6px;
  }
`;

export const LearnMoreButton = styled.button`
  align-self: flex-start;
  background-color: #9c4bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #7d3ad5;
  }
`;
