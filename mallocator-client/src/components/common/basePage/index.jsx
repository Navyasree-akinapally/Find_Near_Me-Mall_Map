
function BasePage({ title, children }) {
    return (
        <div>
            <span className="text-xl font-bold"> {title}</span>
            {children}
        </div>
    );
}


export default BasePage