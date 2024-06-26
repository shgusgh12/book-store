import React, { ReactElement } from "react";
import { useState } from "react";
import styled from "styled-components";

interface TabProps {
  title: string;
  children: React.ReactNode;
}
interface TabsProps {
  children: React.ReactNode;
}

function Tab({ children, title }: TabProps) {
  return <>{children}</>;
}

//Tab이 각 children
function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  //children인 tab을 배열로 만들어줌
  const tabs = React.Children.toArray(children) as ReactElement<TabProps>[];

  return (
    <TabsStyle>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex]}</div>
    </TabsStyle>
  );
}

const TabsStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;
    button {
      border: none;
      background: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) => theme.borderRadius.default}
        ${({ theme }) => theme.borderRadius.default} 0 0;
      padding: 12px 24px;

      &.active {
        color: #fff;
        background: ${({ theme }) => theme.color.primary};
      }

      .tab-content {
        padding: 24px 0;
      }
    }
  }
`;

export { Tab, Tabs };
