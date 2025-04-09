import {WEBSITE_NAME} from "@/data/static/common";

const PageFooter = () => {
    return (
        <div className="flex items-center justify-center text-xs bg-stone-950 text-gray-500 py-4 pb-4">
            Copyright &copy; {WEBSITE_NAME} | Усі права захищено 2025.
        </div>
    )
}

export default PageFooter;