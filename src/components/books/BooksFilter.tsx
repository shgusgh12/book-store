import styled from 'styled-components'
import { useCategory } from '../../hooks/useCategory'
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';

function BooksFilter() {
    const {category} = useCategory();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCategory = (id : number | null) => {
        const newSearchParams = new URLSearchParams(searchParams);
        
        //id가 null인경우 현재 params를 제거해야함
        if(id === null) {
            newSearchParams.delete('category_id')
        }
        else{
            newSearchParams.set('category_id', id.toString());
        }

        setSearchParams(newSearchParams);
    }
    //현재 params의 category랑 key의 id값이 같으면 버튼이 선택된 효과가 되도록 설정
    //const currentCategory =searchParams.get('category_id');

    const handleNews = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        if(newSearchParams.get('news')){
            newSearchParams.delete('news');
        } 
        else{
            newSearchParams.set('news', 'true');
        }

        setSearchParams(newSearchParams)
    }

    return(
        <BooksFilterStyle>
            <div className='category'>
                {
                    category.map((item) => (
                        <Button 
                            size='medium' 
                            scheme={item.isActive ? 'primary' : 'normal'}
                            key={item.category_id} 
                            onClick={() => handleCategory(item.category_id)}>
                            {item.category_name} 
                        </Button>
                    ))
                }
            </div>
            <div className='new'>
                <Button size='medium' 
                    scheme={searchParams.get('news') ? 'primary' : 'normal'}
                    onClick={() => handleNews()}>
                    신간
                </Button>
            </div>
        </BooksFilterStyle>
    )
}

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category{
        display: flex;
        gap: 8px;

    }
`

export default BooksFilter