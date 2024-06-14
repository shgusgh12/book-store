import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";

function BooksFilter() {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    //객체로 하여금 쿼리스트링 access 가능하게 해줌
    console.log(category, newSearchParams);
    //id가 null인경우 현재 params를 제거해야함
    if (id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newSearchParams);
  };
  //현재 params의 category랑 key의 id값이 같으면 버튼이 선택된 효과가 되도록 설정
  //const currentCategory =searchParams.get(QUERYSTRING.CATEGORY_ID);

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, "true");
    }

    setSearchParams(newSearchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size="medium"
            scheme={item.isActive ? "primary" : "normal"}
            key={item.category_id}
            onClick={() => handleCategory(item.category_id)}
          >
            {item.category_name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="medium"
          scheme={searchParams.get(QUERYSTRING.NEWS) ? "primary" : "normal"}
          onClick={handleNews}
          //여기 원래 화살표 함수인데 왜?
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
}

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
    svg {
      fill: white;
    }
  }
`;

export default BooksFilter;
