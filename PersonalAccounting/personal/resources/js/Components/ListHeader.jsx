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