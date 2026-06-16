import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

export default function TableRow({

    columns,

    data,

    onEdit,

    onDelete,

}) {

    const handleEdit = () => {

        if (!onEdit) return;

        const url = typeof onEdit === 'function'
            ? onEdit(data)
            : onEdit;

        router.visit(url);

    };


    const handleDelete = (e) => {

        e.stopPropagation();

        if (!confirm('Are you sure?')) {

            return;

        }

        const url = typeof onDelete === 'function'
            ? onDelete(data)
            : onDelete;

        router.delete(url);

    };


    return (

        <tr

            onClick={handleEdit}

            className="
                cursor-pointer

                hover:bg-gray-50

                transition-colors
            "

        >

            {

                columns.map((column) => (

                    <td

                        key={column.accessor}

                        className="
                            px-6

                            py-4

                            text-sm

                            text-gray-700
                        "

                    >

                        {

                            column.options

                            ?

                            column.options[data[column.accessor]]

                            :

                            data[column.accessor]

                        }

                    </td>

                ))

            }


            {/* Delete */}

            <td

                className="
                    px-4

                    py-4

                    w-16

                    text-right
                "

            >

                {

                    onDelete && (

                        <button

                            onClick={handleDelete}

                            className="
                                p-2

                                rounded-full

                                text-gray-400

                                hover:text-red-600

                                hover:bg-red-50

                                transition
                            "

                        >

                            <Trash2 size={18} />

                        </button>

                    )

                }

            </td>

        </tr>

    );

}