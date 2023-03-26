import "../../App.css"
function CategorySorter({categories, sorterFunction}) {
    return (
        <>
            <select placeholder={"user"} id={"type_input"}
                    onChange={(e) => sorterFunction(e.target.value)}
                    className={"categorySorter mt-5"}>
                {categories.map(c =>
                    <option value={c}  key={c}>{c}</option>
                )}
            </select>
        </>
    )
}

export default CategorySorter;