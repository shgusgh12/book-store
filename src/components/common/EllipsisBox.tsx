import { useState } from 'react';
import styled from 'styled-components'
import Button from './Button';
import { FaAngleDown } from 'react-icons/fa';
interface Props {
    children : React.ReactNode;
    lineLimit : number;
}

function EllipsisBox({children , lineLimit} : Props) {

    const [expanded, setExpanded] = useState(false);


    return(
        <EllipsisBoxStyle 
            lineLimit={lineLimit}
            //div태그의 경우 props로 bool타입을 전달하는 것은 경고가 나오게된다
            //따라서 $를 붙여서 전달한다 styled 컴포넌트와 일반 컴포넌트를 구분할 수 없기떄문에 발생하는 이슈
            $expanded = {expanded}
        >
            <p>{children}</p> 
            <div className="toggle">
                <Button
                    size='small'
                    scheme='normal'
                    onClick={() => {
                        setExpanded(!expanded)
                    }}
                >
                    {
                        expanded ? '접기' : '펼치기'
                    }
                    <FaAngleDown/>
                </Button>
            </div>
        </EllipsisBoxStyle>
    )
}

interface EllipsisBoxStyleProps {
    lineLimit : number;
    $expanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
    p{
        //px기준이 아닌 줄의 개수 기준으로 가리기
        overflow: hidden;
        //넘치는 부분 ...으로 설정      
        text-overflow: ellipsis;
        display: -webkit-box;
        //4줄까지 자르기
        -webkit-line-clamp : ${({lineLimit, $expanded}) => 
        $expanded ? 'none' : lineLimit};
        -webkit-box-orient: vertical;
        padding: 20px 0;
        margin: 0;
    }
    .toggle{
        display: flex;
        justify-content: end;
        svg{
            transform: ${({$expanded}) => 
            $expanded ? 'rotate(180deg)' : 'rotate(0)'};
        }
    }
`

export default EllipsisBox;