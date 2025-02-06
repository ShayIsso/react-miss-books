const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpended] = useState(false)

    return (
        <p>
            {isExpanded ? txt : txt.substring(0, length) + "..."}
            <button onClick={() => setIsExpended(prev => !prev)}>
                {isExpanded ? "Read Less" : "Read More"}
            </button>
        </p>
    )
}