
import { Search } from "lucide-react"

export const Input = (
    {
        type,
        id,
        name,
        className,
        placeholder
    }
) => {

    return (
        <div className="searchInputWrapper">
            <Search size={20} className="searchIcon" />
            <input
                className={`${className ? className : ""} `}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder ? placeholder : ""}
                autoComplete="off"
            />
        </div>
    )

}