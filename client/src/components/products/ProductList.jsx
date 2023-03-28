import Product from './Product';
import "../../App.css"
import Pagination from './Pagination';

const sorted = false;

function sortByCategory(products) {
    return products.sort(compareProductCategory);
}

function compareProductCategory(a, b) {
    if (a.category < b.category) {
        return -1;
    }
    if (a.category > b.category) {
        return 1;
    }
    return 0;
}

function sortSomething(category) {
    console.log('sorting things would be cool' + category);
}

function ProductList({products, addToCart}) {
    let sortedProducts;
    if (sorted) {
        sortedProducts = sortByCategory(products);
    } else {
        sortedProducts = products;
    }
    return (
        <>
            <Pagination />
            <section className='grid grid-cols-4 gap-4 pl-20 pr-20 pb-10'>{
                sortedProducts
                    ?.map((p) => {
                        return (
                            <Product key={p.id}
                                     product={p}
                                     addToCart={addToCart}/>)
                    })
            }
            </section>
            <Pagination />
        </>)
}

export default ProductList;