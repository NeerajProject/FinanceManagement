import { useState } from 'react';

export default function NotebookTabs({

    tabs,

    defaultTab,

}) {

    const [activeTab,setActiveTab] = useState(

        defaultTab || tabs[0]?.key

    );


    return (

        <div>

            <div className="flex border-b">

                {

                    tabs.map((tab)=>(

                        <button

                            key={tab.key}

                            onClick={()=>

                                setActiveTab(tab.key)

                            }

                            className={`

                                px-5

                                py-3

                                border-b-2

                                transition

                                ${

                                    activeTab===tab.key

                                    ?

                                    'border-[#714B67] text-[#714B67]'

                                    :

                                    'border-transparent text-gray-500'

                                }

                            `}

                        >

                            {tab.label}

                        </button>

                    ))

                }

            </div>


            <div className="py-6">

                {

                    tabs.find(

                        x=>x.key===activeTab

                    )?.content

                }

            </div>

        </div>

    );

}