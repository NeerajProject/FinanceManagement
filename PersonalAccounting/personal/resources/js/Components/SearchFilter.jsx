export default function SearchFilter({

    category = "Invoices",

    onRemove,

}) {

    return (

        <div className="flex items-center">

            <button
                className="
                    flex items-center
                    gap-2

                    bg-purple-100
                    text-gray-700

                    px-3
                    py-1.5

                    rounded

                    text-sm
                "
            >

                <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M3 4h14l-5 6v5l-4-2v-3z" />
                </svg>

                {category}

                <button
                    type="button"
                    onClick={onRemove}
                    className="text-gray-500"
                >
                    ✕
                </button>

            </button>

        </div>

    );
}