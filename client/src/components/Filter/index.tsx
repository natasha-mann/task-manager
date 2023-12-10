import React, { useState } from "react";
import styled from "styled-components";
import { TaskData } from "../../api/useAllTasksQuery";

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.div`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  &:hover {
    background-color: red;
  }
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const SubA = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

type FilterProps = {
  onClick: React.Dispatch<Partial<Record<keyof TaskData, string>>>;
};

export const Filter = ({ onClick }: FilterProps) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <StyledUl>
      <DropDownLi>
        <Dropbtn onClick={() => setShow((prev) => !prev)}>
          Filter By Priority
        </Dropbtn>
        {show && (
          <DropDownContent>
            <SubA
              onClick={() => {
                setShow((prev) => !prev);
                onClick({ priorityLevel: "" });
              }}
            >
              All Tasks
            </SubA>
            <SubA
              onClick={() => {
                setShow((prev) => !prev);
                onClick({ priorityLevel: "1" });
              }}
            >
              High Priority
            </SubA>
            <SubA
              onClick={() => {
                setShow((prev) => !prev);
                onClick({ priorityLevel: "2" });
              }}
            >
              Medium Priority
            </SubA>
            <SubA
              onClick={() => {
                setShow((prev) => !prev);
                onClick({ priorityLevel: "3" });
              }}
            >
              Low Priority
            </SubA>
          </DropDownContent>
        )}
      </DropDownLi>
    </StyledUl>
  );
};
