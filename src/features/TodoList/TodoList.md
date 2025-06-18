Note for TodoList.jsx

onInput={(e) => {
console.log(e.target.value);
setItemsPerPage(e.target.value);
}}

One problem that arises is that the todos are initially empty while they are being fetched from Airtable.

As the "useEffect" is currently written, it automatically navigates back to "/" if a user "refreshes" the page or navigates directly to a url that includes a page param.
==>> chú ý chỗ này
==>> tức là ví dụ nếu ở Page=3 thì khi bấm refresh button thì tự động reset về Home Page ==>> "/"
==>> hoặc khi đang ở "http://localhost:5173/?page=2" mà nhập thẳng vô URL là ".../?page=3" thì cũng reset về Home Page

==>> có thể test bằng cách chọn 1 trong 2 đoạn code sau để thấy sự khác biệt (trong useEffect(() => {}, [...]) )

Code 1: ==>> về Home Page khi refresh hoặc nhập thẳng page number
if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
navigate('/');
}

Code 2: ==>> không về Home Page khi refresh hoặc nhập thẳng page number
if (totalPages > 0) {
if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
navigate('/');
}
}

At the time if this writing, isLoading is insufficient to prevent React-Router from navigating the user away.

The render cycle sets that value to false before calculating any of the data used for pagination.

Wrap the contents of the useEffect in an if statement that evaluates totalPages.
==>>If it is greater than 0, permit the navigate("/") to fire.

Có thể kiểm tra lại bằng cách dùng console.log() để rà soát lại quá trình thay đổi
console.log('currentPage = ', currentPage);
console.log('totalPages = ', totalPages);
