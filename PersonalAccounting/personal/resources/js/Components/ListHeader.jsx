import { Link } from '@inertiajs/react';

export default function ListHeader({
    title,

    count = null,

    createRoute = null,

    createLabel = "Create",

    filters = null,

    actions = null,

    children = null,
}) {

    return (

        <div className="mb-6">

            {/* Title */}

            <div className="flex items-center gap-3 mb-5">

                <h1 className="text-4xl font-light text-gray-900">

                    {title}

                </h1>

                {

                    count !== null && (

                        <span

                            className="
                                inline-flex
                                items-center
                                justify-center

                                min-w-[32px]
                                h-8

                                px-2

                                rounded-full

                                bg-gray-100

                                text-gray-600

                                text-sm

                                font-medium
                            "

                        >

                            {count}

                        </span>

                    )

                }

            </div>



            {/* Search / Filters + Buttons */}

            <div

                className="
                    flex

                    flex-col

                    lg:flex-row

                    lg:items-start

                    gap-4
                "

            >

                {/* Left */}

                <div className="flex-1">

                    {filters}

                </div>



                {/* Right */}

                <div

                    className="
                        flex

                        flex-wrap

                        items-center

                        gap-2

                        shrink-0
                    "

                >

                    {actions}

                    {

                        createRoute && (

                            <Link

                                href={route(createRoute)}

                                className="
                                    px-5

                                    py-2.5

                                    rounded-md

                                    bg-[#714B67]

                                    hover:bg-[#5E3F57]

                                    text-white

                                    text-sm

                                    font-medium

                                    transition

                                    shadow-sm
                                "

                            >

                                {createLabel}

                            </Link>

                        )

                    }

                </div>

            </div>


            {/* Optional Content */}

            {

                children && (

                    <div className="mt-4">

                        {children}

                    </div>

                )

            }

        </div>

    );

}